import * as React from 'react';
import cn from 'clsx';

export const ArrowIcon = React.memo<
  JSX.IntrinsicElements['svg'] & {
    displayDirection: 'up' | 'down' | 'left' | 'right';
  }
>(function ArrowIcon({ className, displayDirection, ...rest }) {
  const arrowDirection = () => {
    if (displayDirection === 'down') return 'M17 13l-5 5m0 0l-5-5m5 5V6';
    if (displayDirection === 'left') return 'M11 17l-5-5m0 0l5-5m-5 5h12';
    if (displayDirection === 'right') return 'M13 7l5 5m0 0l-5 5m5-5H';
    if (displayDirection === 'up') return 'M7 11l5-5m0 0l5 5m-5-5v12';
    return 'M17 13l-5 5m0 0l-5-5m5 5V6';
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-6 w-6', className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={arrowDirection()} />
    </svg>
  );
});

ArrowIcon.displayName = 'ArrowIcon';
