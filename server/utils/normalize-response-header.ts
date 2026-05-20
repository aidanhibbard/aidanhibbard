export const normalizeResponseHeader = (
  value: string | number | string[] | undefined,
): string | undefined => {
  if (value === undefined) {
    return undefined
  }

  if (Array.isArray(value)) {
    return value.join(', ')
  }

  return String(value)
}
