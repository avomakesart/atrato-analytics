import React from 'react';
import { forwardRef } from '../../utils';
import cn from 'clsx';

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl';
  weight?:
    | 'thin'
    | 'extralight'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black';
}

export const Text = forwardRef<TextProps, 'h2'>((props, ref) => {
  const { size = 'md', weight = 'normal', children, ...rest } = props;

  return (
    <p
      ref={ref}
      className={cn(
        `text-${size} font-${weight} dark:text-white`,
        props.className
      )}
      {...rest}
    >
      {children}
    </p>
  );
});
