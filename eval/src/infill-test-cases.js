import fs from "node:fs";
import path from "node:path";

import { HfInference } from "@huggingface/inference";
import pLimit from "p-limit";

import {
  TEST_CASES_DIR,
  MASK,
  MASKED_LINES_PER_TEST_CASE,
  RESULTS_DIR,
  MODEL,
} from "./shared.js";
import { buildPrompt } from "./prompt-builders/naive.js";

const INFILLED_LINES_TOLERANCE = 5;

if (fs.existsSync(RESULTS_DIR)) {
  console.log("Cleaning up results directory");
  fs.rmSync(RESULTS_DIR, { recursive: true, force: true });
}
fs.mkdirSync(RESULTS_DIR, { recursive: true });

let hf = new HfInference("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");
// hf = await hf.endpoint(
//   "https://a5469lb6kfjvxan8.eu-west-1.aws.endpoints.huggingface.cloud"
// );

const testDefinitionFileNames = fs.readdirSync(TEST_CASES_DIR);

console.log(`Found ${testDefinitionFileNames.length} test definition files`);

const limit = pLimit(10);

await Promise.all(
  testDefinitionFileNames.map((testDefinitionFileName) =>
    limit(async () => {
      const testDefinitionPath = path.resolve(
        TEST_CASES_DIR,
        testDefinitionFileName
      );
      const testDefinition = fs.readFileSync(testDefinitionPath, "utf8");

      console.log(`Infilling ${testDefinitionFileName}`);

      const maskIndex = testDefinition.indexOf(MASK);
      let testDefinitionPrefix = testDefinition.slice(0, maskIndex);
      let testDefinitionSuffix = testDefinition.slice(maskIndex + MASK.length);

      let infilled = "";

      while (true) {
        const { promptPrefix, promptSuffix } = buildPrompt({
          prefix: testDefinitionPrefix,
          suffix: testDefinitionSuffix,
        });

        const inputs = `<PRE> ${promptPrefix} <SUF>${promptSuffix} <MID>`;

        let generatedText;

        try {
          console.time(`Generating text - ${testDefinitionFileName}`);
          console.log(`Inputs length ${inputs.length}`);
          const { generated_text } = await hf.textGeneration({
            model: MODEL,
            inputs,
            parameters: {
              max_new_tokens: 250,
            },
          });
          console.timeEnd(`Generating text - ${testDefinitionFileName}`);
          generatedText = generated_text;
        } catch (e) {
          console.error("Error generating text", e);
          throw e;
        }

        const infilledPart = generatedText.slice(
          generatedText.indexOf("<MID>") + 5
        );

        // process.stdout.write(infilledPart);

        if (infilledPart.endsWith(" <EOT>")) {
          infilled += infilledPart.slice(0, -6);
          console.log("Definition infilled");
          break;
        }

        infilled += infilledPart;

        if (
          infilled.split("\n").length - 1 >=
          MASKED_LINES_PER_TEST_CASE + INFILLED_LINES_TOLERANCE
        ) {
          console.log("Generated infilling is too long");
          break;
        }

        testDefinitionPrefix += infilledPart;
      }

      const result = testDefinitionPrefix + infilled + testDefinitionSuffix;

      const resultPath = path.resolve(
        RESULTS_DIR,
        `${testDefinitionFileName}.result.txt`
      );

      console.log("Saving result");
      fs.writeFileSync(resultPath, result, "utf8");
    }, testDefinitionFileName)
  )
);
