import './App.css'
import Aside from './singleElements/Aside'
import Chart from './singleElements/Chart'
import InfoTable from './singleElements/InfoTable'
import { useEffect, useRef, useState } from "react";
import { allInfo, getSingleById, numberOfInfo, putInfo, updateSingleInfo} from "./EndPoints";
import axios from "axios";

function App() {

    // Loading data

    const [loading, setLoading] = useState(true);
    const [sum, setSum] = useState(0);
    const [data, setData] = useState([]);
    const [error, setError] = useState<{type: string, message: string} | null>();

    useEffect(() => {
        getNumberOfInfoFromDB();
        
    }, [])

    useEffect(() => {
        if(sum > -1) {
            getInfoFromDB();
        }         
    }, [sum])

    const getNumberOfInfoFromDB = () => {
        setLoading(true);
        axios.get(numberOfInfo).then((response) => {

            setSum(response.data.sum);
            setLoading(false);
        }).catch((error) => {
            setSum(-1);
        })

    }

    const getInfoFromDB = () => {

        axios.get(allInfo).then((response) => {
            setData(response.data.data)
        }).catch((error) => {

        })

    }

    // backgroundElement without react-router-dom

    const [backgroundElement, setBackgroundElement] = useState<{[key: string]: any}>();

    const editBoxRef = useRef<HTMLInputElement>(null);
    const outletRef = useRef<HTMLInputElement>(null);
    const overlayRef = useRef<HTMLInputElement>(null);


    useEffect(() => {

        if(editBoxRef.current && outletRef.current && overlayRef.current) {
            if(!backgroundElement) {
                editBoxRef.current.className = editBoxRef.current.className.replace("flex ", "hidden ");
                outletRef.current.className = outletRef.current.className.replace("blur-sm", "blur-none");
                overlayRef.current.className = overlayRef.current.className.replace("z-20", "hidden z-0");
            }else {

                editBoxRef.current.className = editBoxRef.current.className.replace("hidden ", "flex ");
                outletRef.current.className = outletRef.current.className.replace("blur-none", "blur-sm");
                overlayRef.current.className = overlayRef.current.className.replace("hidden z-0", "z-20");
            }
        }

    }, [backgroundElement]);

    useEffect(() => {

        let handler = (e : any) => {
            if(editBoxRef.current) {
                if(backgroundElement && !editBoxRef.current.contains(e.target)) {
                    setBackgroundElement(undefined);
                }
            }
        }

        document.addEventListener("mousedown", handler);

        return() => {
            document.removeEventListener("mousedown", handler);
        }
    })

    // update

    const updateInfo = () => {
        if(backgroundElement) {

            if(backgroundElement.name.length == 0) {
                setError({type: "error", message: "Nieodpowiednia długość nazwy!"});
            }else if(!(/^#[0-9A-Fa-f]{6}$/.test(backgroundElement.color))){
                setError({type: "error", message: "Podaj odpowiedni kolor!"});
            }else if(isNaN(backgroundElement.amount)){
                setError({type: "error", message: "Ilość powinna być numerem!"});
            }else if(backgroundElement.amount < 1){
                setError({type: "error", message: "Podaj liczbę większą od zera!"});
            }else{

                axios.get(getSingleById + backgroundElement.id).then((response) => {

                    let data = response.data.data;

                    if(data.name === backgroundElement.name && data.color === backgroundElement.color && data.amount === backgroundElement.amount) {
                        setError({type:"error",message:"zmień jakieś dane!"});
                    }else {
                        axios.put(updateSingleInfo + backgroundElement.id, backgroundElement).then(() => {
                            setError({type:"notification",message:"Pomyślnie edytowano kanał"})
                            if(data.amount != backgroundElement.amount) {
                                getNumberOfInfoFromDB();
                            }else {
                                getInfoFromDB();
                            }
                            setBackgroundElement(undefined);
                        }).catch((error) => {
                            setBackgroundElement(undefined);
                        })
                    }
    
                }).catch((error) => {
    
                })

            }
        }
    }

    const saveInfo = () => {

        if(backgroundElement) {

            if(backgroundElement.name.length == 0) {
                setError({type: "error", message: "Nieodpowiednia długość nazwy!"});
            }else if(isNaN(backgroundElement.amount)){
                setError({type: "error", message: "Ilość powinna być numerem!"});
            }else if(backgroundElement.amount < 1){
                setError({type: "error", message: "Podaj liczbę większą od zera!"});
            }else{

                axios.put(putInfo, backgroundElement).then((response) => {
                    getNumberOfInfoFromDB();
                    setBackgroundElement(undefined);
                    setError({type:"notification",message:"Pomyślnie dodano nowy kanał"})
                }).catch((error) => {
                    setBackgroundElement(undefined);
                })
            }
        }
    }

    useEffect(() => {
        if(error) {
            setTimeout(() =>{
                setError(null);
            }, 3000)
        }
    }, [error])

  return (
    <>
    {/* hidden */}
            {error &&
            (
                error.type == "error"
                ?
                (<div className='z-50 rounded-xl flex justify-center items-center fixed text-zinc-50 bottom-0 right-0 bg-gradient-to-br from-pink-400 to-red-600 p-5 w-1/2 md:w-1/4 m-4 h-[10%] md:h-1/6'>{error.message}</div>)
                :
                (<div className='z-50 rounded-xl flex justify-center items-center text-zinc-50 fixed bottom-0 right-0 bg-gradient-to-br from-cyan-400 to-green-600 p-5 w-1/2 md:w-1/4 m-4 h-[10%] md:h-1/6'>{error.message}</div>)
            )
        }
        <div ref={editBoxRef} className="h-fit hidden p-2 md:p-10 z-30 lg:mt-0 fixed top-1/4 md:left-1/4 lg:w-1/2 lg:h-1/2 bg-gradient-to-br from-fuchsia-500 rounded-lg to-sky-500 blur-none flex-col justify-center items-center shadow-xl w-full md:w-11/12 min-h-1/2">

            <div className='w-full h-full'>
                <div className='w-full h-full flex justify-center items-center gap-16 flex-col'>
                    {backgroundElement && (

                        backgroundElement['id'] ? (
                            <>
                                <h2 className='text-3xl'>Edycja kanału #{backgroundElement['id']}</h2>
                                <div className='w-full h-auto flex justify-around'>
                                    <div className='h-full w-1/3 flex flex-col items-center gap-5'>
                                        <label id='name' className='text-2xl'>Nazwa</label>
                                        <input className='text-center border-b-2 border-solid border-green-400' type='text' id="name" name="name" defaultValue={backgroundElement['name']} onChange={ev => setBackgroundElement({...backgroundElement, name : ev.target.value})}></input>
                                    </div>
                                    <div className='h-full w-1/3  flex flex-col items-center gap-5'>
                                        <label id='color' className='text-2xl'>Kolor</label>
                                        <input className='text-center border-b-2 border-solid border-green-400' type='color' id="color" name="color" defaultValue={backgroundElement['color']} onChange={ev => setBackgroundElement({...backgroundElement, color : ev.target.value})}></input>
                                    </div>
                                    <div className='h-full w-1/3 flex flex-col items-center gap-5'>
                                        <label id='amount' className='text-2xl'>Ilość</label>
                                        <input className='text-center border-b-2 border-solid' type='text' inputMode='numeric' pattern='[0-9]*' id="amount" name="amount" defaultValue={backgroundElement['amount']} onChange={ev => setBackgroundElement({...backgroundElement, amount : ev.target.value})}></input>
                                    </div>
                                </div>
                                <div className='text-2xl rounded-full cursor-pointer bg-gradient-to-tr from-cyan-300 to-violet-500 p-2 px-10 hover:brightness-110 shadow-xl transition duration-300' onClick={() => updateInfo()}>
                                    Zapisz
                                </div>
                            </>
                            
                        )
                        :
                        (
                            <>
                                <h2 className='text-3xl'>Dodaj nowy kanał</h2>
                                <div className='w-full h-auto flex justify-around'>
                                    <div className='h-full w-1/3 flex flex-col items-center gap-5'>
                                        <label id='name' className='text-2xl'>Nazwa</label>
                                        <input className='text-center border-b-2 border-solid border-green-400' type='text' id="name" name="name" placeholder={"nazwa"} onChange={ev => setBackgroundElement({...backgroundElement, name : ev.target.value})}></input>
                                    </div>
                                    <div className='h-full w-1/3 flex flex-col items-center gap-5'>
                                        <label id='amount' className='text-2xl'>Ilość</label>
                                        <input className='text-center border-b-2 border-solid' type='text' inputMode='numeric' pattern='[0-9]*' id="amount" name="amount" placeholder={"ilość"} onChange={ev => setBackgroundElement({...backgroundElement, amount : ev.target.value})}></input>
                                    </div>
                                </div>
                                <div className='text-2xl rounded-full cursor-pointer bg-gradient-to-tr from-cyan-300 to-violet-500 p-2 px-10 hover:brightness-110 shadow-xl transition duration-300' onClick={() => saveInfo()}>
                                    Zapisz
                                </div>
                            </>
                        )
                    )}
                </div>
            </div>
        </div>

        {/* to_show */}

        <div ref={outletRef} className='w-auto min-h-[100vh] h-auto flex flex-col blur-none'>

        <div ref={overlayRef} className="hidden z-0 w-full h-full absolute"></div>


            <header className='w-full h-[10vh] bg-gradient-to-r from-[#333742] to-[#3B3F4A] flex z-10 justify-center pl-0 md:pl-16 pb-8 pt-6'>
                <div className='flex items-center tracking-widest font-bold'>
                    <p className="text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-sky-700 text-4xl md:text-6xl">Chart Info</p>
                </div>
            </header>
        
            <div className='h-full w-full flex'>

                <div className='hidden md:flex'>
                    <Aside/>
                </div>

                <main className='w-full min-h-[90vh] h-auto flex flex-col'>

                    <div className='w-full h-[40vh] flex justify-center items-center'>
                        {loading && (sum == -1 ? (<div className="text-center">Błąd połączenia</div>) : (<div className="text-center">Loading...</div>))}
                        {!loading && (<Chart sum={sum} info={data} />)}
                    </div>

                    <div className='w-full max-h-[50vh] md:max-h-none min-h-[50vh] h-auto bg-gradient-to-tr from-slate-300 to-slate-400 flex justify-center items-center px-4 py-4 md:p-10'>
                        {loading && (sum == -1 ? (<div className="text-center">Błąd połączenia</div>) : (<div className="text-center">Loading...</div>))}
                        {!loading && (<InfoTable info={data} setBackgroundElement={setBackgroundElement} getNumberOfInfoFromDB={getNumberOfInfoFromDB}/>)}
                    </div>
                </main>
            </div>
        </div>
    </>
  )
}

export default App
