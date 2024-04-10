export const MODEL = process.env.MODEL || "codellama/CodeLlama-7b-hf";
export const PROMPT_BUILDER = process.env.PROMPT_BUILDER;
export const CONTEXT_SIZE = Number(process.env.CONTEXT_SIZE);

export const DEFINITIONS_DIR = process.env.DEFINITIONS_DIR || "eval/apis";
export const TEST_CASES_DIR = process.env.TEST_CASES_DIR || "eval/tests";
export const RESULTS_DIR = `runtime/results/${MODEL.replace(
  "/",
  "--"
)}/${PROMPT_BUILDER}/${process.env.EXPERIMENT_NAME}`;
export const EVALUATIONS_DIR = `runtime/evaluations/${MODEL.replace(
  "/",
  "--"
)}/${PROMPT_BUILDER}/${process.env.EXPERIMENT_NAME}`;

export const MASKED_LINES_PER_TEST_CASE = 10;
export const MASK = "<<MASK>>";
