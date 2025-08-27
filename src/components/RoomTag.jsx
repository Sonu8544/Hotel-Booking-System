import React from 'react';

/**
 * Reusable Room Tag component for displaying room numbers
 */
const RoomTag = ({
  roomNumber,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'font-mono rounded-lg font-bold';
  
  // Variant classes
  const variantClasses = {
    default: 'bg-blue-500 text-white',
    selected: 'bg-green-500 text-white',
    booked: 'bg-blue-500 text-white',
    occupied: 'bg-red-500 text-white',
    available: 'bg-gray-500 text-white',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  // Combine classes
  const tagClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={tagClasses} {...props}>
      {roomNumber}
    </span>
  );
};

export default RoomTag;
