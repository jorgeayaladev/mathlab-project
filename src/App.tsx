import CaseOneView from "./interfaces/CaseOneView"
import CaseThreeView from "./interfaces/CaseThreeView"
import CaseTwoView from "./interfaces/CaseTwoView"

function App() {
  return (
    <div className="p-10 m-auto w-[640px] flex flex-col items-center justify-center gap-3 bg-slate-200">
      {/* Header */}
      <header className="p-5 flex flex-col gap-3 bg-white rounded-2xl">
        <h1 className="text-3xl font-bold text-center">
          Laboratorio de matemática computacional (Criptografía)
        </h1>
        <p className="bg-red-200 font-semibold">El diseño de la pagina todavía no está perfecto y está en desarrollo...</p>
      </header>

      {/* CASO 1: Congruencias lineales */}
      <CaseOneView />

      {/* CASO 2: Encriptar palabras */}
      <CaseTwoView />

      {/* CASO 3: Descifrar palabras */}
      <CaseThreeView />
    </div>
  )
}

export default App
