import React from 'react';

/**
 * Reusable Button component with consistent styling and accessibility
 */
const Button = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  isLoading = false,
  ...props
}) => {
  // Base button classes
  const baseClasses = 'font-semibold rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 shadow-lg flex items-center justify-center space-x-3 cursor-pointer disabled:cursor-not-allowed';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-blue-300',
    secondary: 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 focus:ring-green-300',
    danger: 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 focus:ring-red-300',
    warning: 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white hover:from-yellow-700 hover:to-yellow-800 focus:ring-yellow-300',
    purple: 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 focus:ring-purple-300',
    disabled: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-4 text-lg',
    lg: 'px-8 py-6 text-xl',
  };

  // Combine classes
  const buttonClasses = [
    baseClasses,
    disabled || isLoading ? variantClasses.disabled : variantClasses[variant],
    sizeClasses[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={buttonClasses}
      style={{ cursor: disabled || isLoading ? 'not-allowed' : 'pointer' }}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
