import React, { useEffect } from 'react'
import { useTasks } from '../context/TaskContext';
import { TaskCard } from './TaskCard';

interface Props {
    done: boolean;
}

interface UseTasks {
    tasks: [];
    getTasks: () => Promise<void>;
    loading: boolean;
}

export const TaskList = ({done = false}: Props) => {
    const { tasks, getTasks, loading } = useTasks<UseTasks>();
    useEffect(() => {
        getTasks(done)
    }, [done]);

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
