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

  return (
    <div>
      <ul>
        {
          goals.map(goal => <li key={goal.id}>{goal.name}</li>)
        }
      </ul>
    </div>
  )
}
export default Goals;