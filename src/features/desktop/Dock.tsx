import { APPS } from "./apps"

interface DockProps {
    onOpenApp: (appId: string) => void
}

export function Dock({ onOpenApp }: DockProps) {
    return (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3 rounded-2xl bg-black/10 px-4 py-2 backdrop-blur-[5px] border border-white/20">
            {APPS.filter((app) => app.showInDock !== false).map((app) => (
                <button
                    key={app.id}
                    onClick={() => onOpenApp(app.id)}
                    title={app.title}
                    className="flex h-13 w-13 items-center justify-center rounded-xl bg-transparent hover:bg-amber-100/15 overflow-hidden"
                >
                    <img src={app.icon} alt={app.title} className="h-10 w-11 object-contain" />
                </button>
            ))}
        </div>
    )
}