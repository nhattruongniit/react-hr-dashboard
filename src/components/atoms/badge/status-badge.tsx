import React from 'react'

interface StatusBadgeProps extends React.PropsWithChildren{
  status?:  'working' | 'on leave' | 'resigned' | 'suspended' | string;
}

function StatusBadge({ status = 'working', children }: StatusBadgeProps) {
  let variant = 'default';

  switch (status) {
    case 'working':
      variant = 'green';
      break;
    case 'on leave':
      variant = 'yellow';
      break;
    case 'resigned':
      variant = 'red';
      break;
    case 'suspended':
      variant = 'purple';
      break;
  }

  const variantClasses: any = {
    default: 'bg-blue-100 text-blue-800 dark:text-blue-400 border border-blue-400',
    red: 'bg-red-100 text-red-800 dark:text-red-400 border border-red-400',
    green: 'bg-green-100 text-green-800 dark:text-green-400 border border-green-400',
    yellow: 'bg-yellow-100 text-yellow-800 dark:text-yellow-400 border border-yellow-400',
    purple: 'bg-purple-100 text-purple-800 dark:text-purple-400 border border-purple-400',
    indigo: 'bg-indigo-100 text-indigo-800 dark:text-indigo-400 border border-indigo-400',
    pink: 'bg-pink-100 text-pink-800 dark:text-pink-400 border border-pink-400',
    dark: 'bg-gray-100 text-gray-800 dark:text-gray-400 border border-gray-400',
  }
  
  return (
    <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 ${variantClasses[variant]}`}>
      {children}
    </span>
  )
}

export default StatusBadge