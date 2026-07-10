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

  const formatT = (num: number): string => {
    return num.toString().padStart(2, '0')
  }

  const getHours = (): string => {
    let hours = time.getHours()
    if (!is24H) {
      hours = hours % 12
      hours = hours ? hours : 12 
    }
    return formatT(hours)
  }

  const mins = formatT(time.getMinutes())
  const secs = formatT(time.getSeconds())
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
      <div className="p-20 flex flex-col items-center max-w-[450px] w-full mx-4">
        
        <div className="text-[14px] font-medium text-taupe-400 mb-6 uppercase">
          {formatDate()}
        </div>

        <div className="flex items-baseline font-bold text-taupe-100/90">
          <span className="text-6xl ">{getHours()}</span>
          <span className="text-5xl mx-1 text-amber-400/90">:</span>
          <span className="text-6xl ">{mins}</span>
          <span className="text-5xl mx-1 text-amber-400/80">:</span>
          <span className="text-4xl text-taupe-400">{secs}</span>

          {!is24H && (
            <span className="ml-2 text-[20px] font-bold text-amber-400 uppercase">
              {ampm}
            </span>
          )}
        </div>

        <button
          onClick={() => setIs24H(!is24H)}
          className="mt-6 px-5 py-2 text-[13px] font-bold rounded-full border border-taupe-700 hover:border-amber-600 bg-taupe-800/40 hover:bg-amber-500/5 text-taupe-300 hover:text-amber-300 cursor-pointer"
        >
          {is24H ? '24H' : '12H'}
        </button>
        
      </div>
    </div>
  )
}

export default Clock