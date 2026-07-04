import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "./AuthContext";

interface AuthProps {
    onClose: () => void
    onSkip: () => void
}

export function LoginSignupModal({ onClose, onSkip }: AuthProps) {
    const [mode, setMode] = useState<'login' | 'signup'>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { login, signup } = useAuth()

    async function handleSubmit(e:FormEvent) {
        e.preventDefault()
        setError(null)
        setIsSubmitting(true)

        try {
            if (mode === 'login') {
                await login(email, password)
            } else {
                await signup(email, password, name)
            }
            onClose()
        } catch(err) {
            setError(err instanceof Error ? err.message : 'Sorry, smth went wrong :/')
        } finally {
            setIsSubmitting(false)
        }
        
    } 

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-taupe-600 bg-[url(src/assets/homebg.jpg)] bg-blend-multiply bg-cover bg-center">
            <div className="w-90 rounded-[30px] bg-amber-100/20 backdrop-blur-10 p-6 text-black border border-amber-100/50">
                <h2 className="mb-4 text-lg font-semibold text-amber-50">
                    {mode === 'login' ? 'Log in' : 'Sign up'}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {mode === 'signup' && (
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="rounded-[15px] bg-black/10 px-3 py-2 outline-none border border-amber-100/50 focus:text-white"
                        />
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="rounded-[15px] bg-black/10 px-3 py-2 outline-none  border border-amber-100/50 focus:text-white"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        className="rounded-[15px] bg-black/10 px-3 py-2 outline-none  border border-amber-100/50 focus:text-white"
                    />

                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-[15px] bg-amber-950/50 py-2 font-medium hover:bg-amber-950/80 text-white/50 hover:text-white/80 mt-4"
                    >
                        {isSubmitting ? 'Wait a sec please :)' : mode === 'login' ? 'Log in' : 'Sign up'}
                    </button>
                    </form>

                <button
                    className="mt-4 text-sm text-white/60 hover:underline"
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                >
                    {mode === 'login' ? "No account yet? Sign up!" : 'Already signed up? Log in!'}
                </button>
                <button
                    className="mt-2 text-sm text-white/40 hover:text-white/70 hover:underline"
                    onClick={onSkip}
                >
                    Continue without an account
                </button>
            </div>
        </div>
    )
}