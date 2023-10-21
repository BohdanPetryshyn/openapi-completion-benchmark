import fs from "node:fs";
import path from "node:path";
import cp from "node:child_process";

import yaml from "js-yaml";

import { DEFINITIONS_DIR, RESULTS_DIR, EVALUATIONS_DIR } from "./shared.js";

if (fs.existsSync(EVALUATIONS_DIR)) {
  console.log("Cleaning up evaluations directory");
  fs.rmSync(EVALUATIONS_DIR, { recursive: true, force: true });
}
fs.mkdirSync(EVALUATIONS_DIR, { recursive: true });

const infilledDefinitionFileNames = fs.readdirSync(RESULTS_DIR);

console.log(
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

  console.log(`Evaluating ${infilledDefinitionFileName} - `);

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
  }

  if (evaluationResult === "") {
    console.log("Correct");
    correct++;
  } else if (evaluationResult === null) {
    console.log("Invalid");
    invalid++;
  } else {
    const evaluation = yaml.load(evaluationResult);

    if (evaluateDiff(evaluation?.paths) && evaluateDiff(evaluation?.info)) {
      console.log("Correct");
      correct++;
    } else {
      console.log("Incorrect");
      incorrect++;
    }

    const evaluationPath = path.resolve(
      EVALUATIONS_DIR,
      `${infilledDefinitionFileName}.evaluation.json`
    );
    fs.writeFileSync(evaluationPath, evaluationResult, "utf8");
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

  console.log(
    `\nCorrect: ${correct} (${correctPercentage}%) | Incorrect: ${incorrect} (${incorrectPercentage}%) | Invalid: ${invalid} (${invalidPercentage}%) | Progress: ${progressPercentage}%\n`
  );
}

function evaluateDiff(diff, path = []) {
  if (diff === undefined) {
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
