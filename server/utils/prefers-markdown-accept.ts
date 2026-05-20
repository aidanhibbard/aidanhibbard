export const prefersMarkdownAccept = (accept: string | undefined): boolean => {
  if (!accept) {
    return false
  }

  return /\btext\/markdown\b/i.test(accept)
}
