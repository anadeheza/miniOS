import React from 'react'
import { useFileSystem } from './FilesContext'

interface EditorProps {
    fileId: string
}

export const Editor: React.FC<EditorProps> = ({ fileId }) => {
    const { findNode, updateFileContent } = useFileSystem()
    const file = findNode(fileId)

    if (!file) return

    return (
        <div className="flex h-full flex-col text-taupe-100 rounded-b-xl overflow-hidden">
            <div className="px-4 py-2 border-b border-taupe-800 text-xs text-taupe-400">
                {file.name}.{file.extension}
            </div>
            <textarea
                value={file.content ?? ''}
                onChange={(e) => updateFileContent(fileId, e.target.value)}
                placeholder="Start typing..."
                className="flex-1 resize-none  p-4 text-sm leading-relaxed outline-none placeholder:text-taupe-600"
            />
        </div>
    )
}