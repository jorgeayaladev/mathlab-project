import { FormEvent } from "react"
import { isPrime, obtainKeys, shuffledArray } from "../types/General"
import { generateTable } from "../types/FileStyle"
import { InlineMath } from "react-katex"
import { blocTxtArray } from "../types/Constants"

const StepOneFiles = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Obtener datos de p y q y calcular las llaves privada y pública
    const formData = new FormData(event.currentTarget)
    const [p, q] = ["p", "q"].map((field) => {
      return Number(formData.get(field))
    })

    // Validar que los números ingresados sean primos
    if (!isPrime(p) || !isPrime(q)) {
      alert("Por favor, ingresa números primos válidos.")
      return
    }

    // Preparo los datos para insertarlos al archivo .txt
    const data = obtainKeys(p, q)
    const tablaRandom = shuffledArray(p, q, blocTxtArray)

    // Preparo el contenido del archivo .txt
    let content = ""
    content += `${tablaRandom.join(";")}\n`
    content += `${data.e};${data.n};${data.d}\n`
    content += `||==========================================================||\n`
    content += `||                  Cifrado y descifrado RSA                ||\n`
    content += `||==========================================================||\n`
    content += `|| Las claves generadas son:\n`
    content += `|| Clave Pública: (${data.e}; ${data.n})\n`
    content += `|| Clave Privada: (${data.d}; ${data.n})\n`
    content += `||==========================================================||\n`
    content += `|| La tabla de equivalencia generada es:                    ||\n`
    content += generateTable(tablaRandom)

    // Creo el archivo .txt y lo inserto en una etiqueta a provisoria
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "rsa_data.txt"
    a.click()

    // libera memoria
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-red-500 mb-4">
        Paso 1. Generar los datos necesarios
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
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
        <button className="w-full py-2 px-4 flex justify-center items-center gap-2 text-white bg-blue-600 hover:bg-blue-800 rounded-lg transition cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 md:w-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          <p>Descargar rsa_data.txt</p>
        </button>
      </form>
    </>
  )
}

export default StepOneFiles
