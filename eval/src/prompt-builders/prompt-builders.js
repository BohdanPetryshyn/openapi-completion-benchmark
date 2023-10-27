import { buildPrompt as buildPromptNaive } from "./naive.js";
import { buildPrompt as buildPromptNaive7030 } from "./naive-70-30.js";
import { buildPrompt as buildPromptWithComponents } from "./with-components.js";

export const PROMPT_BUILDERS = {
  naive: buildPromptNaive,
  "naive-70-30": buildPromptNaive7030,
  "with-components": buildPromptWithComponents,
};
