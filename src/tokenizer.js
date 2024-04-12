import llamaTokenizer from "llama-tokenizer-js";

const APPROXIMATE_MAX_TOKEN_LENGTH = 20;

export function truncateToTokenLength(text, length, side) {
  const maxCharLength = length * APPROXIMATE_MAX_TOKEN_LENGTH;

  let truncatedText = text;
  if (text.length > maxCharLength) {
    if (side === "left") {
      truncatedText = text.slice(-maxCharLength);
    } else if (side === "right") {
      truncatedText = text.slice(0, maxCharLength);
    } else {
      throw new Error("Invalid side");
    }
  }

  const encoded = llamaTokenizer.encode(truncatedText);

  if (encoded.length <= length) {
    return { text: truncatedText, length: encoded.length };
  }

  if (side === "left") {
    return { text: llamaTokenizer.decode(encoded.slice(-length)), length };
  } else if (side === "right") {
    return { text: llamaTokenizer.decode(encoded.slice(0, length)), length };
  } else {
    throw new Error("Invalid side");
  }
}
