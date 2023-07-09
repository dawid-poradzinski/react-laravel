import { useEffect, useState } from "react";

const InfoTable = (props: any) => {

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        setData(props.info);

    }, [props]);

    return (
        <>
        <div className="w-full h-full flex gap-4 flex-col">
            <div className="flex w-full h-10 justify-between items-center">
                <p className=" text-3xl font-semibold">Kanały</p>
                <div className="h-full shadow-xl bg-green-500 rounded-xl flex items-center justify-center p-4 text-white cursor-pointer">
                    Dodaj nowy
                </div>
            </div>
            <div className="bg-slate-100 w-full h-full rounded-xl p-4 shadow-2xl brightness-115">
                <table className="w-full">
                    <thead className="w-full">
                        <tr className="w-full bg-slate-400 text-left">
                            <th className="px-3">ID</th>
                            <th className="px-3">Nazwa</th>
                            <th className="px-3">Ilość</th>
                            <th className=" w-48">Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 && (
                            data.map(k => (
                                <tr className="border-b-2 text-left overflow-y-auto" key={k.id}>
                                    <td className="p-3 font-bold">{k.id}</td>
                                    <td className="p-3" >{k.name}</td>
                                    <td className="p-3" >{k.amount}</td>
                                    <td className="h-full">
    
                                        <div className="flex flex-row gap-4">
                                            <div className="rounded-xl p-2 bg-violet-700 w-20 flex items-center justify-center text-white cursor-pointer">Edit</div>
                                            <div className="rounded-xl p-2 bg-red-700 w-20 flex items-center justify-center text-white cursor-pointer">Delete</div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </>

    )
}

export default InfoTable;