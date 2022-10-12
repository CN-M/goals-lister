import './Goals.scss'
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
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [complete, setComplete] = useState(false);


    const handleGoal = async (e) => {
        e.preventDefault()
    
        await axios.post('/goals', {
            name,
            username,
            complete,
        });        
    }

  return (
    <div className='goals'>
      <div className="goalList">
        <ul>
          {
            goals.map(goal => <li key={goal.id}>{goal.name}</li>)
          }
        </ul>
      </div>
        <div className="goalForm">
          <span className='GoalTitle'>New Goal</span>
          <form className='registerForm' onSubmit={handleGoal}>
              <div className="formItem">
                <label>Goal Name</label>
                <input
                    type='text'
                    placeholder='Enter your first name...'
                    onChange={(e) => setName(e.target.value)}
                    required
                />
              </div>
              <div className="formItem">
                <label>username</label>
                <input
                    type='text'
                    placeholder='Enter your username...'
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
              </div>
              <div className="formItem">
                <label>Completion</label>
                <input
                    type='checkbox'
                    placeholder='Enter your email...'
                    onChange={(e) => setComplete(e.target.value)}
                />
              </div>
              <button type='submit'>Add Goal</button>
          </form>
      </div>
    </div>
  )
}

export default Goals