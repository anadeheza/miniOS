import notesIcon from '../../assets/notes.png'
import calcIcon from '../../assets/calculator.png'
import browserIcon from '../../assets/browser.png'
import clockIcon from '../../assets/clock.png'
import filesIcon from '../../assets/files.png'

export interface AppDefinition {
    id: string
    title: string
    icon: string 
    defaultWidth: number
    defaultHeight: number
    showInDock?: boolean
}

export const APPS: AppDefinition[] = [
    { id: 'notes', title: 'Notes', icon: notesIcon, defaultWidth: 700, defaultHeight: 500 },
    { id: 'calculator', title: 'Calculator', icon: calcIcon, defaultWidth: 400, defaultHeight: 600 },
    { id: 'browser', title: 'Browser', icon: browserIcon, defaultWidth: 640, defaultHeight: 420 },
    { id: 'clock', title: 'Clock', icon: clockIcon, defaultWidth: 500, defaultHeight: 400 },
    { id: 'files', title: 'Files', icon: filesIcon, defaultWidth: 640, defaultHeight: 420 },
    { id: 'settings', title: 'Settings', icon: '⚙️', defaultWidth: 420, defaultHeight: 360, showInDock: false },
    { id: 'profile', title: 'Profile', icon: '👤', defaultWidth: 360, defaultHeight: 280, showInDock: false },
]