import "katex/dist/katex.min.css"
import { FormEvent, useState } from "react"
import { InlineMath } from "react-katex"
import { isPrime, mcd, modInverse } from "../types/General"
import DropDownLayout from "../layouts/DropDownLayout"

type Data = {
  p: number
  q: number
  n: number
  phi_n: number
  e: number
  d: number | null
}

const KeysGenerator = () => {
  const [data, setData] = useState<Data | null>(null)
  const [eJSXValues, setEJSXValues] = useState<React.JSX.Element[]>([])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const [p, q] = ["p", "q"].map((field) => {
      return Number(formData.get(field))
    })

    if (!isPrime(p) || !isPrime(q)) {
      alert("Por favor, ingresa números primos válidos.")
      return
    }

    const n = p * q
    const phi_n = (p - 1) * (q - 1)

    let e = 2
    const eElements: React.JSX.Element[] = []
    while (mcd(e, phi_n) !== 1 && e < phi_n) {
      if (isPrime(e) && mcd(e, phi_n) !== 1) {
        eElements.push(
          <InlineMath
            math={`{e = ${e} \\Rightarrow (MCD(${e}, ${phi_n}) \\ne 1)}`}
          />
        )
      }
      e++
      if (isPrime(e) && mcd(e, phi_n) === 1) {
        eElements.push(
          <InlineMath
            math={`{e = ${e} \\Rightarrow (MCD(${e}, ${phi_n}) = 1)}`}
          />
        )
      }
    }

    if (e === 2) {
      eElements.push(
        <InlineMath
          math={`{e = ${e} \\Rightarrow (MCD(${e}, ${phi_n}) = 1)}`}
        />
      )
    }

    const d = modInverse(e, phi_n)

    setData({ p, q, n, phi_n, e, d })
    setEJSXValues(eElements)
  }

  return (
    <div className="mt-6 bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
      <h3 className="text-2xl font-semibold text-red-500 mb-3">
        Generador de Claves RSA
      </h3>
      <div className="mb-3 text-left flex flex-col bg-blue-50 border-l-4 border-blue-700 py-2 px-4">
        <p className="font-semibold underline">Consideraciones:</p>
        <InlineMath math={`{n = p \\times q}`} />
        <InlineMath math={`{\\phi_n = (p - 1) \\times (q - 1)}`} />
        <InlineMath
          math={`{e \\lrArr (1 \\lt e \\lt \\phi_n) \\land (MCD(e, \\phi_n) = 1)}`}
        />
        <InlineMath math={`{e \\times d \\equiv 1 \\mod \\phi_n}`} />
      </div>
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

      {/* Respuesta */}
      <div className="p-4 mb-4 bg-white rounded-lg border border-gray-200">
        <p className="mb-3 font-semibold">Resultado:</p>
        <div className="bg-green-50 border-l-4 border-green-700 py-2 px-4">
          {data ? (
            <>
              <p className="font-semibold">Claves Generadas:</p>
              <div className="flex gap-2">
                <p>Clave Pública (e, n):</p>
                <InlineMath math={`{(${data.e}, ${data.n})}`} />
              </div>
              <div className="flex gap-2">
                <p>Clave Privada (d, n):</p>
                <InlineMath math={`{(${data.d}, ${data.n})}`} />
              </div>
            </>
          ) : (
            <p>No hay solución.</p>
          )}
        </div>
      </div>

      {/* Procedimiento */}
      <DropDownLayout id="keys-generator-procedure" title="Procedimiento:">
        <div className="bg-green-50 border-l-4 border-green-700 py-2 px-4">
          {data ? (
            <>
              {/* 1. Hallamos el valor de n */}
              <div className="flex flex-col">
                <span className="my-1 flex font-semibold">
                  <p className="mr-1">I) Hallamos el valor de</p>{" "}
                  <InlineMath math={`n`} />:
                </span>
                <InlineMath math={`{n = p \\times q}`} />
                <InlineMath
                  math={`{n = ${data.p} \\times ${data.q} = ${data.n}}`}
                />
              </div>
              <hr className="my-3" />

              {/* 2. Hallamos el valor de phi_n */}
              <div className="flex flex-col">
                <span className="my-1 flex font-semibold">
                  <p className="mr-1">II) Hallamos el valor de</p>{" "}
                  <InlineMath math={`\\phi_n`} />:
                </span>
                <InlineMath math={`{\\phi_n = (p - 1) \\times (q - 1)}`} />
                <InlineMath
                  math={`{\\phi_n = (${data.p} - 1) \\times (${data.q} - 1) = ${data.phi_n}}`}
                />
              </div>
              <hr className="my-3" />

              {/* 3. Hallamos el valor de e */}
              <div className="flex flex-col">
                <span className="my-1 flex font-semibold">
                  <p className="mr-1">III) Hallamos el valor de</p>{" "}
                  <InlineMath math={`e`} />:
                </span>
                <InlineMath
                  math={`{e \\lrArr (1 \\lt e \\lt \\phi_n) \\land (MCD(e, \\phi_n) = 1)}`}
                />
                {eJSXValues?.map((elemento, index) => (
                  <div key={index}>{elemento}</div>
                ))}
                <InlineMath math={`{e = ${data.e}}`} />
              </div>
              <hr className="my-3" />

              {/* 4. Hallamos el valor de d */}
              <div className="flex flex-col">
                <span className="my-1 flex font-semibold">
                  <p className="mr-1">IV) Hallamos el valor de</p>{" "}
                  <InlineMath math={`d`} />:
                </span>
                <InlineMath math={`{e \\times d \\equiv 1 \\mod \\phi_n}`} />
                <InlineMath
                  math={`{${data.e}d \\equiv 1 \\mod ${data.phi_n}}`}
                />
                <InlineMath
                  math={`{d = ${data.phi_n}k + ${data.d}, k \\in \\mathbb{Z}}`}
                />
                <InlineMath math={`{d = ${data.d}}`} />
              </div>
            </>
          ) : (
            <p>No hay solución.</p>
          )}
        </div>
      </DropDownLayout>
    </div>
  )
}

export default KeysGenerator
