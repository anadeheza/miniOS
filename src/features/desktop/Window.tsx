import { useRef } from "react";
import type { OSWindow } from "./types";
import { Calc } from "./apps/Calc";

interface WindowProps {
    window: OSWindow
    onClose: () => void
    onFocus: () => void
    onMove: (x: number, y: number) => void
}

export function Window({ window: win, onClose, onFocus, onMove }: WindowProps) {
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
                return <p>Notes</p>
            case 'calculator':
                return <Calc/>
            case 'browser':
                return <p>Browser </p>
            case 'settings':
                return <p>Settings</p>
            default:
                return <p>Unknown app.</p>
        }
    }

    return (
        <div
            className="absolute rounded-xl bg-black/90 shadow-2xl overflow-hidden"
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
                className="flex h-9 cursor-move items-center justify-between bg-taupe-800 px-3"
            >
                <span className="text-sm font-medium text-taupe-300">{win.title}</span>
                <button
                    onClick={onClose}
                    className="h-4 w-4 rounded-full bg-red-400 hover:bg-red-500"
                />
            </div>
            <div>
                {renderAppContent(win.appId)}
            </div>
        </div>
    )
}