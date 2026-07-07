import { useState } from "react";
import type { OSWindow } from "./types";
import { Dock } from "./Dock";
import { Window } from "./Window";
import { APPS } from "./apps";
import { TopBar } from "./TopBar";
import { FilesProvider } from "./apps/files/FilesContext"


interface DesktopProps {
    user: {name: string} | null
    isGuest: boolean
    guestName: string | null
    onLogout: () => void
}

export function Desktop({ user, isGuest, guestName, onLogout }: DesktopProps) {
    const [windows, setWindows] = useState<OSWindow[]>([])
    const [nextZIndex, setNextZIndex] = useState(2)

    function openApp(appId: string, options?: {title?: string; data?: {fileId?: string}}) {
        const appDef = APPS.find((app) => app.id === appId)
        if(!appDef) return
        
        const newWindow: OSWindow = {
            id: crypto.randomUUID(),
            appId,
            title: options?.title ?? appDef.title,
            x: 200,
            y: 50,
            width: appDef.defaultWidth,
            height: appDef.defaultHeight,
            zIndex: nextZIndex,
            data: options?.data
        }
        setWindows((prev) => [...prev, newWindow])
        setNextZIndex((z) => z + 1)
    }

    function closeWindow(id: string) {
        setWindows((prev) =>
            prev.filter((w) => w.id !== id)
        )
    }

    function focusWindow(id: string) {
        setWindows((prev) =>
            prev.map((w) => (w.id === id? {...w, zIndex: nextZIndex} : w))
        )
        setNextZIndex((z) => z + 1)
    }

    function moveWindow(id: string, x: number, y: number) {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, x, y } : w))
        )
    }

    const displayName = isGuest ? guestName : user?.name ?? null

    return (
        <FilesProvider>
            <div className="relative h-screen w-screen overflow-hidden bg-taupe-600 bg-[url(src/assets/homebg.jpg)] bg-cover bg-center">
                <TopBar displayName={displayName} onOpenApp={openApp} onLogout={onLogout} />

                {windows.map((win) => (
                    <Window
                        key={win.id}
                        window={win}
                        isGuest={isGuest}
                        guestName={guestName}
                        onLogout={onLogout}
                        onClose={() => closeWindow(win.id)}
                        onFocus={() => focusWindow(win.id)}
                        onMove={(x, y) => moveWindow(win.id, x, y)}
                        onOpenApp={openApp}
                    />
                ))}

                <Dock onOpenApp={openApp} />
            </div>
        </FilesProvider>
    )
}