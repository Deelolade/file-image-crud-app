import { useState } from 'react'
import reactLogo from './assets/react.svg'
import tailwindLogo from './assets/Tailwind_CSS.png'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen w-screen flex bg-gray-800 justify-center items-center flex-col'>
      <div className='flex  w-50 md:w-96  justify-between items-center '>
        <a href="https://vite.dev" target="_blank" >
          <img src={viteLogo} className="logo w-12 md:w-24 hover:drop-shadow-[0_0_15px_rgb(59,130,246)] transition-all " alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react  w-12 md:w-24 animate-customSpin hover:drop-shadow-[0_0_15px_rgb(59,130,246)]" alt="React logo" />
        </a>
        <a href="https://tailwindcss.com" target="_blank">
          <img src={tailwindLogo} className="logo react  w-12 md:w-24 hover:drop-shadow-[0_0_15px_rgb(59,130,246)] transition-all" alt="Tailwind logo" />
        </a>
      </div>
      <h1 className='text-white my-3 text-3xl font-bold md:text-4xl lg:text-6xl'>Vite + React + Tailwind</h1>
      <div className="card text-center mt-2 ">
        <button onClick={() => setCount((count) => count + 1)}
          className='py-1 w-24 mx-auto rounded-lg bg-gray-950 text-white font-semibold hover:border'
        >
          count is {count}
        </button>
        <p className='text-white my-2 text-[10px] md:text-sm'>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <p className='text-gray-500 mt-12 text-[10px] md:text-sm'>
          Click on the Vite, React and Tailwind logos to learn more
        </p>
      </div>
      <p className=" pt-12 text-white text-[10px] md:text-sm">
        Built by <a className='hover:font-semibold hover:underline ' href="https://deelolade-portfolio.vercel.app/" target='_blank'>Deelolade</a>
      </p>
    </div>
  )
}

export default App
