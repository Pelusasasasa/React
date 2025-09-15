import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import { TaskContextProvider } from './context/TaskContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TaskContextProvider>
        <App />
      </TaskContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
