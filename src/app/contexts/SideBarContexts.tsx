"use client"
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface SideBarProviderProps {
    children: ReactNode
}

interface SideBarContextsType {
    isLargeOpen: boolean
    isSmallOpen: boolean
    toggle: () => void
    close: () => void

}

const SideBarContext = createContext<SideBarContextsType | null>(null)

export function useSideBarContext() {
    const value = useContext(SideBarContext)
    if (value == null) throw Error("cannot use")

    return value
}
export default function SideBarProvider({ children }: SideBarProviderProps) {
    const [isLargeOpen, SetIsLargeOpen] = useState(true)
    const [isSmallOpen, setIsSmallOpen] = useState(false)

    useEffect(() => {
        const handler = () => {
            if (!isScreenSmall()) setIsSmallOpen(false)
        }

        window.addEventListener("resize", handler)

        return () => {
            window.removeEventListener("resize", handler)
        }
    }, [])

    function isScreenSmall() {
        return window.innerWidth < 1024
    }

    function toggle() {
        if (isScreenSmall()) {
            setIsSmallOpen(s => !s)
        } else {
            SetIsLargeOpen(l => !l)
        }
    }

    function close() {
        if (isScreenSmall()) {
            setIsSmallOpen(false)
        } else {
            SetIsLargeOpen(false)
        }
    }
    return <SideBarContext.Provider value={{
        isLargeOpen,
        isSmallOpen,
        toggle,
        close
    }}>
        {children}
    </SideBarContext.Provider>

}