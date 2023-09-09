export const generateSnippet = (content, maxLength = 50) => {
  const plainText = content.replace(/<[^>]*>/g, "");
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return `${plainText.substring(0, maxLength)}...`;
};
