const PREFIX_INPUT_LENGTH = 15000;
const SUFFIX_INPUT_LENGTH = 15000;

export function buildPrompt({ prefix, suffix }) {
  const content = `${prefix}${suffix}}`;
  const components = content.match;

  const promptPrefix = prefix.slice(-PREFIX_INPUT_LENGTH, prefix.length);
  const promptSuffix = suffix.slice(0, SUFFIX_INPUT_LENGTH);

  return {
    promptPrefix,
    promptSuffix,
  };
}
