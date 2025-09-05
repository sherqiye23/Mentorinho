import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import UserInfoContext from './context/UserInfoContext.tsx'

createRoot(document.getElementById('root')!).render(
  <UserInfoContext>
    <App />
  </UserInfoContext>
)
