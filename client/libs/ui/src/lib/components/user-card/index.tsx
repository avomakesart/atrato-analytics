/* eslint-disable jsx-a11y/anchor-is-valid */
import cn from 'clsx';
import React, { ReactNode } from 'react';
import { Avatar } from '../avatar';
import { UseEditableReturn } from '../editable';
import { FormControl } from '../form-control';
import { Input } from '../input';
import { Text } from '../text';
import dayjs from 'dayjs';
import { ChangeEvent } from 'react';

type User = {
  id: string | number;
  firstName: string;
  secondName?: string;
  lastName: string;
  secondLastName?: string;
  pictureUrl?: string;
  email: string;
  birthDate: string;
  phone: string;
  assignedAnalyst?: string;
};

export type CardInfo = {
  fullName?: string;
  cardNumber?: string;
  cvv?: number;
  pin?: number;
  exp?: string;
};

interface UserCardProps extends Pick<UseEditableReturn, 'isEditing'> {
  user: User;
  cardDetails: CardInfo[];
  actions?: ReactNode;
  footer?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UserField = ({
  title,
  field,
  className,
  isEditing,
  onFieldChange,
  name,
  isReadOnly,
  type = 'text',
}: {
  title?: string;
  field?: string | number;
  className?: string;
  isEditing?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  isReadOnly?: boolean;
  onFieldChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className={cn('flex flex-col items-start', className)}>
    <span className="uppercase text-gray-400">{title}</span>
    {isEditing ? (
      <FormControl isReadOnly={isReadOnly}>
        <Input
          className="text-base w-full max-w-[18rem]"
          name={name}
          type={type}
          value={field}
          onChange={onFieldChange}
        />
      </FormControl>
    ) : (
      <span className="text-gray-800 dark:text-slate-500">{field}</span>
    )}
  </div>
);

export const UserCard: React.FC<UserCardProps> = ({
  user,
  cardDetails,
  actions,
  footer,
  onChange,
  isEditing,
}) => {
  console.log(onChange);
  return (
    <div className="p-4 w-full max-w-[60rem] text-center bg-gray-50 rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-start lg:items-center mb-8 lg:ml-1">
        <div className="flex items-center">
          <div className="hidden lg:flex mr-7">
            {(user.pictureUrl && (
              <img
                src={user.pictureUrl}
                alt={`user-${user.firstName.toLowerCase()}`}
                className="h-16 w-16 rounded-full"
              />
            )) || (
              <Avatar name={`${user.firstName} ${user.lastName}`} size="4rem" />
            )}
          </div>
          <div className="flex flex-col items-start">
            {isEditing ? (
              <div className="flex">
                <FormControl>
                  <Input
                    className="w-18 lg:w-28 p-0 text-2xl md:text-4xl font-bold text-blue-900 font-sans"
                    name="firstName"
                    value={user.firstName}
                    onChange={onChange}
                  />
                </FormControl>

                <FormControl>
                  <Input
                    className={`w-24 lg:w-32 p-0 text-2xl md:text-4xl font-bold text-blue-900 font-sans`}
                    placeholder="Segundo nombre"
                    name="secondName"
                    value={user.secondName}
                    onChange={onChange}
                  />
                </FormControl>

                <FormControl>
                  <Input
                    className="w-24 lg:w-32 p-0 text-2xl md:text-4xl font-bold text-blue-900 font-sans"
                    name="lastName"
                    value={user.lastName}
                    onChange={onChange}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    className="w-28 lg:w-40 p-0 text-2xl md:text-4xl font-bold text-blue-900 font-sans"
                    name="secondLastName"
                    value={user.secondLastName}
                    onChange={onChange}
                  />
                </FormControl>
              </div>
            ) : (
              <h5 className="mb-2 text-2xl md:text-4xl font-bold text-blue-900 font-sans dark:text-white">
                {user.firstName} {user.secondName} {user.lastName}{' '}
                {user.secondLastName}
              </h5>
            )}
            <Text size="sm" className="text-gray-400">
              ID: {user.id}
            </Text>
          </div>
        </div>
        <div>{actions}</div>
      </div>
      <div className="flex items-start">
        <div className="flex flex-col w-full lg:border-r-2 lg:border-gray-200 lg:pb-14 lg:pl-24 md:mr-12 justify-end space-y-4 sm:space-y-4">
          <UserField
            title="Mail"
            isEditing={isEditing}
            field={user.email}
            name="email"
            type="email"
            onFieldChange={onChange}
          />
          <UserField
            title="Fecha de nacimiento"
            isEditing={isEditing}
            field={user.birthDate}
            name="birthDate"
            type="date"
            onFieldChange={onChange}
          />
          <UserField
            title="Teléfono"
            isEditing={isEditing}
            field={user.phone}
            name="phone"
            type="tel"
            onFieldChange={onChange}
          />
          <UserField title="Analista Asignado" field={user.assignedAnalyst} />
        </div>

        <div className="hidden lg:flex w-full max-w-[17rem] text-center bg-gray-200 rounded-lg ml-auto">
          <div className="flex flex-col items-start px-8 py-10 break-all w-full justify-end space-y-4 sm:space-y-9">
            <UserField
              title="Full Name"
              field={`${user.firstName} ${user.lastName} ${user.secondLastName}`}
              isReadOnly
            />
            {cardDetails?.map((card) => (
              <React.Fragment>
                <UserField title="Card Number" field={card.cardNumber} />
                <div className="flex justify-between space-x-10">
                  <UserField title="CVV" field={card.cvv} />
                  <UserField title="PIN" field={card.pin} />
                  <UserField
                    title="EXP"
                    field={dayjs(card.exp).format('MM/YY')}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      {footer && (
        <div className="flex pt-10 justify-start lg:justify-end">{footer}</div>
      )}
    </div>
  );
};
