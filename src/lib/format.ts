export function formatDate(date: Date, locale: boolean = true) {
  const year = locale ? date.getFullYear() : date.getUTCFullYear()
  const month = (locale ? date.getMonth() : date.getUTCMonth()) + 1
  const day = locale ? date.getDate() : date.getUTCDate()
  return `${day}/${month}/${year}`
}
