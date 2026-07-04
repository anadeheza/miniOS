import { APPS } from "./apps"

interface DockProps {
    onOpenApp: (appId: string) => void
}

export function Dock({ onOpenApp }: DockProps) {
    return (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3 rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-md border border-white/20">
            {APPS.map((app) => (
                <button
                    key={app.id}
                    onClick={() => onOpenApp(app.id)}
                    title={app.title}
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100/80 text-2xl hover:scale-110 transition-transform"
                >
                    {app.icon}
                </button>
            ))}
        </div>
    )
}