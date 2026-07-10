import { APPS } from "./apps"

interface DockProps {
    onOpenApp: (appId: string) => void
}

export function Dock({ onOpenApp }: DockProps) {
    return (
        <div className=" absolute left-[41%] bottom-4 flex gap-3 rounded-[16px] bg-black/10 px-4 py-2 backdrop-blur-[5px] border border-white/30 min-w-[300px] justify-center">
            {APPS.filter((app) => app.showInDock !== false).map((app) => (
                <button
                    key={app.id}
                    onClick={() => onOpenApp(app.id)}
                    title={app.title}
                    className="flex h-13 w-13 items-center justify-center rounded-[12px] hover:bg-amber-100/15 overflow-hidden"
                >
                    <img src={app.icon} alt={app.title} className="h-10 w-11 object-contain" />
                </button>
            ))}
        </div>
    )
}