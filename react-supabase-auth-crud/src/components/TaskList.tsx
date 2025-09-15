import React, { useEffect } from 'react'
import { useTasks } from '../context/TaskContext';
import { TaskCard } from './TaskCard';

interface Props {
    tasks: [];
    getTasks: () => Promise<void>;
}

export const TaskList = () => {
    const { tasks, getTasks, loading } = useTasks();
    useEffect(() => {
        getTasks()
    }, []);

    if(loading) return <h1>Loading...</h1>;

    if(tasks.length === 0) return <h1>No tasks</h1>;

  return (
    <div>
        {
            tasks.map((task: any) => (
               <TaskCard key={task.id} task={task} />
            ))
        }
    </div>
  )
}
