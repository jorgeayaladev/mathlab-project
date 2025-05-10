import "katex/dist/katex.min.css"
import { FormEvent } from "react"
import { InlineMath } from "react-katex"
import { isPrime } from "../types/General"

const KeysGenerator = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const [p, q] = ["p", "q"].map((field) => {
      const value = formData.get(field)
      return value && !isNaN(Number(value)) ? Number(value) : null
    })

    if (p === null || q === null) {
      alert("Por favor, ingresa los primos p y q.")
      return
    } else {
      if (isNaN(p) || isNaN(q) || !isPrime(p) || !isPrime(q)) {
        alert("Por favor, ingresa números primos válidos.")
        return
      }
    }
  }

  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
      <h3 className="text-2xl font-semibold text-red-500 mb-3">
        Generador de Claves RSA
      </h3>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
      >
        <div>
          <label className="flex gap-2 text-gray-700 mb-2">
            <p>Primer primo</p>
            <InlineMath math={`p`} />
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            type="number"
            id="p"
            name="p"
            min="2"
          />
        </div>
        <div>
          <label className="flex gap-2 text-gray-700 mb-2">
            <p>Segundo primo</p>
            <InlineMath math={`q`} />
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            type="number"
            id="q"
            name="q"
            min="2"
          />
        </div>
        <div className="flex items-end">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition cursor-pointer">
            Generar Claves
          </button>
        </div>
      </form>
      <div
        id="rsa-keys-result"
        className="p-4 bg-white rounded-lg border border-gray-200"
      >
        <div>
          <p className="font-semibold underline">Procedimiento:</p>
          <p className="text-gray-800">
            <strong>Clave Pública (e, n):</strong>
            <span id="public-key"></span>
          </p>
          <p className="text-gray-800">
            <strong>Clave Privada (d, n):</strong>
            <span id="private-key"></span>
          </p>
        </div>
        <div>
          <p className="font-semibold underline">Claves Generadas:</p>
          <p className="text-gray-800">
            <strong>Clave Pública (e, n):</strong>
            <span id="public-key"></span>
          </p>
          <p className="text-gray-800">
            <strong>Clave Privada (d, n):</strong>
            <span id="private-key"></span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default KeysGenerator
