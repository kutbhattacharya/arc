export function validateColumns(row: Record<string, any>, required: string[]): string[] {
  const cols = Object.keys(row || {})
  return required.filter((c) => !cols.includes(c))
}

