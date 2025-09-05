import { Outlet, useLocation } from 'react-router'
import { UserNavbar } from '../../components/User/Navbar'
import { AuthNavbar } from '../../components/User/AuthNavbar';

export default function UserLayout() {
    const location = useLocation();
    const showAuthNavbar = location.pathname === "/login" || location.pathname === "/signup";

    return (
        <>
            {showAuthNavbar ? <AuthNavbar /> : <UserNavbar />}
            <Outlet />
        </>
    )
}