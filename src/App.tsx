import "katex/dist/katex.min.css"
import { InlineMath } from "react-katex"
import LinearCongruence from "./interfaces/LinearCongruence"
import KeysGenerator from "./interfaces/KeysGenerator"

function App() {

  return (
    <div className="bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold">
                Laboratorio Virtual
              </h1>
              <p className="text-lg md:text-xl">
                Matemática Computacional - UPC
              </p>
            </div>
            <img
              src="https://play-lh.googleusercontent.com/qqsVK3Js4KMiVjd1Q7Rq2XDD-VZW2Kt9FxAEz7qxuiQAIMJa8ctoFeKH4m8Al4h-0RQ"
              alt="UPC Logo"
              className="h-16"
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Introducción */}
        <section className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Congruencias Lineales y Criptografía RSA
          </h2>
          <p className="text-gray-700 mb-4">
            Este laboratorio virtual explora los conceptos de
            <strong>congruencias lineales</strong> y su aplicación en el
            algoritmo de criptografía <strong>RSA</strong>. Aprenderás a
            resolver congruencias, generar claves RSA y cifrar/descifrar
            mensajes.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-700 p-4">
            <p className="text-blue-700">
              <strong>Objetivos:</strong>
            </p>
            <ul className="list-disc list-inside text-blue-700">
              <li className="flex gap-2">
                <p>Resolver congruencias lineales de la forma:</p>
                <InlineMath math={`{ax \\equiv b \\mod n}`} />
              </li>
              <li>Comprender los fundamentos matemáticos del algoritmo RSA.</li>
              <li>Implementar cifrado y descifrado RSA.</li>
            </ul>
          </div>
        </section>

        {/* CASO 1: Congruencias lineales */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Congruencias Lineales
          </h2>
          <ul className="flex flex-col gap-1">
            <li className="flex gap-1">
              <p>Son ecuaciones de la forma:</p>
              <InlineMath math={`{ax \\equiv b \\mod n}`} />
            </li>
            <li className="flex gap-1">
              <p>Existen soluciones para</p>
              <InlineMath math={`{x}`} />
              <p>si y solo si</p>
              <InlineMath math={`{MCD(a, n) \\ \\vert \\ b}`} />
            </li>
            <li className="flex gap-1">
              <p>La solución general es:</p>
              <InlineMath
                math={`{x = x_0 + \\text{\\(\\frac n d\\)} \\times k}`}
              />
            </li>
            <li className="flex gap-1">
              <p>Donde</p>
              <InlineMath math={`{x_0}`} />
              <p>es una solución,</p>
              <InlineMath math={`{k}`} />
              <p>es un entero y</p>
              <InlineMath math={`{d = MCD(a, n)}`} />
            </li>
          </ul>

          {/* Calculadora de Congruencias */}
          <LinearCongruence />
        </section>
      </main>
    </div>
  )
}

export default App
