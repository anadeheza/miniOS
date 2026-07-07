import React from "react";
import { useAuth } from "../../auth/AuthContext";

interface ProfileProps {
    isGuest: boolean
    guestName: string | null 
    onLogout: () => void
}

export const Profile: React.FC<ProfileProps> = ({ isGuest, guestName, onLogout}) => {
    const { user } = useAuth()
    
    const displayName = isGuest ? guestName : user?.name
    const displayEmail = isGuest ? 'You are a guest! 𖨆' : user?.email

    
    return (
        <div className="flex h-full flex-col items-center gap-4 p-6 text-slate-100 rounded-b-xl">
            <div className="relative">
                <div
                    className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-taupe-700 text-4xl text-taupe-300/90 pt-1"
                >
                    {'˙ᵕ˙'}
                </div>
            </div>

            <div className="text-center">
                <div className="text-base font-bold text-amber-400">{displayName}</div>
                <div className="mt-0.5 text-xs text-slate-400">{displayEmail}</div>
            </div>

            <div className="flex-1" />

            <button
                onClick={onLogout}
                className="w-full rounded-lg bg-rose-800/70 py-2 text-sm font-bold text-rose-100 hover:bg-rose-800"
            >
                Log out ⏻
            </button>
        </div>
    )
}