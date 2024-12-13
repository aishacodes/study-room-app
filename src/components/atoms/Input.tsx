import { InputPropType } from '@/types';
import React from 'react';

const Input = ({ error, label, ...props }: InputPropType) => {
  return (
    <div className="w-full">
      <label className=" mb-1 flex items-center gap-1">
        {label}
        {props.required !== false ? (
          ''
        ) : (
          <span className="text-gray-400 text-xs italic">(optional)</span>
        )}
      </label>
      <input
        className="border px-3 py-2 rounded w-full outline-none"
        {...props}
      />
      <p className="text-red-500 mt-1 text-xs">{error}</p>
    </div>
  );
};

export default Input;
