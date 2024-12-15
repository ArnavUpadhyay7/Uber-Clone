import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import UsersContext from './context/UsersContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsersContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UsersContext>
  </StrictMode>,
)
