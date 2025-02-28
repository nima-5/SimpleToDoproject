import React from 'react';
import ToDoCard from '../Card/ToDoCard';
import './TodoList.css';

const TodoList = ({ todos, onComplete, onDelete, onEdit }) => {
  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <p>No tasks yet. Start by adding a new task!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <ToDoCard
          key={todo.id}
          todo={todo}
          onComplete={onComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;