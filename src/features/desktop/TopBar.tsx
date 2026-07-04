import { useEffect, useState } from "react";

interface TopBarProps {
    displayName: string | null
    onOpenApp: (appId: string) => void
    onLogout: () => void
}

export function TopBar({ displayName, onOpenApp, onLogout}: TopBarProps) {
    const [now, setNow] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 30_000)
        return () => clearInterval(interval)
    }, [])

    const day = now.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short'})
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
 
    return (
        <div className="absolute top-0 left-0 right-0 z-50 flex h-9 items-center justify-between bg-black/15 px-4 text-sm text-white backdrop-blur-[2px]">

            <div className="flex items-center gap-2">
                <button onClick={() => onOpenApp('settings')} title="Settings" className="hover:opacity-70 transition-opacity">
                    ⫶
                </button>
                <button onClick={onLogout} title="Log out" className="hover:opacity-70 transition-opacity">
                    ⏻
                </button>
                <button onClick={() => onOpenApp('profile')} title="Profile" className="hover:opacity-70 transition-opacity">
                    {displayName ?? 'Guest'}
                </button>
            </div>

            <div className="flex items-center gap-3 font-medium">
                <span>{day}</span>
                <span>{time}</span>
            </div>
        </div>
    )
}