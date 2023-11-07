export const MODEL = "codellama/CodeLlama-7b-hf";
export const PROMPT_BUILDER = "naive";

export const DEFINITIONS_DIR = "apis";
export const TEST_CASES_DIR = "runtime/tests";
export const RESULTS_DIR = `runtime/results/${MODEL.replace(
  "/",
  "--"
)}/${PROMPT_BUILDER}`;
export const EVALUATIONS_DIR = `runtime/evaluations/${MODEL.replace(
  "/",
  "--"
)}/${PROMPT_BUILDER}`;

export const MASKED_LINES_PER_TEST_CASE = 10;
export const MASK = "<<MASK>>";
