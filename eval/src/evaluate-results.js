import fs from "node:fs";
import path from "node:path";
import cp from "node:child_process";

import yaml from "js-yaml";
import winston from "winston";

import { DEFINITIONS_DIR } from "./shared.js";

const RESULTS_DIR = "results/copilot";
const EVALUATIONS_DIR = "evaluations/copilot";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `${EVALUATIONS_DIR}/output.log` }),
  ],
});

if (fs.existsSync(EVALUATIONS_DIR)) {
  logger.info("Cleaning up evaluations directory");
  fs.rmSync(EVALUATIONS_DIR, { recursive: true, force: true });
}
fs.mkdirSync(EVALUATIONS_DIR, { recursive: true });

const infilledDefinitionFileNames = fs
  .readdirSync(RESULTS_DIR)
  .filter((name) => name.endsWith(".yaml"));

logger.info(
  `Found ${infilledDefinitionFileNames.length} infilled definition files`
);

let correct = 0;
let incorrect = 0;
let invalid = 0;

for (const [
  definitionIndex,
  infilledDefinitionFileName,
] of infilledDefinitionFileNames.entries()) {
  const infilledDefinitionPath = path.resolve(
    RESULTS_DIR,
    infilledDefinitionFileName
  );

  logger.info(`Evaluating ${infilledDefinitionFileName} - `);

  const originalDefinitionFileName = infilledDefinitionFileName.slice(
    0,
    infilledDefinitionFileName.indexOf(".yaml") + 5
  );
  const originalDefinitionPath = path.resolve(
    DEFINITIONS_DIR,
    originalDefinitionFileName
  );

  let evaluationResult;

  try {
    evaluationResult = cp
      .execFileSync(
        "oasdiff",
        [
          "diff",
          originalDefinitionPath,
          infilledDefinitionPath,
          "--format",
          "json",
        ],
        {
          stdio: "pipe",
          encoding: "utf8",
        }
      )
      .toString();
  } catch (error) {
    evaluationResult = null;
    logger.error(error);
  }

  if (evaluationResult === "") {
    logger.info("Correct");
    correct++;
  } else if (evaluationResult === null) {
    logger.info("Invalid");
    invalid++;
  } else {
    const evaluation = yaml.load(evaluationResult);

    if (evaluateDiff(evaluation?.paths)) {
      logger.info("Correct");
      evaluation.IS_CORRECT = true;
      correct++;
    } else {
      logger.info("Incorrect");
      evaluation.IS_CORRECT = false;
      incorrect++;
    }

    const evaluationPath = path.resolve(
      EVALUATIONS_DIR,
      `${infilledDefinitionFileName}.evaluation.json`
    );
    fs.writeFileSync(
      evaluationPath,
      JSON.stringify(evaluation, null, 2),
      "utf8"
    );
  }

  const correctPercentage = ((correct / (definitionIndex + 1)) * 100).toFixed(
    2
  );
  const incorrectPercentage = (
    (incorrect / (definitionIndex + 1)) *
    100
  ).toFixed(2);
  const invalidPercentage = ((invalid / (definitionIndex + 1)) * 100).toFixed(
    2
  );
  const progressPercentage = (
    ((definitionIndex + 1) / infilledDefinitionFileNames.length) *
    100
  ).toFixed(2);

  logger.info(
    `\nCorrect: ${correct} (${correctPercentage}%) | Incorrect: ${incorrect} (${incorrectPercentage}%) | Invalid: ${invalid} (${invalidPercentage}%) | Progress: ${progressPercentage}%\n`
  );
}

function evaluateDiff(diff, path = []) {
  if (diff == null) {
    return true;
  }

  const ignoredFields = ["description", "summary"];
  if (ignoredFields.includes(path.at(-1))) {
    return true;
  }

  if (typeof diff === "object") {
    return Object.entries(diff).every(([key, value]) =>
      evaluateDiff(value, [...path, key])
    );
  }

  return false;
}
