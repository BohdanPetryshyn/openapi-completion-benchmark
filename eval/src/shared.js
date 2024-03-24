export const MODEL = process.env.MODEL;
export const PROMPT_BUILDER = process.env.PROMPT_BUILDER;
export const CONTEXT_SIZE = Number(process.env.CONTEXT_SIZE);

export const DEFINITIONS_DIR = process.env.DEFINITIONS_DIR || "apis";
export const TEST_CASES_DIR = process.env.TEST_CASES_DIR || "tests";
export const RESULTS_DIR = `runtime/results/${MODEL.replace(
  "/",
  "--"
)}/${PROMPT_BUILDER}/${process.env.EXPERIMENT_NAME}`;
export const EVALUATIONS_DIR = `runtime/evaluations/${MODEL.replace(
  "/",
  "--"
)}/${PROMPT_BUILDER}/${process.env.EXPERIMENT_NAME}`;
// export const RESULTS_DIR = `results/copilot`;
// export const EVALUATIONS_DIR = `evaluations/copilot-2`;

export const MASKED_LINES_PER_TEST_CASE = 10;
export const MASK = "<<MASK>>";
