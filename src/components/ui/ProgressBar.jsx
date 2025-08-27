import React from 'react';

/**
 * Reusable Progress Bar component
 */
const ProgressBar = ({
  value,
  max = 100,
  size = 'md',
  color = 'blue',
  showLabel = true,
  label,
  className = '',
  ...props
}) => {
  // Calculate percentage
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  // Size classes
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };
  
  // Color classes
  const colorClasses = {
    blue: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    green: 'bg-gradient-to-r from-green-500 to-emerald-600',
    red: 'bg-gradient-to-r from-red-500 to-pink-600',
    yellow: 'bg-gradient-to-r from-yellow-500 to-orange-600',
    purple: 'bg-gradient-to-r from-purple-500 to-pink-600',
  };

  return (
    <div className={`w-full ${className}`} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {label || `${value}/${max}`}
          </span>
          <span className="text-sm font-bold text-gray-800">
            {percentage.toFixed(1)}%
          </span>
        </div>
      )}
      
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`h-full ${colorClasses[color]} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
