export const MODEL = "codellama/CodeLlama-7b-hf";

export const DEFINITIONS_DIR = "runtime/apis-10k";
export const TEST_CASES_DIR = "runtime/tests";
export const RESULTS_DIR = `runtime/results/${MODEL.replace("/", "--")}`;
export const EVALUATIONS_DIR = "runtime/evaluations";

export const MASKED_LINES_PER_TEST_CASE = 10;
export const MASK = "<<MASK>>";
