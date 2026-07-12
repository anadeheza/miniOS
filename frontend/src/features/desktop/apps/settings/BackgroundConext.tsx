import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import bg1 from '../assets/wallpapers/bg1.jpg'
import bg2 from '../assets/wallpapers/bg2.jpg'
import bg3 from '../assets/wallpapers/bg3.mp4'
import homebg from '../assets/wallpapers/homebg.jpg'

export const PRESETS = [bg1, bg2, bg3, homebg]

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


export function isVideoWallpaper(src: string) {
    return src.endsWith(".mp4") || src.startsWith("data:video"); 
}