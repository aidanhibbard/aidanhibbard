export const mergeLinkHeader = (
  existing: string | number | undefined,
  additions: string[],
): string => {
  const current = typeof existing === 'string'
    ? existing.split(',').map(part => part.trim()).filter(Boolean)
    : []

  const merged = [...current]

  for (const link of additions) {
    if (!merged.includes(link)) {
      merged.push(link)
    }
  }

  return merged.join(', ')
}
