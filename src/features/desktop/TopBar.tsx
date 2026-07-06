import { useEffect, useState } from "react";
import { useWeather } from "./useWeather";

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

    const weather = useWeather()

    const day = now.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short'})
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})

    return (
        <div className="absolute top-0 left-0 right-0 z-50 flex h-9 items-center justify-between bg-black/20 px-4 text-sm text-taupe-300 backdrop-blur-md">
            <div className="flex items-center gap-4">
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
                {weather && (
                    <span className="flex items-center gap-1">
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                            alt={weather.condition}
                            className="h-5 w-5"
                        />
                        {weather.temp}°C
                    </span>
                )}
            </div>

        </div>
    )
}