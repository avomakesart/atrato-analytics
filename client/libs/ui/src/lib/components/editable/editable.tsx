import cn from 'clsx';
import * as React from 'react';
import { createContext, forwardRef, runIfFn } from '../../utils';
import { MaybeRenderProp } from '../../utils/types';
import {
  useEditable,
  UseEditableProps,
  UseEditableReturn,
} from './use-editable';

type EditableContext = Omit<UseEditableReturn, 'htmlProps'>;

const [EditableProvider, useEditableContext] = createContext<EditableContext>({
  name: 'EditableContext',
  errorMessage:
    'useEditableContext: context is undefined. Seems you forgot to wrap the editable components in `<Editable />`',
});

type RenderProps = Pick<
  UseEditableReturn,
  'isEditing' | 'onSubmit' | 'onCancel' | 'onEdit'
>;

type BaseEditableProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'value' | 'defaultValue' | 'onSubmit'
>;

export interface EditableProps
  extends UseEditableProps,
    Omit<BaseEditableProps, 'children'> {
  children?: MaybeRenderProp<RenderProps>;
}

/**
 * Editable
 *
 * The wrapper that provides context and logic for all editable
 * components. It renders a `div`
 */
export const Editable = forwardRef<EditableProps, 'div'>((props, ref) => {
  const { htmlProps, ...context } = useEditable(props);

  const { isEditing, onSubmit, onCancel, onEdit } = context;

  const _className = cn('atrato-editable', props.className);

  const children = runIfFn(props.children, {
    isEditing,
    onSubmit,
    onCancel,
    onEdit,
  });

  return (
    <EditableProvider value={context}>
      <div
        ref={ref}
        {...(htmlProps as React.HTMLAttributes<HTMLDivElement>)}
        className={_className}
      >
        {children}
      </div>
    </EditableProvider>
  );
});

const commonStyles: React.CSSProperties = {
  fontSize: 'inherit',
  fontWeight: 'inherit',
  textAlign: 'inherit',
  background: 'transparent',
};

export type EditablePreviewProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * EditablePreview
 *
 * The `span` used to display the final value, in the `preview` mode
 */
export const EditablePreview = forwardRef<EditablePreviewProps, 'span'>(
  (props, ref) => {
    const { getPreviewProps } = useEditableContext();

    const previewProps = getPreviewProps(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      props as any,
      ref
    ) as React.HTMLAttributes<HTMLSpanElement>;
    const _className = cn('rounded-md py-[3px] transition duration-200', props.className);

    return (
      <span
        {...previewProps}
        style={{
          cursor: 'text',
          display: 'inline-block',
          ...commonStyles,
        }}
        className={_className}
      />
    );
  }
);

export type EditableInputProps = React.HTMLAttributes<HTMLInputElement>;

/**
 * EditableInput
 *
 * The input used in the `edit` mode
 */
export const EditableInput = forwardRef<EditableInputProps, 'input'>(
  (props, ref) => {
    const { getInputProps } = useEditableContext();

    const inputProps = getInputProps(props, ref);
    const _className = cn('outline-offset-2 rounded-md py-[3px] transition duration-200 w-full', props.className);

    return (
      <input
        {...inputProps}
        style={{
          outline: 0,
          ...commonStyles,
        }}
        className={_className}
      />
    );
  }
);

export type EditableTextareaProps = React.HTMLAttributes<HTMLTextAreaElement>;

/**
 * EditableTextarea
 *
 * The textarea used in the `edit` mode
 */
export const EditableTextarea = forwardRef<EditableTextareaProps, 'textarea'>(
  (props, ref) => {
    const { getTextareaProps } = useEditableContext();

    const textareaProps = getTextareaProps(props, ref);
    const _className = cn('outline-offset-2 rounded-md py-[3px] transition duration-200 w-full', props.className);

    return (
      <textarea
        {...textareaProps}
        style={{
          outline: 0,
          ...commonStyles,
        }}
        className={_className}
      />
    );
  }
);

/**
 * React hook use to gain access to the editable state and actions.
 */
export function useEditableState() {
  const { isEditing, onSubmit, onCancel, onEdit, isDisabled } =
    useEditableContext();

  return {
    isEditing,
    onSubmit,
    onCancel,
    onEdit,
    isDisabled,
  };
}

/**
 * React hook use to create controls for the editable component
 */
export function useEditableControls(): Pick<
  EditableContext,
  | 'isEditing'
  | 'getEditButtonProps'
  | 'getCancelButtonProps'
  | 'getSubmitButtonProps'
> {
  const {
    isEditing,
    getEditButtonProps,
    getCancelButtonProps,
    getSubmitButtonProps,
  } = useEditableContext();

  return {
    isEditing,
    getEditButtonProps,
    getCancelButtonProps,
    getSubmitButtonProps,
  };
}
