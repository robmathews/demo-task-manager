import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export const api = {
  getTasks: () => axios.get<Task[]>(`${API_BASE_URL}/api/tasks`),
  createTask: (title: string) => axios.post<Task>(`${API_BASE_URL}/api/tasks`, { title }),
  updateTask: (id: number, completed: boolean) => 
    axios.put<Task>(`${API_BASE_URL}/api/tasks/${id}`, { completed })
};
