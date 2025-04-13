/**
 * Función para calcular el máximo común divisor (GCD) usando el algoritmo de Euclides.
 */
function gcd(a: number, b: number): number {
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
function modInverse(a: number, m: number): number | null {
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

/**
 * Función para resolver la congruencia lineal a x ≡ b mod m.
 * Devuelve la solución general x ≡ x0 mod k, o null si no hay solución.
 */
export function solveLinearCongruence(
  a: number,
  b: number,
  m: number
): { x0: number; k: number } | null {
  const d = gcd(a, m)

  if (b % d !== 0) {
    return null // No hay solución si d no divide a b
  }

  // Simplificamos la congruencia dividiendo por d
  const aReduced = a / d
  const bReduced = b / d
  const mReduced = m / d

  // Encontramos el inverso multiplicativo de aReduced módulo mReduced
  const inv = modInverse(aReduced, mReduced)
  if (inv === null) {
    return null // No debería ocurrir porque GCD(aReduced, mReduced) = 1
  }

  const x0 = (bReduced * inv) % mReduced
  return { x0, k: mReduced }
}
