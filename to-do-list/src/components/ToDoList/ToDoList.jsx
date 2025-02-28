import React, { useState, useEffect } from 'react';
import ToDoCard from '../Card/ToDoCard';
import todoService from '../../services/todoService';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.getAllTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id, isCompleted) => {
    try {
      await todoService.toggleTodoCompletion(id, isCompleted);
      // Update local state to reflect the change
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, isCompleted } : todo
      ));
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await todoService.deleteTodo(id);
      // Remove the deleted todo from state
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const handleEdit = (todo) => {
    // This would typically open a modal or form for editing
    // For now, we'll just log it
    console.log('Edit todo:', todo);
  };

  if (loading) return <div className="loading">Loading todos...</div>;
  if (error) return <div className="error">{error}</div>;
  
  return (
    <div className="todo-list">
      {todos.length > 0 ? (
        todos.map(todo => (
          <ToDoCard
            key={todo.id}
            todo={todo}
            onComplete={handleComplete}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))
      ) : (
        <p className="no-todos">No todos found. Create your first todo!</p>
      )}
    </div>
  );
};

export default TodoList;