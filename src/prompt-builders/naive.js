import { truncateToTokenLength } from "../tokenizer.js";

export function buildPrompt({ prefix, suffix, maxTokens }) {
  const { text: promptPrefix } = truncateToTokenLength(
    prefix,
    maxTokens,
    "left"
  );

  return promptPrefix;
}
