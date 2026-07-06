import React, {useState, useEffect} from "react";

interface Note {
    id: string
    title: string
    content: string
    category: string
    updatedAt: string
    color: string
}

const CATS = ['No category', 'Work', 'School', 'Ideas', 'Important' ]

const COLORS = [
  'bg-amber-100 dark:bg-amber-200/40 border-amber-300 ',
  'bg-blue-100 dark:bg-blue-200/40 border-blue-300',
  'bg-emerald-100 dark:bg-emerald-200/40 border-emerald-300',
  'bg-rose-100 dark:bg-rose-200/40 border-rose-300',
  'bg-purple-100 dark:bg-purple-200/40 border-purple-300',
];

export const Notes: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>(() => {
        const saved = localStorage.getItem('notes')
        return saved? JSON.parse(saved) : []
    })

    const [search, setSearch] = useState<string>('')
    const [activeId, setActiveId] = useState<string | null>(null)

    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [color, setColor] = useState<string>(COLORS[0])
    const [category, setCategory] = useState<string>('No category')
    
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes))
    }, [notes])

    const handleSelect = (note: Note) => {
        setActiveId(note.id)
        setTitle(note.title)
        setContent(note.content)
        setColor(note.color)
        setCategory(note.category)
    }

    const handleCreate = () => {
        const newNote: Note = {
            id: crypto.randomUUID(),
            title: 'Untitled',
            content: '',
            updatedAt: new Date().toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            category: 'No category'
        }
        setNotes((prev) => [newNote, ...prev])
        handleSelect(newNote)
    }

    const handleUpdate = (field: 'title' | 'category' | 'content' | 'color', value: string) => {
        if(!activeId) return

        if(field === 'title') setTitle(value)
        if(field === 'content') setContent(value)
        if(field === 'color') setColor(value)
        if(field === 'category') setCategory(value)

        setNotes((prevNotes) => 
            prevNotes.map((note) => 
                note.id === activeId ? {
                    ...note,
                    [field]: value,
                    updatedAt: new Date().toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                } : note
            )
        )
    }


    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        setNotes((prev) =>prev.filter((note) => note.id !== id))
        if(activeId === id) {
            setActiveId(null)
            setTitle('')
            setContent('')
            setCategory('No category')
        }
    }

    const filtered = notes.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()) || note.content.toLowerCase().includes(search.toLowerCase()) || note.category.toLowerCase().includes(search.toLowerCase()))

    const currentActive = notes.find((n) => n.id === activeId)

    return (
        <div className="flex h-full w-full text-taupe-200 font-sans ">
            <aside className="flex w-80 flex-col w-[40%] max-w-[220px]">
                <div className="p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold text-taupe-200">My Notes</h1>
                        <button
                            onClick={handleCreate}
                            className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-amber-500 text-white shadow hover:bg-amber-600"
                            title="Create new note"
                        >
                            <span className="text-xl font-medium">+</span>
                        </button>
                    </div>
                        
                    <input
                        type="text"
                        placeholder="..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="text-taupe-100 w-full rounded-lg bg-taupe-50/30 px-3 py-1.5 text-sm outline-none border border-white/20 focus:border-indigo-500 focus:border-white "
                    />
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2 max-w-[220px] ">
                    {filtered.length === 0 ? (
                        <div className="text-center text-sm text-taupe-400 mt-8">No notes found :/</div>
                    ) : (
                        filtered.map((note) => {
                            const isActive = note.id === activeId;
                            return (
                                <div
                                    key={note.id}
                                    onClick={() => handleSelect(note)}
                                    className={`cursor-pointer rounded-xl border p-4 ${
                                        isActive
                                        ? 'border-taupe-100 bg-white/30'
                                        : 'border-taupe-400 bg-white/20'
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <span className="truncate font-semibold text-taupe-300 max-w-[80%]">
                                            {note.title.trim() === '' ? 'Untitled' : note.title}
                                        </span>
                                        <button
                                            onClick={(e) => handleDelete(note.id, e)}
                                            className="opacity-30 hover:opacity-100 text-taupe-100 hover:text-rose-300 rounded p-1"
                                            title="Delete note"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <p className="mt-1 truncate max-w-[80%] text-xs text-taupe-400">
                                        {note.content.trim() === '' ? 'No description :/' : note.content}
                                    </p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-[10px] font-medium text-taupe-400">{note.updatedAt}</span>

                                        {note.category !== 'No category' && (
                                            <span className="text-[10px] text-taupe-300">
                                                {note.category}
                                            </span>
                                        )}

                                        <div className={`h-2.5 w-2.5 rounded-full border ${note.color.split(' ')[0]}`} />
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </aside>

            <main className="flex flex-1 flex-col ">
                {currentActive ? (
                    <div className="flex flex-1 flex-col p-6 max-w-4xl w-full mx-auto">
                        <div className="mb-4 flex items-center justify-between border-b border-taupe-200">
                            <span className="text-xs font-medium text-taupe-400 mb-6">
                                Last modified: {currentActive.updatedAt}
                            </span>

                            <div className="flex items-center gap-3">
                                <label htmlFor="category-select" className="-xs font-bold text-taupe-500">
                                    Category: 
                                </label>
                                <select 
                                    name="category" 
                                    id="category-select" 
                                    value={category} 
                                    onChange={(e) => handleUpdate('category', e.target.value)}
                                    className="rounded-md border border-taupe-500 px-2 py-1 text-xs font-medium text-taupe-600 outline-none focus:border-taupe-200"
                                >
                                    {CATS.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>

                                {COLORS.map((colorOption) => (
                                <button
                                    key={colorOption}
                                    onClick={() => handleUpdate('color', colorOption)}
                                    className={`h-6 w-6 rounded-full border transition active:scale-90 ${colorOption.split(' ')[0]} ${
                                    color === colorOption ? 'ring-3 ring-white/70 ' : 'border-taupe-300'
                                    }`}
                                />
                                ))}
                            </div>
                        
                        </div>

                        <div className={`flex flex-1 flex-col rounded-2xl border p-6 ${color} text-taupe-800/90 dark:text-taupe-300`}>
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => handleUpdate('title', e.target.value)}
                                className="w-full text-2xl font-bold outline-none placeholder:opacity-70"
                            />
                            <textarea
                                placeholder="..."
                                value={content}
                                onChange={(e) => handleUpdate('content', e.target.value)}
                                className="mt-4 w-full flex-1 resize-none text-sm leading-relaxed outline-none placeholder:opacity-50"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center mt-[45%] text-taupe-500 font-semibold">No active note :/</div>
                )}
            </main>
        </div>
    );
}