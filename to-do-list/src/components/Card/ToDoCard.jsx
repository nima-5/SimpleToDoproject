import React from 'react';
import Button from '../Button/Button';
import './ToDoCard.css';

/**
 * ToDoCard component for displaying individual todo items
 * 
 * @param {Object} todo - The todo item object
 * @param {function} onComplete - Function to mark todo as complete/incomplete
 * @param {function} onDelete - Function to delete the todo
 * @param {function} onEdit - Function to edit the todo
 */
const ToDoCard = ({ todo, onComplete, onDelete, onEdit }) => {
  const { id, title, description, isCompleted, createdAt, updatedAt } = todo;

  // Format dates for display
  const formattedCreatedAt = new Date(createdAt).toLocaleDateString();
  const formattedUpdatedAt = new Date(updatedAt).toLocaleDateString();

  return (
    <div className={`todo-card ${isCompleted ? 'todo-card--completed' : ''}`}>
      <div className="todo-card__header">
        <h3 className="todo-card__title">{title}</h3>
        <div className="todo-card__status">
          <input 
            type="checkbox" 
            checked={isCompleted} 
            onChange={() => onComplete(id, !isCompleted)}
            id={`todo-${id}-checkbox`}
            className="todo-card__checkbox"
          />
          <label htmlFor={`todo-${id}-checkbox`}>
            {isCompleted ? 'Completed' : 'Active'}
          </label>
        </div>
      </div>
      
      {description && (
        <div className="todo-card__description">
          <p>{description}</p>
        </div>
      )}
      
      <div className="todo-card__dates">
        <span>Created: {formattedCreatedAt}</span>
        {updatedAt && updatedAt !== createdAt && (
          <span>Updated: {formattedUpdatedAt}</span>
        )}
      </div>
      
      <div className="todo-card__actions">
        <Button 
          variant="secondary" 
          size="small" 
          onClick={() => onEdit(todo)}
        >
          Edit
        </Button>
        <Button 
          variant="danger" 
          size="small" 
          onClick={() => onDelete(id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ToDoCard;