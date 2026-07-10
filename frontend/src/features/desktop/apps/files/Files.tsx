import React, { useState } from 'react'
import { useFileSystem } from './FilesContext'
import type { FilesNode } from './FilesContext'

interface FilesProps {
    onOpenFile: (file: FilesNode) => void
}

export const Files: React.FC<FilesProps> = ({ onOpenFile }) => {
    const { root, createFolder, createFile, deleteNode, findNode } = useFileSystem()
    const [currentPath, setCurrentPath] = useState<string[]>(['root'])
    const [newItemType, setNewItemType] = useState<'folder' | 'file' | null>(null)
    const [nameInput, setNameInput] = useState('')

    const currentFolderId = currentPath[currentPath.length - 1]
    const currentFolder = findNode(currentFolderId) ?? root

    function handleItemDoubleClick(node: FilesNode) {
        if (node.isFolder) {
            setCurrentPath((prev) => [...prev, node.id])
        } else {
            onOpenFile(node)
        }
    }

    function handleCreateSubmit(e: React.FormEvent) {
        e.preventDefault()
        const trimmedName = nameInput.trim()
        if (!trimmedName) return

        if (newItemType === 'folder') {
            createFolder(currentFolderId, trimmedName)
        } else if (newItemType === 'file') {
            createFile(currentFolderId, trimmedName)
        }

        setNameInput('')
        setNewItemType(null)
    }

    const children = currentFolder.children ?? []

    return (
        <div className="flex h-full min-h-[384px] w-full text-taupe-100 font-sans antialiased rounded-b-xl overflow-hidden">
            <aside className="flex items-start w-40 flex-col border-r border-taupe-800 pt-7 pl-4 gap-2">
                <button
                    onClick={() => setNewItemType('folder')}
                    className="rounded-lg text-xs font-medium py-2 transition"
                >
                    📁 New Folder 
                </button>
                <button
                    onClick={() => setNewItemType('file')}
                    className="rounded-lg text-xs font-medium py-2 transition text-white"
                >
                    📄 New File
                </button>
            </aside>

            <main className="flex flex-1 flex-col">
                <div className="flex items-center gap-1 px-4 py-2 border-b border-taupe-800 text-xs text-taupe-400 overflow-x-auto">
                    {currentPath.map((id, index) => {
                        const node = findNode(id)
                        return (
                            <React.Fragment key={id}>
                                {index > 0 && <span className="text-taupe-600">/</span>}
                                <button
                                    onClick={() => setCurrentPath((prev) => prev.slice(0, index + 1))}
                                    className={`transition ${index === currentPath.length - 1 ? 'text-white font-medium' : ''}`}
                                >
                                    {node?.name ?? '...'}
                                </button>
                            </React.Fragment>
                        )
                    })}
                </div>

                {newItemType && (
                    <form onSubmit={handleCreateSubmit} className="flex items-center gap-2 px-4 py-2 border-b border-taupe-800">
                        <span className="text-sm">{newItemType === 'folder' ? '📁' : '📄'}</span>
                        <input
                            autoFocus
                            type="text"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            placeholder={newItemType === 'folder' ? 'Folder name' : 'File name'}
                            required
                            className=" border border-taupe-700 rounded px-2 py-1 text-xs outline-none focus:border-indigo-500 w-32"
                        />
                        {newItemType === 'file' && (
                            <span className="text-taupe-300/90 text-xs">.txt</span>                               
                        )}
                        <button type="submit" className="text-xs rounded px-2 py-1 transition">
                            Create
                        </button>
                        <button type="button" onClick={() => setNewItemType(null)} className="text-xs text-taupe-400 hover:text-white transition">
                            Cancel
                        </button>
                    </form>
                )}

                <div className="flex-1 overflow-y-auto p-4">
                    {children.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-taupe-500">
                            <div className="text-3xl mb-2 text-amber-400">🗁</div>
                            <p className="text-[14px]">No files</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-4 gap-4">
                            {children.map((node) => (
                                <div
                                    key={node.id}
                                    onDoubleClick={() => handleItemDoubleClick(node)}
                                    className="group relative flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer"
                                >
                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteNode(node.id) }}
                                        className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 text-[10px] text-rose-300 hover:text-rose-400"
                                    >
                                        ✕
                                    </button>
                                    <span className="text-5xl ">{node.isFolder ? '🗀' : '🗎'}</span>
                                    <span className="text-xs text-center text-taupe-300 truncate w-full">
                                        {node.name}{!node.isFolder && `.txt`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}