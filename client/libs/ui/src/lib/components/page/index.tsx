import React from 'react';
import cn from 'clsx';

type PageProps = React.HTMLAttributes<HTMLDivElement>;

export const Page: React.FC<PageProps> = (props) => {
  const { className, children } = props;

  return (
    <main>
      <div className={cn('container mx-auto py-6 sm:px-6 lg:px-8', className)}>
        <div className="px-4 py-6 sm:px-0">{children}</div>
      </div>
    </main>
  );
};
