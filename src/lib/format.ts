export function formatDate(date: Date, locale: boolean = true) {
  const year = locale ? date.getFullYear() : date.getUTCFullYear()
  const month = (locale ? date.getMonth() : date.getUTCMonth()) + 1
  const day = locale ? date.getDate() : date.getUTCDate()
  return `${day}/${month}/${year}`
}
export function toTitleCase(name: string): string {
  return name
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
