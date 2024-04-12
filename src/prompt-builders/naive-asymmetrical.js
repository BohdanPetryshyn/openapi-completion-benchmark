import { truncateToTokenLength } from "../tokenizer.js";
import { PREFIX, SUFFIX } from "../shared.js";

export function buildPrompt({ prefix, suffix, maxTokens }) {
  const maxPrefixTokens = Math.floor(maxTokens * PREFIX);
  const maxSuffixTokens = Math.floor(maxTokens * SUFFIX);

  const { text: promptPrefix } = truncateToTokenLength(
    prefix,
    maxPrefixTokens,
    "left"
  );
  const { text: promptSuffix } = truncateToTokenLength(
    suffix,
    maxSuffixTokens,
    "right"
  );

  return `<PRE> ${promptPrefix} <SUF>${promptSuffix} <MID>`;
}
