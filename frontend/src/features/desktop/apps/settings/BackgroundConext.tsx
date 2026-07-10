import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

const PRESETS = ["assets/wallpapers/homebg.jpg", "assets/wallpapers/bg1.jpg", "assets/wallpapers/bg2.jpg", "assets/wallpapers/bg3.jpg"]

interface BgContextType {
    wallpaper: string
    setWallpaper: (value: string) => void
    presets: string[]
}

const BgContext = createContext<BgContextType | null>(null)


export function BgProvider({children}: {children: ReactNode }) {
    const [wallpaper, setWallpaperState] = useState<string>(() => {
        return localStorage.getItem("wallpaper") || PRESETS[0]
    })

    useEffect(() => {
        localStorage.setItem("wallpaper", wallpaper) 
    }, [wallpaper])

    const setWallpaper = (value: string) => setWallpaperState(value)
    return (
        <BgContext.Provider value={{ wallpaper, setWallpaper, presets: PRESETS }}>
            {children}
        </BgContext.Provider>
    );
}

export function useWallpaper() {
    const ctx = useContext(BgContext)
    if(!ctx) throw new Error
    return ctx
}
