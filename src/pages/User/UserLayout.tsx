import { Outlet } from 'react-router'

export default function UserLayout() {
    return (
        <>
            {/* <ClientNavbar location={isSpecialPage} /> */}
            <Outlet />
            {/* <ClientFooter /> */}
            {/* <ScrollButton /> */}
        </>
    )
}