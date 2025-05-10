// Funciones auxiliares matemáticas
export function isPrime(num: number) {
  if (num <= 1) return false
  for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
    if (num % i === 0) return false
  }
  return true
}

export function mcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }
  return a
}
