import React, { ReactNode } from 'react';
import { forwardRef } from '../../utils';
import cn from 'clsx';
import { LoadingIcon } from '../icons/loading-icon';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  colorScheme?:
    | 'default'
    | 'alternative'
    | 'dark'
    | 'light'
    | 'green'
    | 'red'
    | 'yellow'
    | 'purple';
  shape?: 'square' | 'pill';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconSpaceLeft?: string;
  iconSpaceRight?: string;
  isLoading?: boolean;
}

export const Button = forwardRef<ButtonProps, 'button'>((props, ref) => {
  const {
    colorScheme = 'default',
    shape,
    type = 'button',
    leftIcon,
    rightIcon,
    isLoading,
    iconSpaceLeft,
    iconSpaceRight,
    className,
    children,
    ...rest
  } = props;

  const buttonShape = shape === 'pill' ? 'rounded-full' : 'rounded-lg';
  const hasIcon =
    leftIcon || rightIcon || isLoading ? 'inline-flex items-center' : ' ';

  const classes = cn(
    {
      [`text-white bg-blue-1000 ${hasIcon} hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium ${buttonShape} text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`]:
        colorScheme === 'default',
    },
    {
      [`py-2.5 px-5 mr-2 mb-2 ${hasIcon} text-sm font-medium text-gray-900 focus:outline-none bg-white ${buttonShape} border border-gray-200 hover:bg-gray-100 hover:text-blue-1000 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`]:
        colorScheme === 'alternative',
    },
    {
      [`text-white bg-gray-800 ${hasIcon} hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium ${buttonShape} text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`]:
        colorScheme === 'dark',
    },
    {
      [`text-gray-900 bg-white ${hasIcon} border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium ${buttonShape} text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`]:
        colorScheme === 'light',
    },
    {
      [`text-white bg-green-700 ${hasIcon} hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium ${buttonShape} text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`]:
        colorScheme === 'green',
    },
    {
      [`text-white bg-red-700 ${hasIcon} hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium ${buttonShape} text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`]:
        colorScheme === 'red',
    },
    {
      [`text-white bg-yellow-400 ${hasIcon} hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium ${buttonShape} text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900`]:
        colorScheme === 'yellow',
    },
    {
      [`text-white bg-purple-700 ${hasIcon} hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium ${buttonShape} text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900`]:
        colorScheme === 'purple',
    },
    className
  );

  const renderLeftIcon = () => {
    if (isLoading) return <LoadingIcon />;
    if (leftIcon && !isLoading)
      return (
        <span
          className={cn(
            `${iconSpaceRight ? `mr-${iconSpaceRight}` : 'mr-2'} -ml-1`
          )}
        >
          {leftIcon}
        </span>
      );
    return;
  };

  const renderRightIcon = () => {
    if (rightIcon && !isLoading)
      return (
        <span
          className={cn(
            `${iconSpaceLeft ? `ml-${iconSpaceLeft}` : 'ml-2'} -mr-1`
          )}
        >
          {rightIcon}
        </span>
      );
    return;
  };

  return (
    <button
      type={type}
      disabled={isLoading}
      className={classes}
      ref={ref}
      {...rest}
    >
      {renderLeftIcon()}
      {children}
      {renderRightIcon()}
    </button>
  );
});
