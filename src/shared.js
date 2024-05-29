export const MODEL = process.env.MODEL || "codellama/CodeLlama-7b-hf";
export const ENDPOINT =
  process.env.ENDPOINT ||
  "https://api-inference.huggingface.co/models/codellama/CodeLlama-7b-hf";
export const PROMPT_BUILDER = process.env.PROMPT_BUILDER || "naive";
export const CONTEXT_SIZE = Number(process.env.CONTEXT_SIZE || "4096");
export const PREFIX = Number(process.env.PREFIX || "0.5");
export const SUFFIX = Number(process.env.SUFFIX || "0.5");

export const DEFINITIONS_DIR = process.env.DEFINITIONS_DIR || "apis";
export const TEST_CASES_DIR = process.env.TEST_CASES_DIR || "tests";
export const RESULTS_DIR =
  process.env.RESULTS_DIR ||
  `runtime/results/${MODEL.replace("/", "--")}/${PROMPT_BUILDER}/${
    process.env.EXPERIMENT_NAME || new Date().toISOString().replace(/:/g, "-")
  }`;
export const EVALUATIONS_DIR = `runtime/evaluations/${MODEL.replace(
  "/",
  "--"
)}/${PROMPT_BUILDER}/${
  process.env.EXPERIMENT_NAME || new Date().toISOString().replace(/:/g, "-")
}`;

export const MASKED_LINES_PER_TEST_CASE = 10;
export const MASK = "<<MASK>>";
