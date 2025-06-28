import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  let spinnerSizeClass;
  switch (size) {
    case 'sm':
      spinnerSizeClass = 'w-5 h-5';
      break;
    case 'md':
      spinnerSizeClass = 'w-8 h-8';
      break;
    case 'lg':
      spinnerSizeClass = 'w-12 h-12';
      break;
    default:
      spinnerSizeClass = 'w-8 h-8';
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-4 border-t-4 border-blue-500 border-t-transparent ${spinnerSizeClass}`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;