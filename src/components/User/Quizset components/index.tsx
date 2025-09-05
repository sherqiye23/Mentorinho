import axios from "axios";
import { useEffect, useMemo, useState } from "react";

export type TestType = {
    id: string;
    inputParametersJson: string;
    expectedResultJson: string;
    codingQuestionId: string;
};

export type Problem = {
    example: string;
    codeTemplate: string;
    tests: TestType[];
    name: string;
    text: string;
    difficulty: string;
    isPublic: boolean;
    questionNumber: number;
    id: string;
    acceptance: number;
    title: string;
};

export const QuizSetComponent = () => {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState<"All" | "Easy" | "Med." | "Hard">("All");
    const [sortBy, setSortBy] = useState<"id" | "acceptance" | "title">("id");

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const res = await axios.get<Problem[]>(
                    "https://azelebo4-001-site1.ltempurl.com/api/codingquestion"
                );
                setProblems(res.data);
            } catch (error) {
                console.error("Error fetching problems:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProblems();
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return problems
            .filter((p) => {
                const matchesQuery =
                    q === "" ||
                    p.title.toLowerCase().startsWith(q) ||
                    String(p.id) === q;
                const matchesFilter = filter === "All" || p.difficulty === filter;
                return matchesQuery && matchesFilter;
            })
            .sort((a, b) => {
                if (sortBy === "id") return Number(a.id) - Number(b.id);
                if (sortBy === "acceptance") return b.acceptance - a.acceptance;
                return a.title.localeCompare(b.title);
            });
    }, [problems, query, filter, sortBy]);

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Problems</h1>

                    <div className="flex md:items-center gap-3 flex-col md:flex-row">
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
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-4.35-4.35"
                                />
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
                            <div className="w-10 text-center text-sm text-gray-300 font-medium">
                                {p.name}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-sm font-medium">{p.title}</h2>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-sm text-gray-400">
                                            {p.acceptance?.toFixed(1) ?? "0"}%
                                        </div>

                                        <div
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${p.difficulty === "Easy" || p.difficulty === "VeryEasy"
                                                ? "bg-green-700 text-green-100"
                                                : p.difficulty === "Med." ? "bg-yellow-700 text-yellow-100" : "bg-red-700 text-red-100"
                                                }`}
                                        >
                                            {p.difficulty}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div className="text-center py-10 text-gray-400">
                            No problems found.
                        </div>
                    )}
                </div>

                <footer className="mt-8 text-sm text-gray-500">
                    0/{problems.length} Solved
                </footer>
            </div>
        </div>
    );
};
