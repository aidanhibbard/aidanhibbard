import { prefersMarkdownAccept } from './prefers-markdown-accept'

export const isMarkdownNegotiationRequest = (
  pathname: string,
  accept: string | undefined,
): boolean => {
  return pathname.endsWith('.md') || prefersMarkdownAccept(accept)
}
