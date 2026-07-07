import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

export interface FileNode {
    id: string
    name: string
    isFolder: boolean
    extension?: string 
    content?: string   
    children?: FileNode[] 
}

const initialFolder: FileNode = {
    id: 'root',
    name: 'Files',
    isFolder: true,
    children: [],
}

interface FilesContextType {
    root: FileNode
    createFolder: (parentId: string, name: string) => void
    createFile: (parentId: string, name: string, extension: string) => void
    updateFileContent: (id: string, content: string) => void
    deleteNode: (id: string) => void
    findNode: (id: string) => FileNode | null
}

const FilesContext = createContext<FilesContextType | undefined>(undefined)

export function FilesProvider({ children }: { children: ReactNode }) {
    const [root, setRoot] = useState<FileNode>(() => {
        const saved = localStorage.getItem('filesystem')
        return saved ? JSON.parse(saved) : initialFolder
    })

    useEffect(() => {
        localStorage.setItem('filesystem', JSON.stringify(root))
    }, [root])

    function findNode(id: string, tree: FileNode = root): FileNode | null {
        if (tree.id === id) return tree
        if (!tree.children) return null
        for (const child of tree.children) {
            const found = findNode(id, child)
            if (found) return found
        }
        return null
    }

    function insertNode(tree: FileNode, parentId: string, newNode: FileNode): FileNode {
        if (tree.id === parentId && tree.isFolder) {
            return { ...tree, children: [newNode, ...(tree.children ?? [])] }
        }
        if (!tree.children) return tree
        return { ...tree, children: tree.children.map((c) => insertNode(c, parentId, newNode)) }
    }

    function updateNode(tree: FileNode, id: string, updater: (n: FileNode) => FileNode): FileNode {
        if (tree.id === id) return updater(tree)
        if (!tree.children) return tree
        return { ...tree, children: tree.children.map((c) => updateNode(c, id, updater)) }
    }

    function removeNode(tree: FileNode, id: string): FileNode {
        if (!tree.children) return tree
        return { ...tree, children: tree.children.filter((c) => c.id !== id).map((c) => removeNode(c, id)) }
    }

    function createFolder(parentId: string, name: string) {
        setRoot((prev) => insertNode(prev, parentId, { id: crypto.randomUUID(), name, isFolder: true, children: [] }))
    }

    function createFile(parentId: string, name: string, extension: string) {
        setRoot((prev) => insertNode(prev, parentId, { id: crypto.randomUUID(), name, isFolder: false, extension, content: '' }))
    }

    function updateFileContent(id: string, content: string) {
        setRoot((prev) => updateNode(prev, id, (n) => ({ ...n, content })))
    }

    function deleteNode(id: string) {
        setRoot((prev) => removeNode(prev, id))
    }

    return (
        <FilesContext.Provider value={{ root, createFolder, createFile, updateFileContent, deleteNode, findNode }}>
            {children}
        </FilesContext.Provider>
    )
}

export function useFileSystem() {
    const ctx = useContext(FilesContext)
    return ctx
}