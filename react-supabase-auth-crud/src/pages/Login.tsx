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
    <div className="row pt-4">
        <div className="col-md-4 offset-md-4">
            <form onSubmit={handleSubmit} className="card card-body">
                <input type="email" value={email} className="form-control mb-2" onChange={changeEmail} name="email" placeholder="agustinlorenzatto@gmail.com" id="" />
                <button className="btn btn-primary">Send</button>
            </form>
        </div>
    </div>
  )
}
