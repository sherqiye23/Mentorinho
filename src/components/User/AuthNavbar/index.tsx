import { NavLink } from "react-router"

export const AuthNavbar = () => {
  return (
    <div className="py-2">
      <div className="customContainer flex w-full justify-between items-center">
        <div className="flex items-center justify-center gap-3 text-gray-500">
          <NavLink to={'/'}>
            <div>
              <img className="w-[50px] rounded-full" src={'./logorinho.jpg'} alt="" />
            </div>
          </NavLink>
          <NavLink to={'/explore'}>
            <div>Explore</div>
          </NavLink>
          <NavLink to={'/quizset'}>
            <div>Quizs</div>
          </NavLink>
        </div>
        <div className="flex items-center justify-center gap-1 text-gray-500">
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
