import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './ToDoForm.css';

/**
 * TodoForm component for creating and editing todo items
 * 
 * @param {function} onSubmit - Function to handle form submission 
 * @param {Object} initialData - Initial todo data for editing (null for new todo)
 * @param {boolean} isEditing - Whether the form is in edit mode
 * @param {function} onCancel - Function to handle cancellation of editing
 */
const ToDoForm = ({ onSubmit, initialData = null, isEditing = false, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isCompleted: false
  });

  const [errors, setErrors] = useState({});

  // Initialize form with data when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        isCompleted: initialData.isCompleted || false
      });
    } else {
      // Reset form when not editing
      setFormData({
        title: '',
        description: '',
        isCompleted: false
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
      
      // Only reset if not editing
      if (!isEditing) {
        setFormData({
          title: '',
          description: '',
          isCompleted: false
        });
      }
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form__group">
        <label htmlFor="title" className="todo-form__label">
          Title <span className="todo-form__required">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`todo-form__input ${errors.title ? 'todo-form__input--error' : ''}`}
          placeholder="What needs to be done?"
        />
        {errors.title && <div className="todo-form__error">{errors.title}</div>}
      </div>

      <div className="todo-form__group">
        <label htmlFor="description" className="todo-form__label">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="todo-form__textarea"
          placeholder="Add details (optional)"
          rows={4}
        />
      </div>

      <div className="todo-form__group todo-form__checkbox-group">
        <input
          type="checkbox"
          id="isCompleted"
          name="isCompleted"
          checked={formData.isCompleted}
          onChange={handleChange}
          className="todo-form__checkbox"
        />
        <label htmlFor="isCompleted" className="todo-form__checkbox-label">
          Mark as completed
        </label>
      </div>

      <div className="todo-form__actions">
        <Button type="submit" variant="primary">
          {isEditing ? 'Update Task' : 'Add Task'}
        </Button>
        
        {isEditing && (
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default ToDoForm;