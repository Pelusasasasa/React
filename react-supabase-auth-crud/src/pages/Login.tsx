import { useState } from "react";
import { supabase } from "../supabase/client";

export const Login = () => {

    const [email, setEmail] = useState('');

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await supabase.auth.signInWithOtp({ email });
            console.log(result);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={changeEmail} name="email" placeholder="agustinlorenzatto@gmail.com" id="" />
            <button>Send</button>
        </form>
    </div>
  )
}
