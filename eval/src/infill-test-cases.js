import fs from "node:fs";
import path from "node:path";

import pLimit from "p-limit";
import pRetry from "p-retry";
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
const INFILLED_CHARACTERS_PER_LINE_TOLERANCE = 500;

const PARALLELISM = 1;

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

const limit = pLimit(PARALLELISM);

let totalDuration = 0;
let totalCharacters = 0;

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
        const promptBuildingStartTime = Date.now();
        const { promptPrefix, promptSuffix } = buildPrompt({
          prefix: testDefinitionPrefix,
          suffix: testDefinitionSuffix,
          maxTokens: 4096 - 10,
        });
        const promptBuildingEndTime = Date.now();
        logger.info(
          `Prompt building duration: ${
            promptBuildingEndTime - promptBuildingStartTime
          } ms`
        );

        const inputs = `<PRE> ${promptPrefix} <SUF>${promptSuffix} <MID>`;

        const generatedText = await pRetry(
          async () => {
            logger.info("Generating text");
            const generationStartTime = Date.now();
            const { generated_text } = await hf.textGeneration({
              model: MODEL,
              inputs,
              parameters: {
                max_new_tokens: 250,
              },
            });
            const generationEndTime = Date.now();
            totalDuration += generationEndTime - generationStartTime;
            logger.info(
              `Inputs length: ${inputs.length}. Outputs length: ${generated_text.length}`
            );
            logger.info(
              `Generation duration: ${
                generationEndTime - generationStartTime
              } ms`
            );
            return generated_text;
          },
          { retries: 5 }
        );

        // const infilledPart = generatedText.slice(
        //   generatedText.indexOf("<MID>") + 5
        // );

        if (generatedText.endsWith(" <EOT>")) {
          infilled += generatedText.slice(0, -6);
          logger.info("Definition infilled");
          break;
        }

        infilled += generatedText;

        if (
          infilled.split("\n").length >
            MASKED_LINES_PER_TEST_CASE + INFILLED_LINES_TOLERANCE ||
          infilled.length >
            (MASKED_LINES_PER_TEST_CASE + INFILLED_LINES_TOLERANCE) *
              INFILLED_CHARACTERS_PER_LINE_TOLERANCE
        ) {
          logger.info("Generated infilling is too long");
          break;
        }

        testDefinitionPrefix += generatedText;
      }

      totalCharacters += infilled.length;
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

logger.info(`Total duration: ${totalDuration} ms`);
logger.info(`Total characters: ${totalCharacters}`);
logger.info(`Speed: ${totalDuration / totalCharacters} ms/char`);
