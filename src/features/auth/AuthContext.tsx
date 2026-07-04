import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
    id: string
    email: string
    name: string
}

interface AuthType {
    user: User | null
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    signup: (email: string, password: string, name: string) => Promise<void>
    logout: () => Promise<void>
}

const API_URL = import.meta.env.VITE_API_URL
const AuthContext = createContext<AuthType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(`${API_URL}/me`, {
            credentials: 'include',
        })
            .then((res) => {
                if (!res.ok) throw new Error('That session is invalid :/')
                return res.json()
            })
            .then((data) => setUser(data.user))
            .catch(() => setUser(null))
            .finally(() => setIsLoading(false))
    }, [])

    async function login(email: string, password: string) {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        if (!res.ok) {
            const error = await res.json().catch(() => null)
            throw new Error(error?.message ?? 'Login failed, sorry :(')
        }

        const data = await res.json()
        setUser(data.user)
    }

    async function signup(email: string, password: string, name: string) {
        const res = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
        })

        if (!res.ok) {
            const error = await res.json().catch(() => null)
            throw new Error(error?.message ?? 'Signup failed, sorry :(')
        }

        const data = await res.json()
        setUser(data.user)
    }

    async function logout() {
        await fetch(`${API_URL}/logout`, {
            method: 'POST',
            credentials: 'include',
        })
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
