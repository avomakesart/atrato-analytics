import React from 'react';
import { forwardRef } from '../../utils';
import cn from 'clsx';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
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

export const Heading = forwardRef<HeadingProps, 'h2'>((props, ref) => {
  const { className, size = '4xl', weight = 'bold', children, ...rest } = props;
/*dark:text-white*/
  return (
    <h2
      ref={ref}
      className={cn(
        `${size ? `text-${size}` : 'text-4xl'} ${
          weight ? `font-${weight}` : 'font-bold'
        } `,
        className
      )}
      {...rest}
    >
      {children}
    </h2>
  );
});
