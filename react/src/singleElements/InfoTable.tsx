import axios from "axios";
import { useEffect, useState } from "react";
import { deleteInfo } from "../EndPoints";

const InfoTable = (props: any) => {

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        setData(props.info);
        
    }, [props]);

    const deleteFromDB = (id : number) => {

        if(!window.confirm("Na pewno chcesz usunąć ten kanał?")){
            return;
        }

        axios.delete(deleteInfo + id).then((response) => {

            props.getNumberOfInfoFromDB();
            
        }).catch((error) => {
            
        })
    }

    return (
        <>
        <div className="w-full h-full flex gap-4 flex-col">
            <div className="flex w-full h-10 justify-between items-center">
                <p className=" text-3xl font-semibold">Kanały</p>
                <div onClick={() => props.setBackgroundElement([])} className="h-full bg-gradient-to-tr from-lime-500 to-green-700 rounded-xl flex items-center justify-center p-4 text-white cursor-pointer hover:brightness-110 shadow-xl transition duration-300">
                    Dodaj nowy
                </div>
            </div>
            <div className="bg-slate-100 w-full h-full rounded-xl p-4 shadow-2xl brightness-115 overflow-y-scroll md:overflow-auto">
                <table className="w-full">
                    <thead className="w-full">
                        <tr className="w-full bg-slate-400 text-left">
                            <th className="p-3 text-center md:text-left">ID</th>
                            <th className="p-3 hidden md:block">Kolor</th>
                            <th className="p-3 text-center md:text-left">Nazwa</th>
                            <th className="p-3 text-center md:text-left">Ilość</th>
                            <th className="w-48 text-center md:text-left">Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map(k => (
                                <tr className="border-b-2 text-left" key={k.id}>
                                    <td className="p-3 font-bold text-center md:text-left">{k.id}</td>
                                    <td className="p-3 hidden md:block">
                                        <div style={{backgroundColor: k.color}} className="w-1/4 h-5"></div>
                                        </td>
                                    <td className="p-3 text-center md:text-left" >{k.name}</td>
                                    <td className="p-3 text-center md:text-left" >{k.amount}</td>
                                    <td className="h-full">
    
                                        <div className="flex flex-col md:flex-row gap-1 md:gap-4 items-center md:items-start">
                                            <div onClick={() => props.setBackgroundElement(k)} className="rounded-xl my-1 md:my-0 p-2 bg-gradient-to-tr from-violet-500 to-fuchsia-600 w-20 flex items-center justify-center text-white cursor-pointer hover:brightness-110 shadow-xl transition duration-300">Edit</div>
                                            <div onClick={() => deleteFromDB(k.id)} className="rounded-xl my-1 md:my-0 p-2 bg-gradient-to-tr from-red-500 to-rose-800 from w-20 flex items-center justify-center text-white cursor-pointer hover:brightness-110 shadow-xl transition duration-300">Delete</div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )
                        :
                        (
                            <tr>
                                <td colSpan={4} className="text-center">
                                Niczego tu nie ma. Spróbuj coś dodać
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </>

    )
}

export default InfoTable;