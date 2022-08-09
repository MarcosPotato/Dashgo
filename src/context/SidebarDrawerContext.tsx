import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

type SidebarDrawerContextData = UseDisclosureReturn

interface SidebarDrawerProviderProps{
    children: ReactNode
}

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData)

export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {

    const disclousure = useDisclosure()
    const router = useRouter()

    useEffect(() => {
        disclousure.onClose()
    }, [router.asPath])

    return(
        <SidebarDrawerContext.Provider value={ disclousure }>
            { children }
        </SidebarDrawerContext.Provider>
    )
}

export const useSidebarDrawer = () => {
    const context = useContext(SidebarDrawerContext)

    if(!context){
        throw new Error("This hook 'useSidebarDrawer' must be used inside SidebarDrawerProvider")
    }

    return context
}