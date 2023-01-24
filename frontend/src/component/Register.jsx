import React, { useState } from 'react'
import './Register.css'
import Room from '@mui/icons-material/Room';
import { useRef } from 'react';
import axios from 'axios';

export default function Register() {
    const [sucsses, setsucsses] = useState(false);
    const [fail, setfail] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handelsubmit = async (e) => {
        e.preventdefault();
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            pasword: passwordRef.current.value
        }
        try {
            await axios.post("http://localhost:8000/users/register", newUser);
            setfail(false);
            setsucsses(true);
        } catch (err) {
            console.log(err);
            setfail(true);
        }
    }
    return (
        <div className='registerContainer'>
            <div className="logo">
                <Room /> Travel Pin Register
            </div>
            <form onSubmit={handelsubmit}>
                <input type="text" placeholder='username' ref={nameRef} />
                <input type="email" placeholder='email' ref={emailRef} />
                <input type="password" placeholder='password' ref={passwordRef} />
                <button type="submit" className='rbtn'>Register</button>
                {sucsses && <span className="sucsses">Sucssesful You can login Now!</span>}
                {fail && <span className="fail"> Something Wrong!!</span>}
            </form>
        </div>
    )
}
