import React, { useState } from 'react';

export default function TaskForm({ addTask }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = e => {
    e.preventDefault();
    if(!name || !deadline) return alert("Name and Deadline required");
    addTask({ name, description: desc, deadline, priority });
    setName(''); setDesc(''); setDeadline(''); setPriority('Medium');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Task Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
      <input type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)} />
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}
