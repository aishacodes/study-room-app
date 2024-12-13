import { ButtonPropType } from '@/types';
import React from 'react';
import Spinner from './Spinner';

const Button = ({ children, loading, variant, ...props }: ButtonPropType) => {
  return (
    <button
      {...props}
      className={`w-32 py-1 font-medium rounded bg-primary text-white flex items-center justify-center gap-2 ${
        variant == 'destructive' ? 'bg-red-500 text-white' : ''
      } ${
        variant == 'outline'
          ? 'border border-gray-300 bg-white text-gray-600'
          : ''
      }`}
    >
      {children}{' '}
      {loading && (
        <Spinner
          size={16}
          color={variant !== 'outline' ? 'white' : 'currentColor'}
        />
      )}
    </button>
  );
};

export default Button;
