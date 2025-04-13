import { FormEvent, useState } from "react"
import Cell from "../components/Celda"

const CaseTwoView = () => {
  const [numCeldas, setNumCeldas] = useState<number | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const value = formData.get("numCeldas") as string

    if (value && !isNaN(Number(value))) {
      setNumCeldas(Number(value))
    }
  }

  return (
    <div className="p-5 w-full flex flex-col gap-3 bg-white rounded-lg">
      <hr />

      <h2 className="text-lg text-center">
        <b>CASO 2</b>: Utilizar la tabla de equivalencia dada para encriptar una
        palabra
      </h2>

      <hr />

      <h3 className="text-lg underline">Teoría:</h3>
      <p className="bg-yellow-300 font-semibold">En desarrollo...</p>

      <hr />

      <h3 className="text-lg underline">Laboratorio:</h3>
      {/* Cantidad de celdas */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center gap-4"
      >
        <label
          className="text-lg text-slate-800 text-center"
          htmlFor="numCeldas"
        >
          Ingrese una cantidad de celdas:
        </label>
        <input
          className="border border-slate-400 rounded-md text-center"
          type="number"
          id="numCeldas"
          name="numCeldas"
          min="1"
          max="100"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-800 text-white font-bold px-4 py-0.5 rounded-md cursor-pointer"
        >
          Aplicar
        </button>
      </form>

      {/* Resultado */}
      <div className="">
        <div className="grid grid-cols-5 gap-0.5">
          {numCeldas ? (
            Array.from({ length: numCeldas }, (_, i) => i).map((index) => (
              <Cell index={index} />
            ))
          ) : (
            <div className="col-span-5 border border-slate-400 rounded-md p-4 text-center">
              <p>Aquí va una tabla de equivalencia</p>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="mt-3 bg-blue-500 hover:bg-blue-800 text-white font-bold px-4 py-0.5 rounded-md cursor-pointer"
        >
          Calcular
        </button>
      </div>
      
      <h3 className="text-lg underline">Respuesta:</h3>
      <p className="bg-yellow-300 font-semibold">En desarrollo...</p>

      <hr />
    </div>
  )
}

export default CaseTwoView
