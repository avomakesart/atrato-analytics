import * as React from 'react';
import { forwardRef } from '../../utils';
import {
  FormControlOptions,
  useFormControl,
  useFormControlContext,
} from '../form-control';
import cn from 'clsx';

interface InputOptions {
  /**
   * The border color when the input is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue.500"
   */
  focusBorderColor?: string;
  /**
   * The border color when the input is invalid. Use color keys in `theme.colors`
   * @example
   * errorBorderColor = "red.500"
   */
  errorBorderColor?: string;
  /**
   * The native HTML `size` attribute to be passed to the `input`
   */
  htmlSize?: number;
}

type Omitted = 'disabled' | 'required' | 'readOnly' | 'size';

export interface InputProps
  extends Omit<React.HTMLAttributes<HTMLInputElement>, Omitted>,
    InputOptions,
    FormControlOptions {}

/**
 * Input
 *
 * Element that allows users enter single valued data.
 */
export const Input = forwardRef<InputProps, 'input'>((props, ref) => {
  const { htmlSize, ...rest } = props;

  const input = useFormControl<HTMLInputElement>(rest);
  const { isInvalid } = useFormControlContext();
  //
  const _className = cn(
    `bg-inherit text-gray-900 rounded-md text-sm dark:bg-gray-700 block w-full p-2.5 ${
      isInvalid
        ? 'border-2 border-red-500 ring-red-500 focus:ring-red-500 focus:border-red-500 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500'
        : 'border border-gray-300 focus:ring-blue-1000 focus:border-blue-1000 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-1000 dark:focus:border-blue-1000'
    } `,
    props.className
  );

  return <input size={htmlSize} {...input} ref={ref} className={_className} />;
});
