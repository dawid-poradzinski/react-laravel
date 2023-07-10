import { IconChartPie, IconQuestionMark } from "@tabler/icons-react"

const Aside = () => {

    return (
        <aside className='w-16 h-auto bg-gradient-to-br from-[#333742] to-[#3B3F4A] flex justify-center'>
            <div className="w-16 h-full pt-2 flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-[#D9D9D9]/[0.3] rounded-xl brightness-125 shadow-xl flex items-center justify-center cursor-pointer">
                    <IconChartPie size={40} color="#000"/>
                </div>
                <div className="w-12 h-12 bg-[#D9D9D9]/[0.2] rounded-xl flex items-center justify-center cursor-pointer">
                    <IconQuestionMark size={40} color="#000"/>
                </div>
                <div className="w-12 h-12 bg-[#D9D9D9]/[0.2] rounded-xl flex items-center justify-center cursor-pointer">
                    <IconQuestionMark size={40} color="#000"/>
                </div>
                <div className="w-12 h-12 bg-[#D9D9D9]/[0.2] rounded-xl flex items-center justify-center cursor-pointer">
                    <IconQuestionMark size={40} color="#000"/>
                </div>
            </div>
        </aside>
    )
}

export default Aside