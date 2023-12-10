import { truncateToTokenLength } from "../tokenizer.js";

const MAX_COMPONENTS_TOKENS = 1500;

export function buildPrompt({ prefix, suffix, maxTokens }) {
  const content = `${prefix}${suffix}`;

  const componentsStart = content.search(/\ncomponents:\n/);

  const componentEndRegex = /\n\w|$/g;
  componentEndRegex.lastIndex = componentsStart + "\ncomponents:\n".length;
  const { index: componentsEnd } = componentEndRegex.exec(content);

  const components = content.slice(componentsStart + 1, componentsEnd);
  const componentsList = components.replaceAll(/ {6,}.*?(\n|$)/g, "");
  const componentsSnippet =
    "# Available components:\n" +
    componentsList
      .split("\n")
      // Remove empty lines
      .filter((line) => line.length > 0)
      // Remove colon in the component names
      .map((line) => (line.startsWith("    ") ? line.slice(0, -1) : line))
      .map((line) => "# " + line)
      .join("\n")
      // Compress by removing newlines and indentations
      .replaceAll(/\n#     /g, ",")
      .replaceAll(":,", ":") +
    "\n# Path: openapi.yaml\n";

  const { text: componentsSnippetTruncated, length: componentsSnippetTokens } =
    truncateToTokenLength(componentsSnippet, MAX_COMPONENTS_TOKENS, "right");

  // console.log("COMPONENTS");
  // console.log(componentsSnippetTruncated);
  // console.log(
  //   "COMPONENTS_LENGTH",
  //   componentsSnippetTokens,
  //   truncateToTokenLength(componentsSnippet, 99999999, "right").length
  // );

  const maxPrefixTokens = Math.floor(maxTokens * 0.8) - componentsSnippetTokens;
  const maxSuffixTokens = Math.floor(maxTokens * 0.2);

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
