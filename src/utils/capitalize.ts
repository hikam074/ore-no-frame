export function capitalize(str?: string | null) {
  return str ? str[0].toUpperCase() + str.slice(1) : "-"
}

