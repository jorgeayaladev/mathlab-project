import { ChangeEvent, FormEvent, useState } from "react"
import { LoadingIcon, LockIcon, UnlockIcon } from "../assets/Icons"
import InputFileBox from "./InputFileBox"
import { RSAEncryptDecrypt } from "../types/FileFunctions"

type ActionType = "encrypt" | "decrypt"

const StepTwoFiles = () => {
  const [firstFile, setFirstFile] = useState<File | null>(null)
  const [secondFile, setSecondFile] = useState<File | null>(null)
  const [action, setAction] = useState<ActionType>("encrypt")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFirstFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFirstFile(event.target.files[0])
    }
  }

  const handleSecondFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSecondFile(event.target.files[0])
    }
  }

  const handleActionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAction(event.target.value as ActionType)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!firstFile || !secondFile) {
      alert("Por favor, sube ambos archivos")
      return
    }

    setIsSubmitting(true)

    // Simulando el procesamiento
    console.log({
      firstFile,
      secondFile,
      action,
    })

    // Aquí iría tu lógica para manejar los archivos
    setTimeout(async () => {
      setIsSubmitting(false)
      console.log("Procesamiento completado")

      let tabla: string[] = []
      let values: number[] = []

      // Leer archivo 1 (líneas separadas)
      if (firstFile) {
        const text1 = await firstFile.text()
        const lines = text1.split("\n").map((line) => line.trim())
        if (lines.length >= 2) {
          tabla = lines[0].split(";")
          values = lines[1].split(";").map((val) => Number(val))
        } else {
          alert("El archivo 'rsa_data.txt' debe tener al menos dos líneas.")
        }
      }

      // Leer archivo 2 (contenido completo)
      let contenido: string[] = []
      if (secondFile) {
        const text2 = await secondFile.text()
        contenido = text2.split("\n").map((line) => line.trim())
      }
      console.log(tabla)
      console.log(values)
      console.log(contenido.join("\n"))

      // Cifrar o descifrar el contenido
      const nuevoMensaje = RSAEncryptDecrypt(
        tabla,
        { clave: values[action === "encrypt" ? 0 : 2], n: values[1] },
        contenido.join("\n")
      )
      console.log(nuevoMensaje)

      // Crear archivo cifrado o descifrado
      const blob = new Blob([nuevoMensaje], { type: "text/plain;charset=utf-8" })
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = `texto_${action === "encrypt" ? "cifrado" : "descifrado"}.txt`
      a.click()

      // libera memoria
      URL.revokeObjectURL(url)
    }, 1500)
  }

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold text-red-500">
        Paso 2. Cifrar o descifrar
      </h2>
      <p className="p-4 mb-4 text-blue-700 bg-blue-50 border-l-4 border-blue-700">
        Asegúrate de que el archivo que cifrarás o descifrarás tenga los
        caracteres de la tabla de equivalencia que descargaste, de lo contrario
        no funcionará correctamente. Si deseas puedes añadir los caracteres
        faltantes.
      </p>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="p-6 flex flex-col gap-4 bg-gray-50 border border-gray-200 rounded-lg"
      >
        {/* Primer paso */}
        <div className="space-y-2">
          <h3 className="font-bold text-gray-600">
            1. Sube el archivo "rsa_data.txt"
          </h3>
          <InputFileBox
            file={firstFile}
            handleFileChange={handleFirstFileChange}
          />
        </div>

        {/* Segundo paso */}
        <div className="space-y-2">
          <h3 className="font-bold text-gray-600">
            2. Ahora sube tu archivo .txt
          </h3>
          <InputFileBox
            file={secondFile}
            handleFileChange={handleSecondFileChange}
          />
        </div>

        {/* Tercer paso */}
        <div className="space-y-2">
          <h3 className="block font-bold text-gray-600">
            3. Acción a realizar
          </h3>
          <div className="flex space-x-6">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                className="h-4 w-4"
                value="encrypt"
                checked={action === "encrypt"}
                onChange={handleActionChange}
              />
              <span>Cifrar archivo</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                className="h-4 w-4"
                value="decrypt"
                checked={action === "decrypt"}
                onChange={handleActionChange}
              />
              <span>Descifrar archivo</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-gray-600">
            4. Genera el nuevo archivo{" "}
            {action === "encrypt" ? " cifrado" : " descifrado"}
          </h3>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 flex items-center justify-center text-white ${
              isSubmitting
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            } rounded-md shadow-sm transition-colors duration-200`}
          >
            {isSubmitting ? (
              <>
                <LoadingIcon styles="w-5 h-5 mr-2 text-white animate-spin" />
                Procesando...
              </>
            ) : action === "encrypt" ? (
              <>
                <LockIcon styles="w-5 h-5 mr-2" /> Cifrar archivo
              </>
            ) : (
              <>
                <UnlockIcon styles="w-5 h-5 mr-2" /> Descifrar archivo
              </>
            )}
          </button>
        </div>
      </form>

      {/*isPreviewVisible && (
          <div className="mt-5 p-4 border rounded-lg border-black bg-gray-300 max-h-[400px] shadow-md overflow-y-auto">
            <h3 className="mb-3">Vista previa: {fileName}</h3>
            <pre className="whitespace-pre-wrap">{fileContent}</pre>
          </div>
        )*/}
    </>
  )
}

export default StepTwoFiles
