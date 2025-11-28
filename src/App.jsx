import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';


function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = ({ name, description, deadline, priority }) => {
    const newTask = { 
      id: Date.now().toString(), 
      name, description, deadline, priority, completed: false, completedAt: null, score: 0 
    };
    setTasks([...tasks, newTask]);
  }

  const markDone = id => {
  setTasks(tasks.map(task => {
    if (task.id === id && !task.completed) {
      const completedAt = new Date();
      let baseScore = task.priority === "High" ? 30 : task.priority === "Medium" ? 20 : 10;

      if (completedAt <= new Date(task.deadline)) {
        // Completed on time
        let bonus = Math.max(0, Math.floor((new Date(task.deadline) - completedAt) / (60*60*1000)));
        return { ...task, completed: true, status: "Done", completedAt, score: baseScore + bonus };
      } else {
        // Completed after deadline
        return { ...task, completed: true, status: "Missed", completedAt, score: Math.floor(baseScore / 2) };
      }
    }
    return task;
  }));
}


  const deleteTask = id => setTasks(tasks.filter(t => t.id !== id));

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Smart To-Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} markDone={markDone} deleteTask={deleteTask} />
      <h3>Total Score: {tasks.reduce((sum, t) => sum + (t.score || 0), 0)}</h3>
    </div>
  );
}

export default App;
