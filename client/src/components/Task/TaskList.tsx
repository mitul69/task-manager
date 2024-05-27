import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { addTask, updateTask, deleteTask } from 'store/slices/taskSlice';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'To Do' | 'In Progress' | 'Done'>('To Do');

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      status
    };
    dispatch(addTask(newTask));
  };

  return (
    <div>
      <h1>Task Management</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value as 'To Do' | 'In Progress' | 'Done')}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task : any) => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.description} - {task.status}
            <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
            <button onClick={() => dispatch(updateTask({ ...task, status: 'Done' }))}>Mark as Done</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
