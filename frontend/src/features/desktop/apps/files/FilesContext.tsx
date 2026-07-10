import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

export interface FilesNode {
    id: string
    name: string
    isFolder: boolean
    content?: string   
    children?: FilesNode[] 
}

const initialFiles: FilesNode = {
    id: 'root',
    name: 'Files',
    isFolder: true,
    children: [],
}

interface FilesContextType {
    root: FilesNode
    createFolder: (parentId: string, name: string) => void
    createFile: (parentId: string, name: string) => void
    updateFileContent: (id: string, content: string) => void
    deleteNode: (id: string) => void
    findNode: (id: string) => FilesNode | null
}

const FilesContext = createContext<FilesContextType | undefined>(undefined)

export function Files({ children }: { children: ReactNode }) {
    const [root, setRoot] = useState<FilesNode>(() => {
        const saved = localStorage.getItem('filesystem')
        return saved ? JSON.parse(saved) : initialFiles
    })

    useEffect(() => {
        localStorage.setItem('filesystem', JSON.stringify(root))
    }, [root])

    function findNode(id: string, f: FilesNode = root): FilesNode | null {
        if (f.id === id) return f
        if (!f.children) return null
        for (const child of f.children) {
            const found = findNode(id, child)
            if (found) return found
        }
        return null
    }

    function insertFile(f: FilesNode, parentId: string, newNode: FilesNode): FilesNode {
        if (f.id === parentId && f.isFolder) {
            return { ...f, children: [newNode, ...(f.children ?? [])] }
        }
        if (!f.children) return f
        return { ...f, children: f.children.map((c) => insertFile(c, parentId, newNode)) }
    }

    function updateFile(f: FilesNode, id: string, updater: (n: FilesNode) => FilesNode): FilesNode {
        if (f.id === id) return updater(f)
        if (!f.children) return f
        return { ...f, children: f.children.map((c) => updateFile(c, id, updater)) }
    }

    function removeFile(f: FilesNode, id: string): FilesNode {
        if (!f.children) return f
        return { ...f, children: f.children.filter((c) => c.id !== id).map((c) => removeFile(c, id)) }
    }

    function createFolder(parentId: string, name: string) {
        setRoot((prev) => insertFile(prev, parentId, { id: crypto.randomUUID(), name, isFolder: true, children: [] }))
    }

    function createFile(parentId: string, name: string) {
        setRoot((prev) => insertFile(prev, parentId, { id: crypto.randomUUID(), name, isFolder: false, content: '' }))
    }

    function updateFileContent(id: string, content: string) {
        setRoot((prev) => updateFile(prev, id, (n) => ({ ...n, content })))
    }

    function deleteNode(id: string) {
        setRoot((prev) => removeFile(prev, id))
    }

    return (
        <FilesContext.Provider value={{ root, createFolder, createFile, updateFileContent, deleteNode, findNode }}>
            {children}
        </FilesContext.Provider>
    )
}

export function useFileSystem() {
    const ctx = useContext(FilesContext)
    if (!ctx) throw new Error('error, you wrote smth wrong bro')
    return ctx
}