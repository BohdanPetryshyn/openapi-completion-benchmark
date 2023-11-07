import fs from "node:fs";
import path from "node:path";

import pLimit from "p-limit";
import winston from "winston";

import {
  TEST_CASES_DIR,
  MASK,
  MASKED_LINES_PER_TEST_CASE,
  RESULTS_DIR,
  MODEL,
  PROMPT_BUILDER,
} from "./shared.js";
import { hf } from "./hf.js";
import { PROMPT_BUILDERS } from "./prompt-builders/prompt-builders.js";

const INFILLED_LINES_TOLERANCE = 5;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `${RESULTS_DIR}/output.log` }),
  ],
});

if (fs.existsSync(RESULTS_DIR)) {
  logger.info("Cleaning up results directory");
  fs.rmSync(RESULTS_DIR, { recursive: true, force: true });
}
fs.mkdirSync(RESULTS_DIR, { recursive: true });

const testDefinitionFileNames = fs.readdirSync(TEST_CASES_DIR);
logger.info(`Found ${testDefinitionFileNames.length} test definition files`);

const buildPrompt = PROMPT_BUILDERS[PROMPT_BUILDER];
logger.info(`Using ${PROMPT_BUILDER} prompt builder`);

const limit = pLimit(5);

await Promise.all(
  testDefinitionFileNames.map((testDefinitionFileName) =>
    limit(async () => {
      const testDefinitionPath = path.resolve(
        TEST_CASES_DIR,
        testDefinitionFileName
      );
      const testDefinition = fs.readFileSync(testDefinitionPath, "utf8");

      logger.info(`Infilling ${testDefinitionFileName}`);

      const maskIndex = testDefinition.indexOf(MASK);
      let testDefinitionPrefix = testDefinition.slice(0, maskIndex);
      let testDefinitionSuffix = testDefinition.slice(maskIndex + MASK.length);

      let infilled = "";

      while (true) {
        logger.profile(`Building prompt - ${testDefinitionFileName}`);
        const { promptPrefix, promptSuffix } = buildPrompt({
          prefix: testDefinitionPrefix,
          suffix: testDefinitionSuffix,
          maxTokens: 4096 - 10,
        });
        logger.profile(`Building prompt - ${testDefinitionFileName}`);

        const inputs = `<PRE> ${promptPrefix} <SUF>${promptSuffix} <MID>`;

        let generatedText;

        try {
          logger.profile(`Generating text - ${testDefinitionFileName}`);
          logger.info(`Inputs length ${inputs.length}`);
          const { generated_text } = await hf.textGeneration({
            model: MODEL,
            inputs,
            parameters: {
              max_new_tokens: 250,
            },
          });
          logger.profile(`Generating text - ${testDefinitionFileName}`);
          generatedText = generated_text;
        } catch (e) {
          logger.error("Error generating text", e);
          throw e;
        }

        const infilledPart = generatedText.slice(
          generatedText.indexOf("<MID>") + 5
        );

        // process.stdout.write(infilledPart);

        if (infilledPart.endsWith(" <EOT>")) {
          infilled += infilledPart.slice(0, -6);
          logger.info("Definition infilled");
          break;
        }

        infilled += infilledPart;

        if (
          infilled.split("\n").length - 1 >=
          MASKED_LINES_PER_TEST_CASE + INFILLED_LINES_TOLERANCE
        ) {
          logger.info("Generated infilling is too long");
          break;
        }

        testDefinitionPrefix += infilledPart;
      }

      const result = testDefinitionPrefix + infilled + testDefinitionSuffix;

      const resultPath = path.resolve(
        RESULTS_DIR,
        `${testDefinitionFileName}.result.yaml`
      );

      logger.info("Saving result");
      fs.writeFileSync(resultPath, result, "utf8");
    }, testDefinitionFileName)
  )
);
