import { ReactNode } from "react"

interface Props {
  children: ReactNode
  id: string
  title?: string
}

const DropDownLayout = ({ children, id, title }: Props) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        className="absolute opacity-0 -z-10 peer"
      />

      <label
        htmlFor={id}
        className="flex items-center justify-between p-4 bg-white border-x border-t peer-not-checked:border-b peer-not-checked:rounded-b-lg border-gray-200 rounded-t-lg cursor-pointer peer-checked:[&>svg]:rotate-180"
      >
        <p className="font-semibold">{title}</p>
        <svg
          className="w-5 h-5 ml-2 transition-transform duration-200"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      <div className="px-4 peer-checked:pb-4 bg-white border-x border-b border-gray-200 rounded-b-lg left-0 right-0 z-10 overflow-hidden transition-all duration-300 origin-top transform scale-y-0 h-0 peer-checked:scale-y-100 peer-checked:h-auto">
        {children}
      </div>
    </div>
  )
}

export default DropDownLayout
