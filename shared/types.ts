export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}
