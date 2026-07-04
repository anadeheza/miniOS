interface User {
  id: string
  email: string
  name: string
}

interface DesktopProps {
  user: User | null
  isGuest: boolean
  guestName: string | null
}

export function Desktop({ user, isGuest, guestName }: DesktopProps) {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-900 text-white">
            <p>
                {isGuest
                    ? `Welcome, ${guestName}.`
                    : `Welcome to your desktop, ${user?.name}.`}
            </p>
        </div>
    )
}