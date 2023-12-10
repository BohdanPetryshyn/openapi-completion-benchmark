import { buildPrompt as buildPromptNaive } from "./naive.js";
import { buildPrompt as buildPromptNaive7030 } from "./naive-70-30.js";
import { buildPrompt as buildPromptWithComponents } from "./with-components.js";
import { buildPrompt as buildPromptWithNoComponents } from "./with-no-components.js";
import { buildPrompt as buildPromptWith1500CompactComponents } from "./with-1500-compact-components.js";

export const PROMPT_BUILDERS = {
  naive: buildPromptNaive,
  "naive-70-30": buildPromptNaive7030,
  "with-components": buildPromptWithComponents,
  "with-no-components": buildPromptWithNoComponents,
  "with-1500-compact-components": buildPromptWith1500CompactComponents,
};
