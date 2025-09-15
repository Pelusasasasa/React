import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'
import { useNavigate } from 'react-router-dom'
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';

export const Home = () => {
  const [showTasksDone, setShowTasksDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(!supabase.auth.getUser()){
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className='row pt-4'>
      <div className="col-md-4 offset-md-4">
        <TaskForm/>

        <header className='d-flex justify-content-between align-items-center my-4'>
          <span className='h5'>{showTasksDone ? 'Tasks done' : 'Tasks Todo'}</span>  
          <button className='btn btn-dark btn-sm' onClick={() => setShowTasksDone(!showTasksDone)}>{showTasksDone ? ' Show Tasks Todo' : ' Show Tasks done'}</button>
        </header>
        <TaskList done={showTasksDone}/>
      </div>
    </div>
  )
}
