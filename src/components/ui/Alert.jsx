import React from 'react';

/**
 * Reusable Alert component for displaying messages
 */
const Alert = ({
  type = 'info',
  title,
  message,
  onClose,
  className = '',
  ...props
}) => {
  // Base alert classes
  const baseClasses = 'p-4 rounded-2xl border flex items-start space-x-3';
  
  // Type-specific classes
  const typeClasses = {
    success: 'bg-gradient-to-r from-green-50 to-green-100 border-green-200',
    error: 'bg-gradient-to-r from-red-50 to-red-100 border-red-200',
    warning: 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200',
    info: 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200',
  };
  
  // Icon configurations
  const iconConfig = {
    success: {
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-green-500',
      textColor: 'text-green-800',
    },
    error: {
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-red-500',
      textColor: 'text-red-800',
    },
    warning: {
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      bgColor: 'bg-yellow-500',
      textColor: 'text-yellow-800',
    },
    info: {
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-blue-500',
      textColor: 'text-blue-800',
    },
  };

  const config = iconConfig[type];
  
  // Combine classes
  const alertClasses = [
    baseClasses,
    typeClasses[type],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={alertClasses} {...props}>
      <div className={`w-8 h-8 ${config.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
        {config.icon}
      </div>
      
      <div className="flex-1">
        {title && (
          <p className={`font-medium ${config.textColor}`}>{title}</p>
        )}
        {message && (
          <p className={`text-sm ${config.textColor} ${title ? 'mt-1' : ''}`}>{message}</p>
        )}
      </div>
      
      {onClose && (
        <button
          onClick={onClose}
          className={`text-gray-400 hover:text-gray-600 transition-colors ${config.textColor}`}
          aria-label="Close alert"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;
