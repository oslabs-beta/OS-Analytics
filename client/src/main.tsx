import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import App from './App.tsx'
import './main.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>,
  </BrowserRouter>
)
