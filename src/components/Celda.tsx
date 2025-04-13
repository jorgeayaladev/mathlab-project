type Props = {
  index: number
}

const Cell = (props: Props) => {
  return (
    <div className="grid grid-rows-2 gap-0.5 p-1 text-center font-bold rounded-md">
      <div className="p-2 bg-amber-800 text-white rounded-md">
        <input className="w-full text-center" type="text" placeholder="....." />
      </div>
      <div className="p-2 bg-amber-300 rounded-md">{props.index}</div>
    </div>
  )
}

export default Cell