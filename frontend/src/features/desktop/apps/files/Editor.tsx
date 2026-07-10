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
        <div className="flex min-h-[324px] flex-col text-taupe-100">
            <textarea
                value={file.content ?? ''}
                onChange={(e) => updateFileContent(fileId, e.target.value)}
                placeholder="Start typing..."
                className="flex-1 p-4 text-[15px] placeholder:text-taupe-600"
            />
        </div>
    )
}