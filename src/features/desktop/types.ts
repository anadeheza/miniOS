export interface OSWindow {
    id: string
    appId: string
    title: string
    x: number
    y: number
    width: number
    height: number
    zIndex: number 
    data?: {fileId?: string}
}