import { buildPrompt as buildPromptNaive } from "./naive.js";
import { buildPrompt as buildPromptNaiveAsymmetrical } from "./naive-asymmetrical.js";
import { buildPrompt as buildPromptNaiveAsymmetricalSpm } from "./naive-asymmetrical-spm.js";
import { buildPrompt as buildPromptWithComponents } from "./with-components.js";
import { buildPrompt as buildPromptWithNoComponents } from "./with-no-components.js";
import { buildPrompt as buildPromptWith1500CompactComponents } from "./with-1500-compact-components.js";

export const PROMPT_BUILDERS = {
  naive: buildPromptNaive,
  "naive-asymmetrical": buildPromptNaiveAsymmetrical,
  "naive-asymmetrical-spm": buildPromptNaiveAsymmetricalSpm,
  "with-components": buildPromptWithComponents,
  "with-no-components": buildPromptWithNoComponents,
  "with-1500-compact-components": buildPromptWith1500CompactComponents,
};
