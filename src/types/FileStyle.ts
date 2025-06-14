export function generateTable(array: string[], columns = 10): string {
  let result = ""
  const rowCount = Math.ceil(array.length / columns)
  const lineSeparator = "||" + "=".repeat(columns * 6 - 2) + "||\n"

  for (let row = 0; row < rowCount; row++) {
    const start = row * columns
    const slice = array.slice(start, start + columns)

    // Valores
    const values = slice.map((v) => ` ${v.padEnd(2, " ")} `).join("||")
    // Separadores
    const dashes = slice.map(() => " -- ").join("||")
    // Índices
    const indexes = slice
      .map((_, i) => {
        const idx = start + i
        return ` ${idx}${idx < 10 ? " " : ""} `.padEnd(3, " ")
      })
      .join("||")

    result += lineSeparator
    result += `||${values}||\n`
    result += `||${dashes}||\n`
    result += `||${indexes}||\n`
  }

  result += lineSeparator
  return result
}
