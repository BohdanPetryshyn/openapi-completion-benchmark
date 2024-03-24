export function embedResult(result, prefix, suffix) {
  if (result.endsWith(" <EOT>")) {
    return {
      embedded: true,
      result: result.slice(0, -6),
    };
  }

  for (let i = 0; i < result.length; i++) {
    if (suffix.startsWith(result.slice(i))) {
      return {
        embedded: true,
        result: result.slice(0, i),
      };
    }
  }

  return {
    embedded: false,
    result,
  };
}
