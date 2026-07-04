import { useEffect, useState } from "react";

interface LockScreenProps {
    onUnlock: () => void
}

export function LockScreen({ onUnlock }: LockScreenProps) {
    const [isUnlocking, setIsUnlocking] = useState(false)
    function triggerUnlock() {
        setIsUnlocking(true)
    }

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Enter') triggerUnlock()
        }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    useEffect(() => {
        if(!isUnlocking) return
        const timeout = setTimeout(onUnlock, 400)
        return () => clearTimeout(timeout)
    }, [isUnlocking, onUnlock])

    return (
        <div
            onClick={triggerUnlock}
            className={`flex h-screen w-screen cursor-pointer flex-col items-center justify-center bg-taupe-600 bg-[url(src/assets/bg.jpg)] bg-blend-multiply bg-cover bg-center text-white transition-transform duration-400 ease-in ${
                isUnlocking ? '-translate-y-full' : 'translate-y-0'
            }`}
        >
            <div className="flex flex-col items-center mb-70">
                <p className="text-lg font-medium text-white/70">
                    {new Date().toLocaleDateString([], {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'long',
                    })}
                </p>
                <div className="text-7xl font-semibold tracking-tight text-white/40 backdrop-blur-10px [-webkit-text-stroke:0.5px_#ffffffd6]">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
            <div className="fixed bottom-5 text-sm text-gray-400 flex flex-col items-center gap-2">
                <p>Click or press Enter to unlock </p>
                <p >⏷</p>
            </div>
        </div>
    )
}
