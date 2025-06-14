import StepOneFiles from "../components/StepOneFiles"
import StepTwoFiles from "../components/StepTwoFiles"

const EditingFiles = () => {
  /*
  const [fileContent, setFileContent] = useState<string>("")
  const [fileName, setFileName] = useState<string>("")
  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file && file.type === "text/plain") {
      setFileName(file.name)
      const reader = new FileReader()

      reader.onload = (event) => {
        const content = event.target?.result
        if (typeof content === "string") {
          setFileContent(content)
          setIsPreviewVisible(true) // Mostrar vista previa
          console.log(content)
        }
      }

      reader.onerror = () => {
        console.error("Error al leer el archivo")
      }

      reader.readAsText(file)
    } else {
      alert("Por favor selecciona un archivo .txt válido.")
    }
  }


  const handleDownload = () => {
    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = fileName || "archivo_modificado.txt"
    a.click()

    URL.revokeObjectURL(url) // liberar memoria
  }*/

  return (
    <section className="mb-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Cifrado y descifrado de archivos .txt
      </h2>
      <p className="text-gray-700 mb-4">
        En este apartado, podrás encriptar y descifrar archivos .txt a partir de
        una tabla de equivalencia generada aleatoriamente con el fin de asegurar
        la privacidad de los datos a partir de las claves pública y privada
        obtenidas.
      </p>

      <div className="p-4 bg-blue-50 border-l-4 border-blue-700">
        <p className="text-blue-700">
          <strong>Lo haremos en dos pasos:</strong>
        </p>
        <ul className="list-decimal list-inside text-blue-700">
          <li>
            Establecerás el valor de los primos p y q, generarás la tabla de
            equivalencia aleatoriamente y las claves pública y privada;
            finalmente descargarás el resultado para que sirva como herramienta
            de cifrado y descifrado.
          </li>
          <li>
            Insertarás el archivo de los datos RSA que generaste y tu archivo que deseas cifrar o descifrar, para luego obtengas como resultado la previsualización del archivo .txt cifrado o descifrado y lo puedas descargar si lo deseas.
          </li>
        </ul>
      </div>

      <hr className="my-6 border-gray-300" />

      <StepOneFiles />

      <hr className="my-6 border-gray-300" />

      <StepTwoFiles/>
      
    </section>
  )
}

export default EditingFiles
