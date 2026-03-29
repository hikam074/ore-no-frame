export function arrayStringify(arr?: string[] | null) {
  if (!arr || arr.length === 0) return "-"

  return arr
    .map(item =>
      item
        .trim()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
    )
    .join(", ")
}