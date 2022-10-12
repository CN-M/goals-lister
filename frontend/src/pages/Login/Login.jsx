import './Login.scss'
import axios from 'axios';
import { useState } from 'react'

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('/accounts/register', {
            firstName,
            lastName,
            email,
            password
        });
    }
  return (
    <div className="register">
        <span className='registerTitle'>Register</span>
        <form className='registerForm' onSubmit={handleSubmit}>
            <label> First Name</label>
            <input 
                type='text'
                placeholder='Enter your first name...'
                onChange={(e) => setFirstName(e.target.value)}
            />
            <label>Last Name</label>
            <input 
                type='text'
                placeholder='Enter your last name...'
                onChange={(e) => setLastName(e.target.value)}
            />
            <label>Email</label>
            <input 
                type='text'
                placeholder='Enter your email...'
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input 
                type='text'
                placeholder='Enter your password...'
                onChange={(e) => setPassword(e.target.value)}
            />
        </form>
    </div>
  )
}

export default Register