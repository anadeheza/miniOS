import React, { useRef } from "react";
import { useWallpaper } from "./BackgroundConext";
import { getSystemInfo } from "./SystemInfo";
import { isVideoWallpaper } from "./BackgroundConext";

interface SettingsProps {
    onLogout: () => void
}

export const Settings: React.FC<SettingsProps> = ({ onLogout}) => {
    const { wallpaper, setWallpaper, presets} = useWallpaper()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const info = getSystemInfo()

    function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if(!file) return
        const reader = new FileReader()
        reader.onload = () => setWallpaper(reader.result as string)
        reader.readAsDataURL(file)
    }

    return (
        <div className="h-full flex flex-col gap-6 p-4 overflow-y-auto "> 

            <section>
                <h2 className="text-[20px] tracking-[0.5px] font-bold mb-2 text-taupe-300">Backgrounds ⤵</h2>

                <div className="grid grid-cols-2 gap-3">
                    {presets.map((src) => (
                        isVideoWallpaper(src) ? (
                            <video key={src} src={src} muted loop className=" h-45 w-full object-cover rounded cursor-pointer" onClick={() => setWallpaper(src)} />
                        ) : (
                            <img key={src} src={src} className=" h-45 w-full object-cover rounded cursor-pointer" onClick={() => setWallpaper(src)} />
                        )
                    ))}
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={() => fileInputRef.current?.click()} 
                        className="mt-5 cursor-pointer border rounded-[10px] px-2 text-taupe-400"
                    >
                        Upload an image ˙𐃷˙
                    </button>
                </div>

                <input
                    type="file"
                    accept="image/*,video/*" 
                    ref={fileInputRef}
                    onChange={handleUpload}
                    className="hidden" 
                />
            </section>

            <section>
                <h2 className="tracking-[0.5px] text-[20px] font-bold mt-5 mb-2 text-taupe-300">System Info ⤵ </h2>

                <ul className=" ml-2 text-[15px] flex flex-col gap-1 text-taupe-400/80">
                    <li>Browser: {info.browser}</li>
                    <li>OS: {info.os}</li>
                    <li>Time Zone: {info.timezone}</li>
                    <li>Resolution: {info.resol}</li>
                </ul>
            </section>
                
            <section className="flex justify-center" >
                <button
                    onClick={onLogout} 
                    className=" px-3 py-0.5 rounded-lg text-[20px] text-rose-700 hover:text-rose-200"
                    title="Shut down"
                >
                     ⏻ 
                </button>
                
            </section>
        </div>
    )
}