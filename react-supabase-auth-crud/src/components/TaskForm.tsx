import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

export const TaskForm = () => {
    const { addTask, adding } = useTasks();
    const [taskName, setTaskName] = useState<string>('');

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setTaskName('');
        addTask(taskName);
    }
  return (
    <form onSubmit={handleSubmit}>
        <input type="text" name="taskName" value={taskName} placeholder='Write a Task Name' onChange={e => setTaskName(e.target.value)}/>
        <button disabled={adding}>{adding ? 'Adding...' : 'Add Task'}</button>
    </form>
  )
}
