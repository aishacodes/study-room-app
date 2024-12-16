import { ButtonPropType } from '@/types';
import React from 'react';
import Spinner from './Spinner';
import clsx from 'clsx';

const Button = ({
  children,
  loading,
  variant,
  className,
  ...props
}: ButtonPropType) => {
  return (
    <button
      {...props}
      className={clsx(
        'min-w-32 px-2 py-1 font-medium rounded bg-primary flex items-center justify-center gap-2',
        variant !== 'outline' && ' text-white',
        variant == 'destructive' && 'bg-red-500 ',
        variant == 'outline' && 'border border-gray-300 bg-white text-gray-600',
        className
      )}
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
