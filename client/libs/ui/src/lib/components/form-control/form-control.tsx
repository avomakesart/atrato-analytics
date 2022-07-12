import cn from 'clsx';
import React from 'react';
import { useBoolean, useId } from '../../hooks';
import {
  createContext,
  dataAttr,
  forwardRef,
  isBrowser,
  mergeRefs,
  PropGetter,
  PropGetterV2,
} from '../../utils';

export interface FormControlOptions {
  /**
   * If `true`, the form control will be required. This has 2 side effects:
   * - The `FormLabel` will show a required indicator
   * - The form element (e.g, Input) will have `aria-required` set to `true`
   */
  isRequired?: boolean;
  /**
   * If `true`, the form control will be disabled. This has 2 side effects:
   * - The `FormLabel` will have `data-disabled` attribute
   * - The form element (e.g, Input) will be disabled
   */
  isDisabled?: boolean;
  /**
   * If `true`, the form control will be invalid. This has 2 side effects:
   * - The `FormLabel` and `FormErrorIcon` will have `data-invalid` set to `true`
   * - The form element (e.g, Input) will have `aria-invalid` set to `true`
   */
  isInvalid?: boolean;
  /**
   * If `true`, the form control will be readonly
   */
  isReadOnly?: boolean;
}

interface FormControlContext extends FormControlOptions {
  /**
   * The label text used to inform users as to what information is
   * requested for a text field.
   */
  label?: string;
  /**
   * The custom `id` to use for the form control. This is passed directly to the form element (e.g, Input).
   * - The form element (e.g. Input) gets the `id`
   * - The form label id: `form-label-${id}`
   * - The form error text id: `form-error-text-${id}`
   * - The form helper text id: `form-helper-text-${id}`
   */
  id?: string;
}

type FormControlProviderContext = Omit<
  ReturnType<typeof useFormControlProvider>,
  'getRootProps' | 'htmlProps'
>;

const [FormControlProvider, useFormControlContext] =
  createContext<FormControlProviderContext>({
    strict: false,
    name: 'FormControlContext',
  });

export { useFormControlContext };

function useFormControlProvider(props: FormControlContext) {
  const {
    id: idProp,
    isRequired,
    isInvalid,
    isDisabled,
    isReadOnly,
    ...htmlProps
  } = props;

  // Generate all the required ids
  const uuid = useId();
  const id = idProp || `field-${uuid}`;

  const labelId = `${id}-label`;
  const feedbackId = `${id}-feedback`;
  const helpTextId = `${id}-helptext`;

  /**
   * Track whether the `FormErrorMessage` has been rendered.
   * We use this to append its id the `aria-describedby` of the `input`.
   */
  const [hasFeedbackText, setHasFeedbackText] = React.useState(false);

  /**
   * Track whether the `FormHelperText` has been rendered.
   * We use this to append its id the `aria-describedby` of the `input`.
   */
  const [hasHelpText, setHasHelpText] = React.useState(false);

  // Track whether the form element (e.g, `input`) has focus.
  const [isFocused, setFocus] = useBoolean();

  const getHelpTextProps = React.useCallback<PropGetter>(
    (props = {}, forwardedRef = null) => ({
      id: helpTextId,
      ...props,
      /**
       * Notify the field context when the help text is rendered on screen,
       * so we can apply the correct `aria-describedby` to the field (e.g. input, textarea).
       */
      ref: mergeRefs(forwardedRef, (node) => {
        if (!node) return;
        setHasHelpText(true);
      }),
    }),
    [helpTextId]
  );

  const getLabelProps = React.useCallback<PropGetterV2<'label'>>(
    (props = {}, forwardedRef = null) => ({
      ...props,
      ref: forwardedRef,
      'data-focus': isBrowser && dataAttr && dataAttr(isFocused),
      'data-disabled':isBrowser && dataAttr && dataAttr(isDisabled),
      'data-invalid': isBrowser && dataAttr &&dataAttr(isInvalid),
      'data-readonly':isBrowser && dataAttr && dataAttr(isReadOnly),
      id: props.id ?? labelId,
      htmlFor: props.htmlFor ?? id,
    }),
    [id, isDisabled, isFocused, isInvalid, isReadOnly, labelId]
  );

  const getErrorMessageProps = React.useCallback<PropGetter>(
    (props = {}, forwardedRef = null) => ({
      id: feedbackId,
      ...props,
      /**
       * Notify the field context when the error message is rendered on screen,
       * so we can apply the correct `aria-describedby` to the field (e.g. input, textarea).
       */
      ref: mergeRefs(forwardedRef, (node) => {
        if (!node) return;
        setHasFeedbackText(true);
      }),
      'aria-live': 'polite',
    }),
    [feedbackId]
  );

  const getRootProps = React.useCallback<PropGetterV2<'div'>>(
    (props = {}, forwardedRef = null) => ({
      ...props,
      ...htmlProps,
      ref: forwardedRef,
      role: 'group',
    }),
    [htmlProps]
  );

  const getRequiredIndicatorProps = React.useCallback<PropGetter>(
    (props = {}, forwardedRef = null) => ({
      ...props,
      ref: forwardedRef,
      role: 'presentation',
      'aria-hidden': true,
      children: props.children || '*',
    }),
    []
  );

  return {
    isRequired: !!isRequired,
    isInvalid: !!isInvalid,
    isReadOnly: !!isReadOnly,
    isDisabled: !!isDisabled,
    isFocused: !!isFocused,
    onFocus: setFocus.on,
    onBlur: setFocus.off,
    hasFeedbackText,
    setHasFeedbackText,
    hasHelpText,
    setHasHelpText,
    id,
    labelId,
    feedbackId,
    helpTextId,
    htmlProps,
    getHelpTextProps,
    getErrorMessageProps,
    getRootProps,
    getLabelProps,
    getRequiredIndicatorProps,
  };
}

export interface FormControlProps
  extends React.HTMLAttributes<HTMLDivElement>,
    FormControlContext {}

/**
 * FormControl provides context such as
 * `isInvalid`, `isDisabled`, and `isRequired` to form elements.
 *
 * This is commonly used in form elements such as `input`,
 * `select`, `textarea`, etc.
 */
export const FormControl = forwardRef<FormControlProps, 'div'>((props, ref) => {
  const {
    getRootProps,
    htmlProps: _,
    ...context
  } = useFormControlProvider(props);

  const className = cn('w-full relative', props.className);

  return (
    <FormControlProvider value={context}>
      <div {...getRootProps({}, ref)} className={className} />
    </FormControlProvider>
  );
});

export type HelpTextProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * FormHelperText
 *
 * Assistive component that conveys additional guidance
 * about the field, such as how it will be used and what
 * types in values should be provided.
 */
export const FormHelperText = forwardRef<HelpTextProps, 'div'>((props, ref) => {
  const field = useFormControlContext();
  const className = cn(
    'mt-2 text-gray-500 leading-normal text-sm',
    props.className
  );
  return (
    <div
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...field?.getHelpTextProps(props as any, ref)}
      className={className}
    />
  );
});
