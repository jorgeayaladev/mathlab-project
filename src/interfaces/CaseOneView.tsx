import "katex/dist/katex.min.css"
import { FormEvent, useState } from "react"
import { InlineMath } from "react-katex"
import { solveLinearCongruence } from "../types/CaseOne"

type Result = {
  x0: number
  k: number
}

const CaseOneView = () => {
  const [result, setResult] = useState<Result | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const [a, b, m] = ["a", "b", "m"].map((field) => {
      const value = formData.get(field)
      return value && !isNaN(Number(value)) ? Number(value) : null
    })

    if (a !== null && b !== null && m !== null) {
      const result = solveLinearCongruence(a, b, m)
      if (result) {
        setResult(result)
      } else {
        setResult(null)
      }
    }
  }

  return (
    <div className="p-5 w-full flex flex-col gap-3 bg-white rounded-lg">
      <hr />

      <h2 className="text-lg text-center">
        <b>CASO 1</b>: Resolución de congruencias lineales
      </h2>

      <hr />

      {/* Teoría de congruencias lineales */}
      <h3 className="text-lg underline">Teoría:</h3>
      <ul className="flex flex-col gap-1">
        <li className="flex gap-1">
          <p>Son ecuaciones de la forma:</p>
          <InlineMath math={`{ax \\equiv b \\mod n}`} />
        </li>
        <li className="flex gap-1">
          <p>Existen soluciones para</p>
          <InlineMath math={`{x}`} />
          <p>si y solo si</p>
          <InlineMath math={`{MCD(a, n) \\ \\vert \\ b}`} />
        </li>
        <li className="flex gap-1">
          <p>La solución general es:</p>
          <InlineMath math={`{x = x_0 + \\text{\\(\\frac n d\\)} \\times k}`} />
        </li>
        <li className="flex gap-1">
          <p>Donde</p>
          <InlineMath math={`{x_0}`} />
          <p>es una solución,</p>
          <InlineMath math={`{k}`} />
          <p>es un entero y</p>
          <InlineMath math={`{d = MCD(a, n)}`} />
        </li>
      </ul>

      <hr />

      {/* Laboratorio */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg underline">Calculando la congruencia lineal:</h3>

        {/* Cantidad de celdas */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center gap-2"
        >
          <input
            className="border border-slate-400 rounded-md text-center"
            type="number"
            id="a"
            name="a"
            min="1"
            max="100"
          />
          <InlineMath math={`{x \\equiv}`} />
          <input
            className="border border-slate-400 rounded-md text-center"
            type="number"
            id="b"
            name="b"
            min="1"
            max="100"
          />
          <InlineMath math={`{mod}`} />
          <input
            className="border border-slate-400 rounded-md text-center"
            type="number"
            id="m"
            name="m"
            min="1"
            max="100"
          />
          <button
            type="submit"
            className="ml-3 bg-blue-500 hover:bg-blue-800 text-white font-bold px-4 py-0.5 rounded-md cursor-pointer"
          >
            Calcular
          </button>
        </form>

        <h3 className="text-lg underline">Respuesta:</h3>
        {result ? (
          <ul className="flex flex-col gap-1">
            <li className="flex gap-1">
              <InlineMath
                math={`{x \\equiv ${result?.x0} \\mod ${result?.k}}`}
              />
            </li>
            <li className="flex gap-1">
              <InlineMath
                math={`{x = ${result?.k} k + ${result?.x0}, k \\in \\mathbb{Z}}`}
              />
            </li>
          </ul>
        ) : (
          <p>No hay solución.</p>
        )}

        <hr />

        <h3 className="text-lg underline">Procedimiento:</h3>
        <p className="bg-yellow-300 font-semibold">En desarrollo...</p>

        <hr />
      </div>
    </div>
  )
}

export default CaseOneView
