import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { MyUserProvider } from './Context/MyUserContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MyUserProvider>
        <App />
      </MyUserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
