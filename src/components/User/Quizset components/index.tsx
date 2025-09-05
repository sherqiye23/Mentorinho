import { useMemo, useState } from 'react'

export type Problem = {
    id: number
    title: string
    acceptance: number // percent 0-100
    difficulty: 'Easy' | 'Med.' | 'Hard'
}

const FAKE_PROBLEMS: Problem[] = [
    { id: 1, title: 'Two Sum', acceptance: 56.2, difficulty: 'Easy' },
    { id: 2, title: 'Add Two Numbers', acceptance: 46.8, difficulty: 'Med.' },
    { id: 3, title: 'Longest Substring Without Repeating Characters', acceptance: 37.5, difficulty: 'Med.' },
    { id: 4, title: 'Median of Two Sorted Arrays', acceptance: 44.6, difficulty: 'Hard' },
    { id: 5, title: 'Longest Palindromic Substring', acceptance: 36.3, difficulty: 'Med.' },
    { id: 6, title: 'Zigzag Conversion', acceptance: 52.2, difficulty: 'Med.' },
    { id: 7, title: 'Reverse Integer', acceptance: 30.7, difficulty: 'Med.' },
    { id: 8, title: 'String to Integer (atoi)', acceptance: 19.7, difficulty: 'Med.' },
    { id: 9, title: 'Palindrome Number', acceptance: 59.6, difficulty: 'Easy' },
    { id: 10, title: 'Regular Expression Matching', acceptance: 29.6, difficulty: 'Hard' },
    { id: 11, title: 'Container With Most Water', acceptance: 58.2, difficulty: 'Med.' },
    { id: 12, title: 'Integer to Roman', acceptance: 69.3, difficulty: 'Med.' },
    { id: 13, title: 'Roman to Integer', acceptance: 65.4, difficulty: 'Easy' },
    { id: 14, title: 'Longest Common Prefix', acceptance: 46.1, difficulty: 'Easy' },
    { id: 15, title: '3Sum', acceptance: 27.6, difficulty: 'Med.' },
    { id: 16, title: 'Find Closest Person', acceptance: 89.1, difficulty: 'Easy' },
]

export const QuizSetComponent = () => {
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState<'All' | 'Easy' | 'Med.' | 'Hard'>('All')
    const [sortBy, setSortBy] = useState<'id' | 'acceptance' | 'title'>('id')


    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        return FAKE_PROBLEMS.filter((p) => {
            const matchesQuery =
                q === '' ||
                p.title.toLowerCase().startsWith(q) ||
                String(p.id) === q
            const matchesFilter = filter === 'All' || p.difficulty === filter
            return matchesQuery && matchesFilter
        }).sort((a, b) => {
            if (sortBy === 'id') return a.id - b.id
            if (sortBy === 'acceptance') return b.acceptance - a.acceptance
            return a.title.localeCompare(b.title)
        })
    }, [query, filter, sortBy])


    return (
        <div className="min-h-screen bg-[#1a1a1a] text-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Problems</h1>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search questions"
                                className="w-64 pl-10 pr-3 py-2 rounded-xl bg-[#282828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <svg
                                className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35" />
                                <circle cx="11" cy="11" r="6" strokeWidth={2} />
                            </svg>
                        </div>

                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as any)}
                            className="bg-[#282828] py-2 px-3 rounded-xl"
                        >
                            <option value="All">All</option>
                            <option value="Easy">Easy</option>
                            <option value="Med.">Med.</option>
                            <option value="Hard">Hard</option>
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="bg-[#282828] py-2 px-3 rounded-xl"
                        >
                            <option value="id">Sort: ID</option>
                            <option value="acceptance">Sort: Acceptance</option>
                            <option value="title">Sort: Title</option>
                        </select>
                    </div>
                </header>

                <div className="space-y-3">
                    {filtered.map((p) => (
                        <div
                            key={p.id}
                            className="flex items-center gap-4 bg-[#282828] rounded-xl p-4 shadow-sm cursor-pointer"
                        >
                            <div className="w-10 text-center text-sm text-gray-300 font-medium">{p.id}</div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-sm font-medium">{p.title}</h2>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-sm text-gray-400">{p.acceptance.toFixed(1)}%</div>

                                        <div className={`px-2 py-1 rounded-full text-xs font-semibold ${p.difficulty === 'Easy' ? 'bg-green-700 text-green-100' : p.difficulty === 'Med.' ? 'bg-yellow-700 text-yellow-100' : 'bg-red-700 text-red-100'
                                            }`}>
                                            {p.difficulty}
                                        </div>

                                        <button className="p-1 rounded hover:bg-gray-700/60">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-yellow-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        style={{ width: `${Math.max(4, p.acceptance)}%` }}
                                        className="h-full bg-gradient-to-r from-gray-300 to-gray-100/40"
                                    />
                                </div> */}
                            </div>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div className="text-center py-10 text-gray-400">No problems found.</div>
                    )}
                </div>

                <footer className="mt-8 text-sm text-gray-500">0/{FAKE_PROBLEMS.length} Solved</footer>
            </div>
        </div>
    )
}
