import axios from 'axios';
import { useEffect, useState } from 'react';

const Goals = () => {
  const [goals, setGoals] = useState([])

  useEffect(() => {
    const getGoals = async () => {
      const response = await axios.get('/goals')
      setGoals(response.data)
    }

    getGoals()
  })

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    // const [complete, setComplete] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault()
         await axios.post('/accounts/register', {
            firstName,
            lastName,
            email,
            password
          });
      
    }

    const handleGoal = async (e) => {
        e.preventDefault()
    
        await axios.post('/goals', {
            name,
            username,
            // complete,
        });
        setName('')
        setUsername('')
    }

  return (
    <div>
      <ul>
        {
          goals.map(goal => <li key={goal.id}>{goal.name}</li>)
        }
      </ul>
        <div className="register">
          <span className='registerTitle'>Register</span>
          <form className='registerForm' onSubmit={handleRegister}>
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
                  type='password'
                  placeholder='Enter your password...'
                  onChange={(e) => setPassword(e.target.value)}
              />
          </form>

        </div>
        <div className="goal">
          <span className='GoalTitle'>New Goal</span>
          <form className='registerForm' onSubmit={handleGoal}>
              <label>Goal Name</label>
              <input 
                  type='text'
                  placeholder='Enter your first name...'
                  onChange={(e) => setName(e.target.value)}
                  required
              />
              <label>username</label>
              <input 
                  type='text'
                  placeholder='Enter your username...'
                  onChange={(e) => setUsername(e.target.value)}
                  required
              />
              {/* <label>Completion</label>
              <input 
                  type='checkbox'
                  placeholder='Enter your email...'
                  onChange={(e) => setComplete(e.target.value)}
              /> */}
              <button type='submit'>Add Goal</button>
          </form>
      </div>
    </div>
  )
}

export default Goals