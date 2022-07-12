import React, { ReactNode } from 'react';
import cn from 'clsx';
import { useRouter } from 'next/router';
import { Avatar } from '../avatar';
import { PlusIcon } from '../icons';



export const UserListContainer = ({ children }: { children: ReactNode }) => (
  <ul className="py-4 sm:px-0 sm:pt-6 sm:pb-8 lg:py-4 xl:px-0 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-sm leading-6 dark:bg-slate-900/40">
    {children}
  </ul>
);

export const UserListAddButton = ({
  onMouseEnter,
  onMouseLeave,
}: {
  onMouseEnter: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const router = useRouter();
  return (
    <li className="flex">
      <div
        className="group w-full h-28 flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3 cursor-pointer hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 dark:border-slate-700 dark:text-slate-100 dark:hover:border-blue-500 dark:hover:bg-transparent dark:hover:text-blue-500"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={() => router.push('/user/create')}
      >
        <PlusIcon
          width="20"
          height="20"
          fill="currentColor"
          className="mb-1 text-slate-400 group-hover:text-blue-500"
        />
        AGREGAR CLIENTE
      </div>
    </li>
  );
};

interface UserListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client?: any;
  onMouseEnter?: React.MouseEventHandler<HTMLLIElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLLIElement>;
}

export const UserList: React.FC<UserListProps> = ({
  client,
  onMouseEnter,
  onMouseLeave,
}) => {
  const router = useRouter();

  return (
    <li
      key={client?.id}
      className={cn(
        'group cursor-pointer rounded-md p-3 h-28 bg-white ring-1 ring-slate-200 shadow-sm hover:bg-blue-500 hover:ring-blue-500 hover:shadow-md dark:bg-slate-700 dark:ring-0 dark:highlight-white/10 dark:hover:bg-blue-500',
        client?.id === client?.length - 1
          ? 'hidden sm:block lg:block xl:block'
          : ''
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => router.push(`/user/${client?.id}`)}
    >
      <dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
        <div>
          <dt className="sr-only">Nombre Completo</dt>
          <dd className="font-semibold text-slate-900 group-hover:text-white dark:text-slate-100">
            {client?.firstName} {client?.lastName}
          </dd>
        </div>
        <div>
          <dt className="sr-only">Category</dt>
          <dd className="group-hover:text-blue-200">{client?.email}</dd>
        </div>
        <div className="col-start-2 row-start-1 row-end-3 sm:mt-4 lg:mt-0 xl:mt-4">
          <dt className="sr-only">Users</dt>
          <dd className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-1.5">
            <Avatar
              name={`${client?.firstName} ${client?.lastName}`}
              size="1.8rem"
              fontSize="0.8rem"
            />
          </dd>
        </div>
      </dl>
    </li>
  );
};
