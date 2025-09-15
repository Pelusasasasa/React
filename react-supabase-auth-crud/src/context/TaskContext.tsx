import { createContext, useContext, useState } from "react"
import { supabase } from "../supabase/client";


export const TaskContext = createContext({});

export const useTasks = () => {
    const context = useContext(TaskContext);
    if(!context) throw new Error('useTasks must be used within a TaskContextProvider');
    return context;
}

export const TaskContextProvider = ({children}: React.PropsWithChildren) => {
    const [tasks, setTasks] = useState([]);
    const [adding, setAdding] = useState(false);
    const [loading, setLoading] = useState(false);

    const addTask = async (name: string) => {
        setAdding(true);
        try {
            const { data: DataUser } = await supabase.auth.getUser();
            const {error, data} = await supabase.from('tasks').insert({
                name,
                userId: DataUser.user?.id
            });
            if(error) throw error;
            if (data) setTasks([...tasks, ...data]);
            
        } catch (error) {
            console.error (error)
        };
        setAdding(false);
    };

    const deleteTask = async (id: number) => {
        try {
            const { data: dataUser, error: errorUser} = await supabase.auth.getUser();
            if(errorUser) throw errorUser;
            
            const { data, error} = await supabase.from('tasks')
            .delete()
            .eq('userId', dataUser.user?.id)
            .eq('id', id);

            if(error) throw error;

            setTasks(tasks.filter(task => task.id !== id));

        } catch (error) {
            console.log(error);
        }
    };

    const getTasks = async (done = false) => {
        setLoading(true);
        const {data: userData} = await supabase.auth.getUser();
        const user = userData.user;
        if(!user) return;

        const { error, data } = await supabase.from('tasks')
        .select()
        .eq('userId', user?.id)
        .eq('done', done)
        .order('id', {ascending: true});
        
        if(error) throw error;
        setTasks(data);
        setLoading(false);
    };

    const updateTask = async(id: number, updateFields: boolean) => {
        try {
            const { data: dataUser, error: errorUser} = await supabase.auth.getUser();
            if(errorUser) throw errorUser;

            const res = await supabase.from('tasks')
            .update(updateFields)
            .eq('userId', dataUser.user?.id)
            .eq('id', id);

            if(res.error) throw res.error;
            
            setTasks(tasks.filter(task => task.id !== id))
        } catch (error) {
            console.log(error)
        };
    }
    return <TaskContext.Provider value={{
        loading, tasks, getTasks, addTask, adding, deleteTask, updateTask}}>
        {children}
    </TaskContext.Provider>
}