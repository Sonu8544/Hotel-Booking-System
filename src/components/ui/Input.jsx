import React from 'react';

/**
 * Reusable Input component with consistent styling and validation
 */
const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  required = false,
  min,
  max,
  className = '',
  icon,
  ...props
}) => {
  // Base input classes
  const baseClasses = 'w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-lg font-medium transition-all duration-300';
  
  // State-based classes
  const stateClasses = error
    ? 'border-red-300 focus:ring-4 focus:ring-red-300 focus:border-red-500'
    : 'border-gray-200 focus:ring-4 focus:ring-blue-300 focus:border-blue-500';
  
  // Disabled classes
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white';
  
  // Combine classes
  const inputClasses = [
    baseClasses,
    stateClasses,
    disabledClasses,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
          className={inputClasses}
          {...props}
        />
        
        {icon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
