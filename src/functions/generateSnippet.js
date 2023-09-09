export const generateSnippet = (content, maxLength = 50) => {
  if (content.length <= maxLength) {
    return content;
  }
  return `${content.substring(0, maxLength)}...`;
};
