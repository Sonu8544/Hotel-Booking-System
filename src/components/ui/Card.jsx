import React from 'react';

/**
 * Reusable Card component with consistent styling
 */
const Card = ({
  children,
  className = '',
  variant = 'default',
  padding = 'lg',
  ...props
}) => {
  // Base card classes
  const baseClasses = 'rounded-3xl shadow-xl border border-white/20 backdrop-blur-sm';
  
  // Variant classes
  const variantClasses = {
    default: 'bg-gradient-to-br from-white via-gray-50 to-slate-100',
    blue: 'bg-gradient-to-br from-white via-blue-50 to-indigo-50',
    green: 'bg-gradient-to-br from-white via-green-50 to-emerald-50',
    purple: 'bg-gradient-to-br from-white via-purple-50 to-pink-50',
    indigo: 'bg-gradient-to-br from-white via-indigo-50 to-purple-50',
  };
  
  // Padding classes
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  // Combine classes
  const cardClasses = [
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;
