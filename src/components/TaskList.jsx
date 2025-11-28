import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, markDone, deleteTask }) {
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

  return (
    <div className="task-grid">
      {sortedTasks.map(task => (
        <TaskItem key={task.id} task={task} markDone={markDone} deleteTask={deleteTask} />
      ))}
    </div>
  );
}

