import { truncateToTokenLength } from "../tokenizer.js";

export function buildPrompt({ prefix, suffix, maxTokens }) {
  const maxPrefixTokens = Math.floor(maxTokens * Number(process.env.PREFIX));
  const maxSuffixTokens = Math.floor(maxTokens * Number(process.env.SUFFIX));

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

  return `<PRE> <SUF>${promptSuffix} <MID> ${promptPrefix}`;
}
