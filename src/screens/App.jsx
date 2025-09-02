import { useEffect, useState } from 'react'
import { useUser } from '../context/useUser'
import axios from 'axios'
import Row from '../components/Row'

const url = "http://localhost:3001"

export default function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const { user } = useUser()

  useEffect(() => {
    const headers = { headers: { Authorization: user.token } }

    axios.get(url + "/tasks", headers)
      .then(response => {
        setTasks(response.data)
      })
      .catch(error => {
        console.error("Failed to fetch tasks:", error)
      })
  }, [user.token])

  const addTask = () => {
    const headers = { headers: { Authorization: user.token } }
    const newTask = { description: task }

    axios.post(url + "/create", { task: newTask }, headers)
      .then(response => {
        setTasks([...tasks, response.data])
        setTask('')
      })
      .catch(error => {
        alert("Failed to add task: " + error.message)
      })
  }

  const deleteTask = (deletedId) => {
    const headers = { headers: { Authorization: user.token } }

    axios.delete(url + "/delete/" + deletedId, headers)
      .then(() => {
        setTasks(tasks.filter(item => item.id !== deletedId))
      })
      .catch(error => {
        alert("Failed to delete task: " + error.message)
      })
  }

  return (
    <div className="app-container">
      <h2>Task Manager</h2>

      <input
        type="text"
        placeholder="New task"
        value={task}
        onChange={e => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map(item => (
          <Row key={item.id} task={item} onDelete={() => deleteTask(item.id)} />
        ))}
      </ul>
    </div>
  )
}
