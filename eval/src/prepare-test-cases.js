import fs from "node:fs";
import path from "node:path";

import {
  DEFINITIONS_DIR,
  TEST_CASES_DIR,
  MASKED_LINES_PER_TEST_CASE,
  MASK,
} from "./shared.js";

const TEST_CASES_PER_DEFINITION = 10;

if (fs.existsSync(TEST_CASES_DIR)) {
  console.log("Cleaning up test cases directory");
  fs.rmSync(TEST_CASES_DIR, { recursive: true, force: true });
}
fs.mkdirSync(TEST_CASES_DIR, { recursive: true });

const definitionFileNames = fs.readdirSync(DEFINITIONS_DIR);

console.log(`Found ${definitionFileNames.length} definition files`);

for (const definitionFileName of definitionFileNames) {
  const definitionPath = path.resolve(DEFINITIONS_DIR, definitionFileName);
  const definition = fs.readFileSync(definitionPath, "utf8");

  console.log(`Creating test cases for ${definitionFileName}`);

  // const minMaskIndex = definition.indexOf("\npaths:\n") + "\npaths:\n".length;
  // const maxMaskIndex = definition.search(/\n\s*[^:]+:\s*$/m);
  const minMaskIndex = regexIndexOf(definition, /\npaths:\n/, 0) + 8;
  const maxMaskIndex = regexIndexOf(definition, /\n\w+:\n/, minMaskIndex);

  const maskIndexes = Array.from(
    { length: TEST_CASES_PER_DEFINITION },
    () =>
      minMaskIndex + Math.floor(Math.random() * (maxMaskIndex - minMaskIndex))
  );

  for (const [testCaseIndex, maskStartIndex] of maskIndexes.entries()) {
    const maskEndIndex = Array(MASKED_LINES_PER_TEST_CASE)
      .fill()
      .reduce(
        (index) => (index === -1 ? index : definition.indexOf("\n", index + 1)),
        maskStartIndex
      );

    const maskedDefinition =
      definition.slice(0, maskStartIndex) +
      MASK +
      definition.slice(maskEndIndex);

    const testCasePath = path.resolve(
      TEST_CASES_DIR,
      `${definitionFileName}.${testCaseIndex}.txt`
    );

    console.log(`Saving test case ${testCasePath}`);
    fs.writeFileSync(testCasePath, maskedDefinition, "utf8");
  }
}

function regexIndexOf(text, re, i) {
  var indexInSuffix = text.slice(i).search(re);
  return indexInSuffix < 0 ? indexInSuffix : indexInSuffix + i;
}
