// Verificar si es primo
export function isPrime(num: number) {
  if (num <= 1) return false
  for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
    if (num % i === 0) return false
  }
  return true
}

// Calcular el máximo común divisor
export function mcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }
  return a
}

/**
 * Función para encontrar el inverso multiplicativo de 'a' módulo 'm' usando el algoritmo extendido de Euclides.
 * Devuelve null si el inverso no existe.
 */
export function modInverse(a: number, m: number): number | null {
  let [oldR, r] = [a, m]
  let [oldS, s] = [1, 0]
  let [oldT, t] = [0, 1]

  while (r !== 0) {
    const quotient = Math.floor(oldR / r)
    ;[oldR, r] = [r, oldR - quotient * r]
    ;[oldS, s] = [s, oldS - quotient * s]
    ;[oldT, t] = [t, oldT - quotient * t]
  }

  if (oldR !== 1) return null // No existe inverso si GCD(a, m) != 1
  return ((oldS % m) + m) % m // Aseguramos que el resultado sea positivo
}

// Obtener las claves pública y privada
export function obtainKeys(
  p: number,
  q: number
): { n: number; e: number; d: number | null } {
  const phi_n = (p - 1) * (q - 1)
  let e = 2
  while (mcd(e, phi_n) !== 1 && e < phi_n) e++
  const d = modInverse(e, phi_n)
  return { n: p * q, e, d }
}

// Crear una tabla de equivalencia aleatoriamente, si el tamaño de la tabla no es menor que n = p * q, se debe eliminar las ultimas n - 1 caracteres de la tabla
export function shuffledArray(p: number, q: number, arr: string[]): string[] {
  const n = p * q
  const array = arr.length < n ? arr : arr.slice(0, n - 1)
  const shuffled = [...array] // Clonamos para no modificar el original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]] // Intercambio
  }
  return shuffled
}

export function mapMessageToIndices(
  randomTable: string[],
  message: string
): { char: string; index: number }[] {
  const result: { char: string; index: number }[] = []
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
      const index = randomTable.indexOf(currentChar)

      if (index === -1) {
        alert(
          `El carácter '${currentChar}' no está en la tabla de equivalencia.`
        )
        return []
      }

      result.push({ char: currentChar, index: index >= 0 ? index : -1 })
      i++
    }
  }

  return result
}

export function modPow(base: number, exponent: number, mod: number): number {
  let result = 1
  base = base % mod
  while (exponent > 0) {
    if (exponent % 2 === 1) result = (result * base) % mod
    exponent = Math.floor(exponent / 2)
    base = (base * base) % mod
  }
  return result
}

export function mapMyMessage(
  originalMessageArr: { char: string; index: number }[],
  randomTable: string[],
  key: { clave: number; n: number }
): { message: string; messageArray: { char: string; index: number }[] } {
  const indices: number[] = []
  originalMessageArr.forEach((element) => {
    const encryptedIndex = modPow(element.index, key.clave, key.n)
    indices.push(encryptedIndex)
  })

  let message = ""
  const messageArray = indices.map((index) => {
    const char = randomTable[index] ?? `[${index}]`
    message += char
    return { char, index }
  })

  return { message, messageArray }
}
