import "katex/dist/katex.min.css"
import React, { FormEvent, useState } from "react"
import { InlineMath } from "react-katex"
import { mcd, modInverse } from "../types/General"
import DropDownLayout from "../layouts/DropDownLayout"

type Data = {
  a: number
  b: number
  n: number
}

const LinearCongruence = () => {
  const [data, setData] = useState<Data | null>(null)
  const [bucleElementos, setBucleElementos] = useState<React.JSX.Element[]>([])
  const [factor, setFactor] = useState<number>(1)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    let [a, b, n] = ["a", "b", "n"].map((field) => {
      return Number(formData.get(field))
    })

    // Verificar si los datos tienen un factor común de simplificación
    const simp = mcd(mcd(a, b), n)
    if (simp > 1) {
      a = a / simp
      b = b / simp
      n = n / simp
    }

    if (modInverse(a, n) === null) {
      alert("No existe inverso del módulo para esos valores.")
      return
    }

    const elementos: React.JSX.Element[] = []
    let factor = 1,
      encontrado = false
    while (!encontrado) {
      const buscado = (a * factor - 1) / n
      if ((a * factor - 1) % n === 0) {
        elementos.push(
          <InlineMath
            math={`{(${a} \\times ${factor} - 1) \\div ${n} = ${buscado} \\in \\mathbb{Z}}`}
          />
        )
        encontrado = true
      } else {
        elementos.push(
          <InlineMath
            math={`{(${a} \\times ${factor} - 1) \\div ${n} = ${buscado.toFixed(
              2
            )} \\notin \\mathbb{Z}}`}
          />
        )
        factor++
      }
    }

    setBucleElementos(elementos)
    setFactor(factor)
    setData({ a, b, n })
  }

  return (
    <div className="mt-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 className="text-2xl font-semibold text-red-500 mb-3">
        Calculadora de Congruencias
      </h3>
      <div className="mb-3 text-left bg-blue-50 border-l-4 border-blue-700 py-2 px-4">
        <p className="font-semibold underline">Consideración:</p>
        <InlineMath math={`{ax \\equiv b \\mod n}`} />
      </div>
      {/* Formulario de entrada */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4"
      >
        <div>
          <label className="flex gap-2 text-gray-700 mb-2">
            <p>Valor de</p>
            <InlineMath math={`a`} />
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            type="number"
            id="a"
            name="a"
            min="1"
          />
        </div>
        <div>
          <label className="flex gap-2 text-gray-700 mb-2">
            <p>Valor de</p>
            <InlineMath math={`b`} />
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            type="number"
            id="b"
            name="b"
            min="1"
          />
        </div>
        <div>
          <label className="flex gap-2 text-gray-700 mb-2">
            <p>Valor de</p>
            <InlineMath math={`n`} />
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            type="number"
            id="n"
            name="n"
            min="1"
          />
        </div>
        <div className="flex items-end">
          <button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition cursor-pointer"
            type="submit"
          >
            Resolver
          </button>
        </div>
      </form>

      {/* Respuesta */}
      <div className="p-4 mb-4 bg-white rounded-lg border border-gray-200">
        <p className="mb-3 font-semibold">Resultado:</p>
        <div className="text-left bg-green-50 border-l-4 border-green-700 py-2 px-4">
          {data ? (
            <div className="flex flex-col gap-1 text-left">
              {factor * data.b > data.n ? (
                <>
                  <InlineMath
                    math={`{x \\equiv ${(factor * data.b) % data.n} \\mod ${
                      data.n
                    }}`}
                  />
                  <InlineMath
                    math={`{x = ${data.n}k + ${
                      (factor * data.b) % data.n
                    }, k \\in \\mathbb{Z}}`}
                  />
                </>
              ) : (
                <>
                  <InlineMath
                    math={`{x \\equiv ${factor * data.b} \\mod ${data.n}}`}
                  />
                  <InlineMath
                    math={`{x = ${data.n}k + ${
                      factor * data.b
                    }, k \\in \\mathbb{Z}}`}
                  />
                </>
              )}
            </div>
          ) : (
            <p>No hay solución.</p>
          )}
        </div>
      </div>

      {/* Procedimiento */}
      <DropDownLayout id="linear-congruence-procedure" title="Procedimiento:">
        <div className="text-left bg-green-50 border-l-4 border-green-700 py-2 px-4">
          {data ? (
            <div className="flex flex-col gap-1">
              <p className="my-1 font-semibold">I) Se nos solicita resolver:</p>
              <InlineMath
                math={`{${data.a}x \\equiv ${data.b} \\mod ${data.n}}`}
              />
              <p className="my-1 font-semibold">
                II) Lo expresamos de la siguiente manera:
              </p>
              <InlineMath
                math={`{${data.a}x \\equiv \\mathring{${data.n}} + ${data.b}}`}
              />
              <p className="my-1 font-semibold">
                III) Buscamos el factor común:
              </p>
              {bucleElementos?.map((elemento, index) => (
                <div key={index}>{elemento}</div>
              ))}
              <div className="my-1 flex gap-1">
                <p className="font-semibold">
                  IV) Utilizamos el factor encontrado ("
                </p>
                <InlineMath math={`{${factor}}`} />
                <p className="font-semibold">"):</p>
              </div>
              <InlineMath
                math={`{${factor}(${data.a}x) \\equiv ${factor}(\\mathring{${data.n}} + ${data.b})}`}
              />
              <InlineMath
                math={`{${factor * data.a}x \\equiv ${factor}(\\mathring{${
                  data.n
                }}) + ${factor}(${data.b})}`}
              />
              <InlineMath
                math={`{(\\mathring{${data.n}} + 1)x \\equiv \\mathring{${
                  data.n
                }} + ${factor * data.b}}`}
              />
              {factor * data.b > data.n ? (
                <>
                  <InlineMath
                    math={`{\\mathring{${data.n}}x + x \\equiv \\mathring{${
                      data.n
                    }} + (\\mathring{${data.n}} + ${
                      (factor * data.b) % data.n
                    })}`}
                  />
                  <InlineMath
                    math={`{\\mathring{${data.n}}x + x \\equiv \\mathring{${
                      data.n
                    }} + ${(factor * data.b) % data.n}}`}
                  />
                  <InlineMath
                    math={`{x \\equiv \\mathring{${data.n}} - \\mathring{${
                      data.n
                    }} + ${(factor * data.b) % data.n}}`}
                  />
                  <InlineMath
                    math={`{x \\equiv \\mathring{${data.n}} + ${
                      (factor * data.b) % data.n
                    }}`}
                  />
                  <p className="my-1 font-semibold">V) Resultado final:</p>
                  <InlineMath
                    math={`{x = ${data.n}k + ${
                      (factor * data.b) % data.n
                    }, k \\in \\mathbb{Z}}`}
                  />
                </>
              ) : (
                <>
                  <InlineMath
                    math={`{\\mathring{${data.n}}x + x \\equiv \\mathring{${
                      data.n
                    }} + ${factor * data.b}}`}
                  />
                  <InlineMath
                    math={`{x \\equiv \\mathring{${data.n}} - \\mathring{${
                      data.n
                    }} + ${factor * data.b}}`}
                  />
                  <InlineMath
                    math={`{x \\equiv \\mathring{${data.n}} + ${
                      factor * data.b
                    }}`}
                  />
                  <p className="my-1 font-semibold">V) Resultado final:</p>
                  <InlineMath
                    math={`{x = ${data.n}k + ${
                      factor * data.b
                    }, k \\in \\mathbb{Z}}`}
                  />
                </>
              )}
            </div>
          ) : (
            <InlineMath math={`{ax \\equiv b \\mod n}`} />
          )}
        </div>
      </DropDownLayout>
    </div>
  )
}

export default LinearCongruence
