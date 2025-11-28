import React, { useEffect } from 'react';

export default function TaskItem({ task, markDone, deleteTask }) {

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const deadline = new Date(task.deadline);
      if(!task.completed && deadline - now <= 60*60*1000 && deadline - now > 0) {
        alert(`Task "${task.name}" is close to deadline!`);
      }
      if (!task.completed && now > deadline) {
      alert(`Task "${task.name}" has missed its deadline!`);
    }
    }, 60*1000);
    return () => clearInterval(timer);
  }, [task]);
  return (
  <div className="task-card">
    <h4>
      {task.name} 
      {task.completed && (
        <span style={{ color: task.status === "Missed" ? "red" : "#0f0" }}>
          ({task.status})
        </span>
      )}
    </h4>
    <p>{task.description}</p>
    <p>Deadline: {new Date(task.deadline).toLocaleString()}</p>
    <p>Priority: {task.priority}</p>
    <p>Score: {task.score || 0}</p>
    {!task.completed && <button onClick={() => markDone(task.id)}>Mark Done</button>}
    <button onClick={() => deleteTask(task.id)}>Delete</button>
  </div>
 );
}
