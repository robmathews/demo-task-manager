import React, { useState, useEffect } from 'react';
import { api, Task } from './services/api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await api.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const response = await api.createTask(newTask);
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const toggleTask = async (id: number, completed: boolean) => {
    try {
      const response = await api.updateTask(id, completed);
      setTasks(tasks.map(task => 
        task.id === id ? response.data : task
      ));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Demo Task Manager</h1>
        <p>A simple app for testing CI/CD workflows</p>
      </header>

      <main style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={addTask} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            style={{ padding: '10px', marginRight: '10px', minWidth: '300px' }}
          />
          <button type="submit" style={{ padding: '10px 20px' }}>
            Add Task
          </button>
        </form>

        <div>
          {tasks.map(task => (
            <div key={task.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '10px',
              border: '1px solid #ddd',
              marginBottom: '5px',
              borderRadius: '4px'
            }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => toggleTask(task.id, e.target.checked)}
                style={{ marginRight: '10px' }}
              />
              <span style={{ 
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#666' : '#000'
              }}>
                {task.title}
              </span>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666' }}>
            No tasks yet. Add one above!
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
