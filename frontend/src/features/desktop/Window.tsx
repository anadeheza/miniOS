import { useRef } from "react";
import type { OSWindow } from "./types";
import { Calc } from "./apps/Calc";
import { Notes } from "./apps/Notes";
import { Clock } from "./apps/Clock";
import { Files } from "./apps/files/Files";
import { Editor } from "./apps/files/Editor";
import { Profile } from "./apps/Profile";
import { Settings } from "./apps/settings/Settings";

interface WindowProps {
    window: OSWindow
    isGuest: boolean
    guestName: string | null 
    onLogout: () => void
    onClose: () => void
    onFocus: () => void
    onMove: (x: number, y: number) => void
    onOpenApp: (appId: string, options?: { title?: string; data?: { fileId?: string } }) => void
}

export function Window({ window: win, onClose, onFocus, isGuest, guestName, onLogout, onMove, onOpenApp }: WindowProps) {
    const dragOffset = useRef({x: 0, y: 0})

    function handlePointerDown(e: React.PointerEvent) {
        onFocus()
        dragOffset.current = { x: e.clientX - win.x, y: e.clientY - win.y}

        function handlePointerMove(e: PointerEvent) {
            onMove(e.clientX - dragOffset.current.x, e.clientY - dragOffset.current.y)
        }
        function handlePointerUp() {
            document.removeEventListener('pointermove', handlePointerMove)
            document.removeEventListener('pointerup', handlePointerUp)
            
        }
        document.addEventListener('pointermove', handlePointerMove)
        document.addEventListener('pointerup', handlePointerUp)
    }

    function renderAppContent(appId: string) {
        switch (appId) {
            case 'notes':
                return <Notes/>
            case 'calculator':
                return <Calc/>
            case 'clock':
                return <Clock/>
            case 'files':
                return (
                    <Files
                        onOpenFile={(file) =>
                            onOpenApp('text-editor', {
                                title: `${file.name}.txt`,
                                data: { fileId: file.id },
                            })
                        }
                    />
                )
            case 'text-editor':
                return <Editor fileId={win.data?.fileId ?? ''} />
            case 'profile':
                return <Profile isGuest={isGuest} guestName={guestName} onLogout={onLogout} />
            case 'settings':
                return <Settings onLogout={onLogout} />
        }
    }

    return (
        <div
            className="absolute rounded-[15px] bg-taupe-950/90 shadow-2xl flex flex-col overflow-hidden backdrop-blur-[10px]"
            style={{
                left: win.x,
                top: win.y,
                width: win.width,
                height: win.height,
                zIndex: win.zIndex,
            }}
            onPointerDown={onFocus}
        >
            <div
                onPointerDown={handlePointerDown}
                className=" flex h-9 shrink-0 cursor-move items-center justify-between bg-taupe-800 px-3"
            >
                <span className="text-[14px] text-taupe-300">𑣲{win.title}</span>
                <button
                    onClick={onClose}
                    className="h-4 w-4 rounded-full bg-red-400 hover:bg-red-500 cursor-pointer"
                />
            </div>
            <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-taupe-500 scrollbar-track-transparent ">
                {renderAppContent(win.appId)}
            </div>
        </div>
    )
}