import './App.css'
import Chart from './chart/Chart'

function App() {

  return (
    <div className='w-auto h-screen flex flex-col'>

      <header className='w-full h-20 bg-gradient-to-r from-cyan-500 to-blue-500 flex z-10'>
        <div className='ml-10 flex items-center text-4xl tracking-widest font-bold'>
          CRUD
        </div>
      </header>
      
      <main className='w-full h-full flex flex-col'>
        <div className='w-full h-2/5 flex justify-center items-center'>
          <Chart/>
        </div>
        <div className='w-full h-3/5 bg-slate-400'>

        </div>
      </main>

    </div>
  )
}

export default App
