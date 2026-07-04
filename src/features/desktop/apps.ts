// src/features/desktop/apps.ts
export interface AppDefinition {
    id: string
    title: string
    icon: string // emoji for now, could be a real icon later
    defaultWidth: number
    defaultHeight: number
}

export const APPS: AppDefinition[] = [
    { id: 'notes', title: 'Notes', icon: 'notes', defaultWidth: 480, defaultHeight: 320 },
    { id: 'calculator', title: 'Calculator', icon: 'calc', defaultWidth: 300, defaultHeight: 400 },
    { id: 'browser', title: 'Browser', icon: 'web', defaultWidth: 640, defaultHeight: 420 },
    { id: 'settings', title: 'Settings', icon: 'sett', defaultWidth: 420, defaultHeight: 360 },
    { id: 'profile', title: 'Profile', icon: '👤', defaultWidth: 360, defaultHeight: 280 },

]