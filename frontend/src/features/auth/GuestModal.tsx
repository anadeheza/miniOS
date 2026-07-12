import { useState } from 'react'
import type { FormEvent } from 'react'
import homebg from '../../assets/wallpapers/homebg.jpg'


interface GuestNameModalProps {
    onSubmit: (name: string) => void
}

export function GuestNameModal({ onSubmit }: GuestNameModalProps) {
    const [name, setName] = useState('')

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const trimmed = name.trim()
        onSubmit(trimmed.length > 0 ? trimmed : 'Guest')
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-taupe-600 bg-[url(${homebg})] bg-blend-multiply bg-cover bg-center`}>
            <div className="w-90 rounded-[30px] bg-amber-100/20 backdrop-blur-10 p-6 text-black border border-amber-100/50">
                <h2 className="mb-4 text-lg font-semibold text-amber-50">
                    Enter a name (optional)
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        className="rounded-[15px] bg-black/10 px-3 py-2 outline-none border border-amber-100/50 focus:text-white"
                    />

                    <button
                        type="submit"
                        className="rounded-[15px] bg-amber-950/50 py-2 font-medium hover:bg-amber-950/80 text-white/50 hover:text-white/80"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </div>
    )
}