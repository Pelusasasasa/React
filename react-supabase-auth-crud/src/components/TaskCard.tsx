import React, { use } from 'react'
import { useTasks } from '../context/TaskContext';

export const TaskCard = ({ task }) => {
    const {deleteTask, updateTask} = useTasks();

    const handleDelete = () => {
        deleteTask(task.id);
    };

    const handleDone = () => {
        updateTask(task.id, {done: !task.done});
    };


  return (
     <div key={task.id} className='card card-body mb-2'>
        <h1 className='h5'>{`${task.id}. ${task.name}`}</h1>
        <p>{task.done ? 'Done ✔️' : 'Not Done ❌'}</p>
        <p>{JSON.stringify(task.done)}</p>
        <div className='ms-auto'>
            <button className='btn btn-danger btn-sm me-1' onClick={handleDelete}>Delete</button>
            <button className='btn btn-secondary btn-sm' onClick={handleDone}>Done</button>
        </div>
    </div>
  )
}
