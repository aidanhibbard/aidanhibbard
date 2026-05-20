const BLOCKED_PREFIXES = ['/api', '/__'] as const

export const isSupportedMarkdownPage = (pathname: string): boolean => {
  const path = pathname.split('?')[0] ?? pathname

  if (!path || path.startsWith('/_')) {
    return false
  }

  for (const prefix of BLOCKED_PREFIXES) {
    if (path.startsWith(prefix)) {
      return false
    }
  }

  if (path.endsWith('.md')) {
    return true
  }

  const basename = path.split('/').pop() ?? ''

  return !basename.includes('.')
}
