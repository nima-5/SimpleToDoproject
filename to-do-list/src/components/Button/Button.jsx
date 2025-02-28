import React from 'react';
import './Button.css'; // You'll need to create this CSS file

/**
 * Reusable Button component
 * @param {string} variant - Button style variant (primary, secondary, danger, etc.)
 * @param {string} size - Button size (small, medium, large)
 * @param {boolean} isDisabled - Whether the button is disabled
 * @param {function} onClick - Click handler function
 * @param {ReactNode} children - Button content/text
 * @param {string} type - Button type (button, submit, reset)
 * @param {string} className - Additional CSS classes
 */
const Button = ({
  variant = 'primary',
  size = 'medium',
  isDisabled = false,
  onClick,
  children,
  type = 'button',
  className = '',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`button button--${variant} button--${size} ${className}`}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;