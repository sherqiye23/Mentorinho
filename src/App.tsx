import './App.css'
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from 'react-router'
import ROUTES from './router/router'
const routerr = createBrowserRouter(ROUTES)

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={routerr} />
    </>
  )
}

export default App
