export const MODEL = "codellama/CodeLlama-7b-hf";

export const DEFINITIONS_DIR = "apis";
export const TEST_CASES_DIR = "tests";
export const RESULTS_DIR = `results/${MODEL.replace("/", "--")}`;
export const EVALUATIONS_DIR = "evaluations";

export const MASKED_LINES_PER_TEST_CASE = 10;
export const MASK = "<<MASK>>";
