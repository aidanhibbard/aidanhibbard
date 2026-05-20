export const mergeLinkHeader = (
  existing: string | number | string[] | undefined,
  additions: string[],
): string => {
  const normalized = typeof existing === 'undefined'
    ? undefined
    : Array.isArray(existing)
      ? existing.join(', ')
      : String(existing)

  const current = normalized
    ? normalized.split(',').map(part => part.trim()).filter(Boolean)
    : []

  const merged = [...current]

  for (const link of additions) {
    if (!merged.includes(link)) {
      merged.push(link)
    }
  }

  return merged.join(', ')
}
