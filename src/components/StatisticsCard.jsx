import React from 'react';

/**
 * Reusable Statistics Card component
 */
const StatisticsCard = ({
  title,
  value,
  icon,
  color = 'blue',
  className = '',
  ...props
}) => {
  // Color configurations
  const colorConfig = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      text: 'text-blue-100',
      iconBg: 'bg-white/20',
    },
    green: {
      bg: 'bg-gradient-to-br from-green-500 to-green-600',
      text: 'text-green-100',
      iconBg: 'bg-white/20',
    },
    red: {
      bg: 'bg-gradient-to-br from-red-500 to-red-600',
      text: 'text-red-100',
      iconBg: 'bg-white/20',
    },
    indigo: {
      bg: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      text: 'text-indigo-100',
      iconBg: 'bg-white/20',
    },
  };

  const config = colorConfig[color] || colorConfig.blue;

  return (
    <div
      className={`${config.bg} p-4 rounded-2xl text-white shadow-lg ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`${config.text} text-sm font-medium`}>{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        {icon && (
          <div className={`w-12 h-12 ${config.iconBg} rounded-xl flex items-center justify-center`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsCard;
