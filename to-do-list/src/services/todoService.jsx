import axios from 'axios';

// Base URL for the API - adjust based on your backend configuration
const API_BASE_URL = 'http://localhost:5087/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // or however you store your auth token
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Todo API Service
const todoService = {
  // Get all todos
  getAllTodos: async () => {
    try {
      const response = await apiClient.get('/todo');
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  // Get a single todo by ID
  getTodoById: async (id) => {
    try {
      const response = await apiClient.get(`/todo/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching todo ${id}:`, error);
      throw error;
    }
  },

  // Create a new todo
  createTodo: async (todoData) => {
    try {
      const response = await apiClient.post('/todo', todoData);
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  // Update an existing todo
  updateTodo: async (id, todoData) => {
    try {
      const response = await apiClient.put(`/todo/${id}`, todoData);
      return response.data;
    } catch (error) {
      console.error(`Error updating todo ${id}:`, error);
      throw error;
    }
  },

  // Delete a todo
  deleteTodo: async (id) => {
    try {
      const response = await apiClient.delete(`/todo/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting todo ${id}:`, error);
      throw error;
    }
  },

  // Update the completion status of a todo
  toggleTodoCompletion: async (id, isCompleted) => {
    try {
      const todo = await todoService.getTodoById(id);
      const updatedTodo = { ...todo, isCompleted: isCompleted };
      return await todoService.updateTodo(id, updatedTodo);
    } catch (error) {
      console.error(`Error toggling completion for todo ${id}:`, error);
      throw error;
    }
  }
};

export default todoService;