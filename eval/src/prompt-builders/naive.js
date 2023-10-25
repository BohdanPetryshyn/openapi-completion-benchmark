import { truncateToTokenLength } from "../tokenizer.js";

export function buildPrompt({ prefix, suffix, maxTokens }) {
  const maxTokensPerSide = Math.floor(maxTokens / 2);

  const promptPrefix = truncateToTokenLength(prefix, maxTokensPerSide, "left");
  const promptSuffix = truncateToTokenLength(suffix, maxTokensPerSide, "right");

  return {
    promptPrefix,
    promptSuffix,
  };
}
