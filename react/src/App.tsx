import './App.css'
import Aside from './singleElements/Aside'
import Chart from './singleElements/Chart'
import InfoTable from './singleElements/InfoTable'
import { useEffect, useState } from "react";
import { allInfo, numberOfInfo} from "./EndPoints";
import axios from "axios";

function App() {

    const [loading, setLoading] = useState(false);
    const [sum, setSum] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        getNumberOfInfoFromDB();
        
    }, [])

    useEffect(() => {
        setLoading(true);
        if(sum > 0) {
            getInfoFromDB();
        }
        setLoading(false);
    }, [sum])

    const getNumberOfInfoFromDB = () => {
        axios.get(numberOfInfo).then((response) => {

            setLoading(true);
            setSum(response.data.sum);


        }).catch((error) => {
            
        })
        setLoading(false);
    }

    const getInfoFromDB = () => {
        axios.get(allInfo).then((response) => {
            setData(response.data.data)
        }).catch((error) => {

        })
    }

  return (
    <div className='w-auto h-auto flex flex-col'>

          <header className='w-full h-20 bg-gradient-to-r from-[#333742] to-[#3B3F4A] flex z-10 justify-center pl-16 pb-8 pt-6'>
              <div className='flex items-center text-4xl tracking-widest font-bold'>
                  <p className="text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-sky-700 text-6xl">Chart Info</p>
              </div>
          </header>
      
      <div className='h-full w-full flex'>

            <Aside/>

            <main className='w-full h-auto flex flex-col'>

                <div className='w-full h-[40vh] flex justify-center items-center mt-5'>
                    {loading && (<Chart sum={sum} info={data} />)}
                    {!loading && (<div className="text-center">Loading...</div>)}
                </div>

                <div className='w-full min-h-[49.4vh] h-auto bg-slate-400 flex justify-center items-center p-10'>
                    
                    {loading && (<InfoTable info={data}/>)}
                    {!loading && (<div className="text-center">Loading...</div>)}
                </div>

            </main>
      </div>

    </div>

  )
}

export default App
