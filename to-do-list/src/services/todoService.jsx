import axios from 'axios';

// Update this URL to match your .NET API's URL and port
const API_BASE_URL = 'http://localhost:5087/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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

  // Add this method to your todoService
  toggleTodoCompletion: async (id, isCompleted) => {
    try {
      // First get the current todo
      const todo = await todoService.getTodoById(id);
      
      // Update just the completion status and the update timestamp
      const updatedTodo = {
        ...todo,
        isCompleted: isCompleted,
        updatedAt: new Date().toISOString()
      };
      
      // Send the update to the API
      const response = await apiClient.put(`/todo/${id}`, updatedTodo);
      return response.data;
    } catch (error) {
      console.error(`Error toggling completion for todo ${id}:`, error);
      throw error;
    }
  }
};

export default todoService;