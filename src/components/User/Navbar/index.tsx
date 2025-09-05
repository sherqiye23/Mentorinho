import { NavLink } from "react-router"

export const UserNavbar = () => {
    return (
        <div className="py-2 bg-[#282828]">
            <div className="customContainer flex w-full justify-between items-center">
                <div className="flex items-center justify-center gap-3 text-gray-200">
                    <NavLink to={'/'}>
                        <div className="text-3xl font-bold text-[#FF9800]">⌘</div>
                    </NavLink>
                    <NavLink to={'/explore'}>
                        <div>Explore</div>
                    </NavLink>
                    <NavLink to={'/quizset'}>
                        <div>Quizs</div>
                    </NavLink>
                </div>
                <div className="flex items-center justify-center gap-1 text-gray-200">
                    <NavLink to={'/login'}>
                        <div className="font-semibold">Login</div>
                    </NavLink>
                    <div>or</div>
                    <NavLink to={'/signup'}>
                        <div className="font-semibold">Signup</div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
