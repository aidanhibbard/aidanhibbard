export const resolveMarkdownPagePath = (pathname: string): string | null => {
  if (pathname.startsWith('/api') || pathname.startsWith('/_')) {
    return null
  }

  if (pathname.endsWith('.md')) {
    const withoutExtension = pathname.slice(0, -3)

    if (withoutExtension.endsWith('/index')) {
      return withoutExtension.slice(0, -6) || '/'
    }

    return withoutExtension || '/'
  }

  return pathname
}
