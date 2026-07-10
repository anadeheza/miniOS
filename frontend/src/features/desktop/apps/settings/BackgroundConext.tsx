import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

const PRESETS = ["src/assets/wallpapers/homebg.jpg", "src/assets/wallpapers/bg1.jpg", "src/assets/wallpapers/bg2.jpg", "src/assets/wallpapers/bg3.mp4"]

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