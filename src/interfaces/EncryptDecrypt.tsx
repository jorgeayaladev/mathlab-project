import "katex/dist/katex.min.css"
import { FormEvent, useState } from "react"
import { InlineMath } from "react-katex"
import {
  isPrime,
  mapMyMessage,
  mapMessageToIndices,
  obtainKeys,
  shuffledArray,
} from "../types/General"
import DropDownLayout from "../layouts/DropDownLayout"
import { sortedArray } from "../types/Constants"

type Data = {
  n: number
  e: number
  d: number | null
}

type Character = {
  char: string
  index: number
}

function EncryptDecrypt() {
  const [data, setData] = useState<Data | null>(null)
  const [tablaRandom, setTablaRandom] = useState<string[] | null>(null)
  const [arrMsgDescifrado, setArrMsgDescifrado] = useState<Character[] | null>(
    null
  )
  const [arrMsgCifrado, setArrMsgCifrado] = useState<Character[] | null>(null)
  const [msgCifrado, setMsgCifrado] = useState<{
    message: string
    messageArray: Character[]
  } | null>(null)
  const [msgDescifrado, setMsgDescifrado] = useState<{
    message: string
    messageArray: Character[]
  } | null>(null)

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

    // Calcular las variables principales para las llaves publica y privada
    setData(obtainKeys(p, q))

    // Insertar la tabla de equivalencia aleatoria en el estado
    setTablaRandom(shuffledArray(p, q, sortedArray))
  }

  const handleSubmitEncrypt = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const message = formData.get("encrypted-message")?.toString() || ""

    // Obtener los indices de los caracteres según la tabla de equivalencia
    if (tablaRandom) {
      const mensajeDescifrado = mapMessageToIndices(tablaRandom, message)
      setArrMsgDescifrado(mensajeDescifrado)

      // Calcular el mensaje encriptado
      const datosCifrados = mapMyMessage(mensajeDescifrado, tablaRandom, {
        clave: data?.e || 0,
        n: data?.n || 0,
      })
      setMsgCifrado(datosCifrados)
    }
  }

  const handleSubmitDecrypt = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const message = formData.get("decrypted-message")?.toString() || ""

    // Obtener los indices de los caracteres según la tabla de equivalencia
    if (tablaRandom) {
      const mensajeCifrado = mapMessageToIndices(tablaRandom, message)
      setArrMsgCifrado(mensajeCifrado)

      // Calcular el mensaje encriptado
      const datosDescifrados = mapMyMessage(mensajeCifrado, tablaRandom, {
        clave: data?.d || 0,
        n: data?.n || 0,
      })
      setMsgDescifrado(datosDescifrados)
    }
  }

  return (
    <div className="mt-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
      {/* Formulario */}
      <h3 className="text-2xl font-semibold text-red-500 mb-3">
        Cifrado y descifrado RSA
      </h3>
      <div className="mb-3 text-left flex flex-col bg-blue-50 border-l-4 border-blue-700 py-2 px-4">
        <p className="font-semibold underline">Consideraciones:</p>
        <p>
          Obtendremos la clave pública (e, n) y la clave privada (d, n) a partir
          de los números primos p y q; adicionalmente, se escribirá el numero de
          celdas que tendrá nuestra tabla de equivalencia.
        </p>
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
            Crear tabla y claves
          </button>
        </div>
      </form>

      <hr className="my-6 border-gray-300" />

      {/* Resultado */}
      <h3 className="text-2xl font-semibold text-red-500 mb-3">
        Tabla de equivalencia generada
      </h3>
      <div className="mb-3 text-left flex flex-col bg-blue-50 border-l-4 border-blue-700 py-2 px-4">
        <p className="font-semibold underline">
          Tiene un total de 84 valores entre:
        </p>
        <ul className="list-disc ml-4">
          <li>Letras mayúsculas: de la A a la Z</li>
          <li>Letras minúsculas: de la a a la z</li>
          <li>Tildes: Á,É,Í,Ó,Ú,Ü,Ñ,á,é,í,ó,ú,ü,ñ</li>
          <li>Números: del 0 al 9</li>
          <li>Caracteres especiales: @,#,$,%,&amp;,",","."," "</li>
        </ul>
      </div>
      <div className="mb-3 grid grid-cols-12 gap-1">
        {tablaRandom ? (
          tablaRandom.map((elemento, index) => (
            <div
              key={index}
              className="grid grid-rows-2 text-center font-bold rounded-md"
            >
              <div className="p-1 bg-blue-800 text-white rounded-t-md">
                {elemento}
              </div>
              <div className="p-1 bg-amber-300 rounded-b-md">{index}</div>
            </div>
          ))
        ) : (
          <div className="col-span-12 border border-gray-300 rounded-md p-4 text-center">
            <p>Aquí va una tabla de equivalencia</p>
          </div>
        )}
      </div>
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

      <hr className="my-6 border-gray-300" />

      {/* Encriptar */}
      <h3 className="text-2xl font-semibold text-red-500 mb-3">
        Cifrar mensaje
      </h3>
      <div className="mb-3 text-left flex flex-col bg-blue-50 border-l-4 border-blue-700 py-2 px-4">
        <p>Se usará la clave pública (e, n) para encriptar el mensaje.</p>
        <div className="flex gap-2">
          <p>Se encriptarán los caracteres usando lo siguiente:</p>
          <InlineMath math={`{C = M^e \\mod n}`} />
        </div>
      </div>
      <form
        onSubmit={handleSubmitEncrypt}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
      >
        <div className="col-span-2">
          <label
            htmlFor="encrypted-message"
            className="flex gap-2 text-gray-700 mb-2"
          >
            Ingresa el mensaje a encriptar:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            type="text"
            id="encrypted-message"
            name="encrypted-message"
          />
        </div>
        <div className="flex items-end">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition cursor-pointer">
            Encriptar
          </button>
        </div>
      </form>
      {/* Resultado */}
      <div className="p-4 mb-4 bg-white rounded-lg border border-gray-200">
        <p className="mb-3 font-semibold">Resultado:</p>
        <div className="bg-green-50 border-l-4 border-green-700 py-2 px-4">
          <p>
            El mensaje encriptado es: <b>{msgCifrado?.message}</b>
          </p>
        </div>
      </div>
      {/* Procedimiento */}
      <DropDownLayout id="encryption-procedure" title="Procedimiento:">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <ul className="p-2 flex flex-col items-center border border-gray-300 rounded-lg bg-gray-50">
            <li className="p-2 font-semibold text-blue-700">Char = index</li>
            <hr className="w-full mb-2 border-blue-700" />
            {arrMsgDescifrado?.map((elemento, index) => (
              <li key={index}>
                <InlineMath math={`{${elemento.char} = ${elemento.index}}`} />
              </li>
            ))}
          </ul>
          <ul className="p-2 flex flex-col items-center border border-gray-300 rounded-lg bg-gray-50">
            <li className="p-2 font-semibold text-blue-700">
              <InlineMath math={`{C = M^e \\mod n}`} />
            </li>
            <hr className="w-full mb-2 border-blue-700" />
            {arrMsgDescifrado?.map((elemento, index) => (
              <li key={index}>
                <InlineMath
                  math={`{C = ${elemento.index}^${data?.e} \\mod ${data?.n}}`}
                />
              </li>
            ))}
          </ul>
          <ul className="p-2 flex flex-col items-center border border-gray-300 rounded-lg bg-gray-50">
            <li className="p-2 font-semibold text-blue-700">Index = Char</li>
            <hr className="w-full mb-2 border-blue-700" />
            {msgCifrado?.messageArray?.map((elemento, index) => (
              <li key={index}>
                <InlineMath math={`{${elemento.index} = ${elemento.char}}`} />
              </li>
            ))}
          </ul>
        </div>
      </DropDownLayout>

      <hr className="my-6 border-gray-300" />

      {/* Descifrar */}
      <h3 className="text-2xl font-semibold text-red-500 mb-3">
        Descifrar mensaje
      </h3>
      <div className="mb-3 text-left flex flex-col bg-blue-50 border-l-4 border-blue-700 py-2 px-4">
        <p>Se usará la clave privada (d, n) para descifrar el mensaje.</p>
        <div className="flex gap-2">
          <p>Se descifrarán los caracteres usando lo siguiente:</p>
          <InlineMath math={`{M = C^d \\mod n}`} />
        </div>
      </div>
      <form
        onSubmit={handleSubmitDecrypt}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
      >
        <div className="col-span-2">
          <label
            htmlFor="decrypted-message"
            className="flex gap-2 text-gray-700 mb-2"
          >
            Ingresa el mensaje a descifrar:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            type="text"
            id="decrypted-message"
            name="decrypted-message"
          />
        </div>
        <div className="flex items-end">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition cursor-pointer">
            Descifrar
          </button>
        </div>
      </form>
      {/* Resultado */}
      <div className="p-4 mb-4 bg-white rounded-lg border border-gray-200">
        <p className="mb-3 font-semibold">Resultado:</p>
        <div className="bg-green-50 border-l-4 border-green-700 py-2 px-4">
          <p>
            El mensaje descifrado es: <b>{msgDescifrado?.message}</b>
          </p>
        </div>
      </div>
      {/* Procedimiento */}
      <DropDownLayout id="decryption-procedure" title="Procedimiento:">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <ul className="p-2 flex flex-col items-center border border-gray-300 rounded-lg bg-gray-50">
            <li className="p-2 font-semibold text-blue-700">Char = index</li>
            <hr className="w-full mb-2 border-blue-700" />
            {arrMsgCifrado?.map((elemento, index) => (
              <li key={index}>
                <InlineMath math={`{${elemento.char} = ${elemento.index}}`} />
              </li>
            ))}
          </ul>
          <ul className="p-2 flex flex-col items-center border border-gray-300 rounded-lg bg-gray-50">
            <li className="p-2 font-semibold text-blue-700">
              <InlineMath math={`{M = C^d \\mod n}`} />
            </li>
            <hr className="w-full mb-2 border-blue-700" />
            {arrMsgCifrado?.map((elemento, index) => (
              <li key={index}>
                <InlineMath
                  math={`{M = ${elemento.index}^{${data?.d}} \\mod ${data?.n}}`}
                />
              </li>
            ))}
          </ul>
          <ul className="p-2 flex flex-col items-center border border-gray-300 rounded-lg bg-gray-50">
            <li className="p-2 font-semibold text-blue-700">Index = Char</li>
            <hr className="w-full mb-2 border-blue-700" />
            {msgDescifrado?.messageArray?.map((elemento, index) => (
              <li key={index}>
                <InlineMath math={`{${elemento.index} = ${elemento.char}}`} />
              </li>
            ))}
          </ul>
        </div>
      </DropDownLayout>
    </div>
  )
}

export default EncryptDecrypt
