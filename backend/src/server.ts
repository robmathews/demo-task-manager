import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory tasks for demo (replace with DB later)
let tasks: Array<{id: number, title: string, completed: boolean}> = [
  {id: 1, title: "Set up CI/CD pipeline", completed: false},
  {id: 2, title: "Deploy to AWS", completed: false}
];

// Routes
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const task = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };
  tasks.push(task);
  res.json(task);
});

app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = req.body.completed;
    res.json(task);
  } else {
    res.status(404).json({error: 'Task not found'});
  }
});

app.get('/health', (req, res) => {
  res.json({status: 'ok', service: 'demo-task-manager-backend'});
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
