import { buildPrompt as buildPromptNaive } from "./naive.js";
import { buildPrompt as buildPromptNaiveAsymmetrical } from "./naive-asymmetrical.js";
import { buildPrompt as buildPromptNaiveAsymmetricalSpm } from "./naive-asymmetrical-spm.js";
import { buildPrompt as buildPromptWithComponents } from "./with-components.js";

export const PROMPT_BUILDERS = {
  naive: buildPromptNaive,
  "naive-asymmetrical": buildPromptNaiveAsymmetrical,
  "naive-asymmetrical-spm": buildPromptNaiveAsymmetricalSpm,
  "with-components": buildPromptWithComponents,
};
