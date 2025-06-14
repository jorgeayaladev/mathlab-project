import React from "react"
import { UploadIcon } from "../assets/Icons"

type Props = {
  file: File | null
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputFileBox = (props: Props) => {
  return (
    <label className="w-full flex flex-col items-center justify-center text-gray-400 hover:text-white bg-gray-50 hover:bg-gray-500 border-2 border-dashed rounded-lg transition-colors duration-200 cursor-pointer">
      <div className="flex items-center justify-center py-3 gap-3">
        <UploadIcon styles="w-8 h-8" />
        {props.file ? (
          <p>{props.file.name}</p>
        ) : (
          <div>
            <p className="text-sm font-semibold">Click para subir el archivo</p>
            <p className="text-xs">.txt (Max. 20Mb)</p>
          </div>
        )}
      </div>
      <input
        type="file"
        className="hidden"
        accept=".txt"
        onChange={props.handleFileChange}
        required
      />
    </label>
  )
}

export default InputFileBox
