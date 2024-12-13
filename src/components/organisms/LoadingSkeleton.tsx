import React from 'react';

const LoadingSkeleton = ({ type }: { type: 'card' }) => {
  return (
    <div>
      {type === 'card' ? (
        <div className="w-72 bg-secondary p-4 rounded-lg border border-gray-300 shadow-sm animate-pulse">
          <div>
            <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-1 w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-10 bg-gray-200 rounded w-20"></div>
            <div className="h-10 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LoadingSkeleton;
