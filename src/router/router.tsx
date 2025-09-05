import { NotFoundPage } from "../pages/NotFound"
import { ExplorePage } from "../pages/User/Explore"
import HomePage from "../pages/User/Home"
import LoginPage from "../pages/User/Login"
import { QuizSetPage } from "../pages/User/QuizSet"
import SignupPage from "../pages/User/Signup"
import { TeacherPage } from "../pages/User/TeacherPage"
import UserLayout from "../pages/User/UserLayout"

const ROUTES = [
    {
        path: '/',
        element: <UserLayout />,
        children: [
            {
                path: '',
                element: <HomePage />,
            },
            {
                path: '/quizset',
                element: <QuizSetPage />,
            },
            {
                path: '/explore',
                element: <ExplorePage />,
            },
            {
                path: '/teacherpage',
                element: <TeacherPage />,
            },
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/signup',
                element: <SignupPage />
            }
        ]
    },
    {
        path: '*',
        element: <NotFoundPage />
    },
]

export default ROUTES