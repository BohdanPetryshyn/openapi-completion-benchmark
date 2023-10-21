const PREFIX_INPUT_LENGTH = 7500;
const SUFFIX_INPUT_LENGTH = 7500;

export function buildPrompt({ prefix, suffix }) {
  const promptPrefix = prefix.slice(-PREFIX_INPUT_LENGTH, prefix.length);
  const promptSuffix = suffix.slice(0, SUFFIX_INPUT_LENGTH);

  return {
    promptPrefix,
    promptSuffix,
  };
}
