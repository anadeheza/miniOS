import { useAuth } from './features/auth/AuthContext'
import { useState } from 'react'
import { LoginSignupModal } from './features/auth/LoginSignupModal'
import { LockScreen } from './features/LockScreen'
import { Desktop } from './features/DesktopScreen'
import { GuestNameModal } from './features/auth/GuestModal'

type Screen = 'lock' | 'auth' | 'guestName' | 'desktop'

function App() {
  const { user, isLoading } = useAuth()
  const [screen, setScreen] = useState<Screen>('lock')
  const [isGuest, setIsGuest] = useState(false)
  const [guestName, setGuestName] = useState<string | null>(null)

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading...
      </div>
    )
  }

  if (user && screen === 'lock') {
    return <Desktop user={user} isGuest={isGuest} guestName={guestName} />
  }

  if (screen === 'lock') {
    return <LockScreen onUnlock={() => setScreen('auth')} />
  }

  if (screen === 'auth' && !user && !isGuest) {
    return (
        <LoginSignupModal
            onClose={() => setScreen('desktop')}
            onSkip={() => setScreen('guestName')}
        />
    )
  }

  if (screen === 'guestName') {
    return (
        <GuestNameModal
            onSubmit={(name) => {
                setGuestName(name)
                setIsGuest(true)
                setScreen('desktop')
            }}
        />
    )
  }

  return <Desktop user={user} isGuest={isGuest} guestName={guestName} />
}

export default App