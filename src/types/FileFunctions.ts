import { modPow } from "./General"

export function RSAEncryptDecrypt(
  equivalentTable: string[],
  key: { clave: number; n: number },
  message: string
): string {
  const result: { char: string; index: number }[] = []

  // Recorre el mensaje y busca los índices
  let i = 0
  while (i < message.length) {
    const currentChar = message[i]

    if (currentChar === "[") {
      // Inicio de número entre corchetes
      let numStr = ""
      i++ // Avanza para saltar el '['

      while (i < message.length && message[i] !== "]") {
        numStr += message[i]
        i++
      }

      // i ahora está en el ']', así que avanzamos una vez más
      i++

      if (numStr.length > 0 && !isNaN(Number(numStr))) {
        result.push({ char: numStr, index: Number(numStr) })
      }
    } else {
      // Caracter normal (fuera de corchetes)
      const index = equivalentTable.indexOf(currentChar)

      if (index === -1 && currentChar !== "\n") {
        alert(
          `El carácter '${currentChar}' no está en la tabla de equivalencia.`
        )
        return "No se pudo convertir el mensaje."
      }

      result.push({ char: currentChar, index: index >= 0 ? index : -1 })
      i++
    }
  }

  // Convierte los índices a caracteres
  let newMessage = ""
  if (result.length !== 0) {
    result.forEach((element) => {
      if (element.index === -1) {
        newMessage += element.char
      } else {
        const indexFound = modPow(element.index, key.clave, key.n)
        newMessage += equivalentTable[indexFound] ?? `[${indexFound}]`
      }
    })
  }

  return newMessage
}
