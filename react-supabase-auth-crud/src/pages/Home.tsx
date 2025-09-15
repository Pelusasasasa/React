import { useEffect } from 'react'
import { supabase } from '../supabase/client'
import { useNavigate } from 'react-router-dom'
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(!supabase.auth.getUser()){
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      Home
      <button onClick={() => supabase.auth.signOut()}>LogOut</button>

      <TaskForm/>
      <TaskList/>
    </div>
  )
}
