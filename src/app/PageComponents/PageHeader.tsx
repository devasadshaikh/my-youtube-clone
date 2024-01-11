"use client"
import { Menu, Video, Bell, Mic, Search, ArrowLeft } from "lucide-react";
import youtubeLogo from '../../../public/youtubeLogo.png'
import Image from "next/image";
import { useState } from "react";
import { useSideBarContext } from "../contexts/SideBarContexts";



export default function PageHeader() {
    const [show, setShow] = useState(false)


    return (
        <>
            <div className=" mx-auto sm:mx-[16px] md:mx-[17px] lg:mx-[12px] flex gap-10 lg:gap-20 justify-between pt-2">
                <PageHeaderFirstSection hidden={show} />

                <form className={`  gap-4 flex-grow justify-center items-center ${show ? "flex" : "hidden md:flex"}`}>
                    {(show &&
                        <button onClick={() => setShow(false)} className=" buttonC "><ArrowLeft /></button>
                    )}
                    <div className=" flex flex-grow max-w-[600px]">

                        <input type="search" placeholder="Search" className=" rounded-l-full border border-gray-300
                    shadow-inner shadow-gray-100 py-1 px-4 text-lg w-full focus:border-blue-500 outline-none " />
                        <button className=" rounded-r-full bg-gray-100 px-4 border border-gray-300 border-l-0 flex-shrink-0 hover:bg-gray-200"><Search /></button>
                    </div>
                    <button className=" buttonC flex-shrink-0 md:bg-gray-100 rounded-full "><Mic /></button>
                </form>
                <div className={` flex-shrink-0 gap-3 items-center ${show ? "hidden" : "flex"}`}>
                    <button onClick={() => setShow(true)} className=" buttonC md:hidden">
                        <Search />
                    </button>
                    <button className=" buttonC md:hidden">
                        <Mic />
                    </button>
                    <button className=' buttonC '>
                        <Video />
                    </button>

                    <button className=' buttonC '>
                        <Bell />
                    </button>

                    <div className='w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-200'></div>
                </div>



            </div >
        </>
    )
}

interface PageHeaderFirstSectionProps {
    hidden?: boolean
}
export function PageHeaderFirstSection({ hidden = false }: PageHeaderFirstSectionProps) {
    const { toggle } = useSideBarContext()
    return <div className={` gap-4 items-center flex-shrink-0 ${hidden ? "hidden" : "flex"} `}>
        <button onClick={toggle} className=" buttonC "><Menu /></button>

        <Image src={youtubeLogo} alt="youtubeLogo" width={100} height={100} className="" />




    </div>
}