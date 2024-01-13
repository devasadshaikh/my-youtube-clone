"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface CProps {
    categories: string[],
    selected: string,
    onSelect: (category: string) => void
}

const TRANSLATE_AMOUNT = 200
export default function CategoryPills({ categories, selected, onSelect }: CProps) {

    const [translate, setTranslate] = useState(0)
    const [left, setLeft] = useState(false)
    const [right, setRight] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef.current == null) return

        const observer = new ResizeObserver(entries => {

            const container = entries[0]?.target
            if (container == null) return

            setLeft(translate > 0)
            setRight(translate + container.clientWidth < container.scrollWidth)

        })

        observer.observe(containerRef.current)

        return () => {
            observer.disconnect()
        }

    }, [categories, translate])
    return (
        <>
            <div className="    ">
                <div ref={containerRef} className="  overflow-x-hidden relative py-[1.9px]">
                    <div className=" flex whitespace-nowrap gap-3 transition-transform w-[max-content]" style={{ transform: `translateX(-${translate}px)` }}>
                        {
                            categories.map(category => (

                                <button key={category} onClick={() => onSelect(category)} className={`${selected === category ? " bg-black text-white py-1 px-3 rounded-lg whitespace-nowrap " : " bg-gray-100 hover:bg-gray-200 py-1 px-3 rounded-lg whitespace-nowrap "}`}>{category}</button>

                            ))
                        }

                    </div>

                    {left && (

                        <div className=" absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
                            <button onClick={() => {
                                setTranslate(translate => {
                                    const newTranslate = translate - TRANSLATE_AMOUNT
                                    if (newTranslate <= 0) return 0
                                    return newTranslate
                                })
                            }} className=" buttonC h-full aspect-square w-auto p-1.5">
                                <ChevronLeft />
                            </button>
                        </div>
                    )}

                    {right && (

                        <div className=" absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
                            <button onClick={() => {

                                setTranslate(translate => {

                                    if (containerRef.current == null) {
                                        return translate
                                    }
                                    const newTranslate = translate + TRANSLATE_AMOUNT
                                    const edge =  containerRef.current.scrollWidth
                                    const width =  containerRef.current.clientWidth
                                    if (newTranslate + width >= edge) {
                                        return edge - width
                                    }
                                    return newTranslate
                                })


                            }} className=" buttonC h-full aspect-square w-auto p-1.5">
                                <ChevronRight />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

