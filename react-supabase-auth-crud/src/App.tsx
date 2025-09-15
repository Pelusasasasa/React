
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound';

import { supabase } from './supabase/client';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if(!session){
        navigate('/login');
      }else{
        navigate('/');
      }
    });
  }, [])

  return (
      <div>
        <Navbar/>
        <div className="container mt-5">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
        </div>
      </div>
  )
}

export default App
