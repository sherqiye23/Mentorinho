import { useNavigate } from "react-router";

export const NotFoundPageComponent = () => {
    const navigate = useNavigate();
    
    return (
        <main className="min-h-screen grid place-items-center bg-gray-50">
            <div className="text-center px-6">
                <h1 className="text-7xl font-extrabold tracking-tight text-gray-900">404</h1>
                <p className="mt-3 text-xl text-gray-600">Page not found</p>
                <p className="mt-1 text-gray-500">The page you’re looking for doesn’t exist or has been moved.</p>

                <div className="mt-6 flex items-center justify-center gap-3">
                    <button
                        onClick={() => navigate("/")}
                        className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-black transition"
                    >
                        Go Home
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </main>
    )
}
