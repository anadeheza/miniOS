// src/features/desktop/useWeather.ts
import { useEffect, useState } from 'react'

interface WeatherData {
    temp: number
    condition: string
    icon: string
}

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY

export function useWeather() {
    const [weather, setWeather] = useState<WeatherData | null>(null)

    useEffect(() => {
        function fetchWeather(lat: number, lon: number) {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            )
                .then((res) => {
                    if (!res.ok) throw new Error('Weather fetch failed :/')
                    return res.json()
                })
                .then((data) => {
                    setWeather({
                        temp: Math.round(data.main.temp),
                        condition: data.weather[0].main,
                        icon: data.weather[0].icon,
                    })
                })
                .catch(() => setWeather(null))
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
            () => fetchWeather(48.8566, 2.3522) // fallback: Paris, adjust to taste
        )
    }, [])

    return weather
}