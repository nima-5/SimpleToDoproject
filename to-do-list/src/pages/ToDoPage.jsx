import React, { useState, useEffect } from 'react';
import TodoList from '../../components/TodoList/TodoList';
import TodoForm from '../../components/TodoForm/TodoForm';
import todoService from '../../services/todoService';
import './TodoPage.css';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

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

  const handleAddTodo = async (todoData) => {
    try {
      setLoading(true);
      const newTodo = await todoService.createTodo({
        ...todoData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError('Failed to add todo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTodo = async (id, todoData) => {
    try {
      setLoading(true);
      const updatedTodo = await todoService.updateTodo(id, {
        ...todoData,
        updatedAt: new Date().toISOString()
      });
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
      setIsEditing(false);
      setCurrentTodo(null);
    } catch (err) {
      setError('Failed to update todo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      setLoading(true);
      await todoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTodo = async (id, isCompleted) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      const updatedTodo = await todoService.toggleTodoCompletion(id, isCompleted);
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (err) {
      setError('Failed to update todo status.');
      console.error(err);
    }
  };

  const handleEditTodo = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentTodo(null);
  };

  return (
    <div className="todo-page">
      <header className="todo-page__header">
        <h1>My Todo List</h1>
        <p>Manage your tasks easily</p>
      </header>

      <main className="todo-page__content">
        <section className="todo-page__form-section">
          <h2>{isEditing ? 'Edit Todo' : 'Add New Todo'}</h2>
          <TodoForm 
            onSubmit={isEditing 
              ? (data) => handleUpdateTodo(currentTodo.id, data) 
              : handleAddTodo}
            initialData={currentTodo}
            isEditing={isEditing}
            onCancel={handleCancelEdit}
          />
        </section>

        <section className="todo-page__list-section">
          <h2>My Todos</h2>
          {error && <div className="todo-page__error">{error}</div>}
          {loading && <div className="todo-page__loading">Loading...</div>}
          <TodoList 
            todos={todos} 
            onComplete={handleCompleteTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
          />
        </section>
      </main>
    </div>
  );
};

export default TodoPage;