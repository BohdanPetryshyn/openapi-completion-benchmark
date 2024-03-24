import { truncateToTokenLength } from "../tokenizer.js";

const MAX_COMPONENTS_TOKENS = 1000;

export function buildPrompt({ prefix, suffix, maxTokens }) {
  const content = `${prefix}${suffix}`;

  const componentsStart = content.search(/\ncomponents:\n/);

  const componentEndRegex = /\n\w|$/g;
  componentEndRegex.lastIndex = componentsStart + "\ncomponents:\n".length;
  const { index: componentsEnd } = componentEndRegex.exec(content);

  const components = content.slice(componentsStart + 1, componentsEnd);
  const componentsList = components.replaceAll(/ {6,}.*?(\n|$)/g, "");
  const componentsSnippet =
    "# Some of the available components:\n" +
    componentsList
      .split("\n")
      // Remove empty lines
      .filter((line) => line.length > 0)
      // Remove colon in the component names
      .map((line) => (line.startsWith("    ") ? line.slice(0, -1) : line))
      .map((line) => "# " + line)
      .join("\n") +
    "\n";

  const { text: componentsSnippetTruncated, length: componentsSnippetTokens } =
    truncateToTokenLength(componentsSnippet, MAX_COMPONENTS_TOKENS, "right");

  const maxPrefixTokens = Math.floor(maxTokens * 0.6) - componentsSnippetTokens;
  const maxSuffixTokens = Math.floor(maxTokens * 0.4);

  const promptPrefix =
    componentsSnippetTruncated +
    truncateToTokenLength(prefix, maxPrefixTokens, "left").text;
  const { text: promptSuffix } = truncateToTokenLength(
    suffix,
    maxSuffixTokens,
    "right"
  );

  return {
    promptPrefix,
    promptSuffix,
  };
}
