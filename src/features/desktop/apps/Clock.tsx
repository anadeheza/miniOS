import React, { useState, useEffect } from 'react'

export const Clock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date())
  const [is24H, setIs24H] = useState<boolean>(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatSegment = (num: number): string => {
    return num.toString().padStart(2, '0')
  }

  const getHours = (): string => {
    let hours = time.getHours()
    if (!is24H) {
      hours = hours % 12
      hours = hours ? hours : 12 
    }
    return formatSegment(hours)
  }

  const mins = formatSegment(time.getMinutes())
  const secs = formatSegment(time.getSeconds())
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM'

  const formatDate = (): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return time.toLocaleDateString(undefined, options)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-white font-sans ">
      <div className="p-20 md:p-12 flex flex-col items-center max-w-md w-full mx-4">
        
        <div className="text-sm md:text-base font-medium text-taupe-400  mb-6 uppercase">
          {formatDate()}
        </div>

        <div className="flex items-baseline font-black text-transparent bg-clip-text bg-white/90">
          <span className="text-6xl md:text-7xl">{getHours()}</span>
          <span className="text-5xl md:text-6xl mx-1 text-amber-400">:</span>
          <span className="text-6xl md:text-7xl">{mins}</span>
          <span className="text-5xl md:text-6xl mx-1 text-amber-400/50">:</span>
          <span className="text-4xl md:text-5xl text-taupe-400">{secs}</span>

          {!is24H && (
            <span className="ml-3 text-lg md:text-xl font-bold text-amber-400 uppercase self-end pb-1.5 md:pb-2">
              {ampm}
            </span>
          )}
        </div>

        <button
          onClick={() => setIs24H(!is24H)}
          className="mt-8 px-5 py-2.5 text-xs md:text-sm font-semibold rounded-full border border-taupe-700 hover:border-amber-600 bg-taupe-800/40 hover:bg-amber-500/10 text-taupe-300 hover:text-amber-300 transition-all cursor-pointer"
        >
          {is24H ? '24-Hour' : '12-Hour'}
        </button>
        
      </div>
    </div>
  )
}

export default Clock