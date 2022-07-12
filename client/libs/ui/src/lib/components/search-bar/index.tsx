import React from 'react';
import { forwardRef } from '../../utils';
import { InputProps } from '../input';

interface SearchBarProps extends InputProps {
  /**
   * Value to be filtered based on user input
   */
  filterText: string;
  /**
   * onChange function that handles the input
   * value.
   */
  onFilterTextChange: (value: string) => void;
}

export const SearchBar = forwardRef<SearchBarProps, 'input'>((props, ref) => {
  const { onFocus, onBlur, filterText, onFilterTextChange, placeholder } =
    props;
  return (
    <div className="group relative rounded-md w-full dark:bg-slate-700 dark:highlight-white/10 dark:focus-within:bg-transparent">
      <svg
        width="20"
        height="20"
        fill="currentColor"
        className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-1000 dark:text-slate-500"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        />
      </svg>
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
        type="text"
        aria-label="Filtrar clientes"
        placeholder={(placeholder && placeholder) || 'Filtrar clientes...'}
        className="appearance-none w-full text-base leading-6 bg-transparent text-slate-900 placeholder:text-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100 dark:placeholder:text-slate-500 dark:ring-0 dark:focus:ring-2"
        value={filterText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onFilterTextChange(e.target.value)
        }
        {...props}
      />
    </div>
  );
});
