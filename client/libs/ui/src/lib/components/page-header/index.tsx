import React, { ReactNode } from 'react';
import cn from 'clsx';

interface PageHeaderProps {
  heading?: ReactNode;
  actions?: ReactNode | ReactNode[];
  direction?: React.CSSProperties['flexDirection'];
  mobileDirection?: React.CSSProperties['flexDirection'];
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  containerClassName?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  heading,
  actions,
  direction,
  mobileDirection,
  align,
  justify,
  containerClassName,
}) => {
  return (
    <div
      className={cn(
        `flex ${mobileDirection ? `flex-${mobileDirection}` : 'flex-col'} ${
          direction ? `md:flex-${direction}` : 'md:flex-row'
        } lg:items-center lg:justify-between`,
        { [`items-${align}`]: align },
        { [`justify-${justify}`]: justify },
        containerClassName
      )}
    >
      <div className="flex-1 min-w-0">{heading}</div>
      <div className="mt-4 md:mt-0"> {actions}</div>
    </div>
  );
};
