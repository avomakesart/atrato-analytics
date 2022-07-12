import * as React from 'react';
import { forwardRef } from '../../utils';
import { useFormControlContext } from './form-control';
import cn from 'clsx';

export interface FormLabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  /**
   * @type React.ReactElement
   */
  requiredIndicator?: React.ReactElement;
  /**
   * @type React.ReactNode
   */
  optionalIndicator?: React.ReactNode;
}

/**
 * Used to enhance the usability of form controls.
 *
 * It is used to inform users as to what information
 * is requested for a form field.
 *
 * ♿️ Accessibility: Every form field should have a form label.
 */
export const FormLabel = forwardRef<FormLabelProps, 'label'>(
  (passedProps, ref) => {
    const props = passedProps;

    const {
      className,
      children,
      requiredIndicator = <RequiredIndicator />,
      optionalIndicator = null,
      ...rest
    } = props;

    const field = useFormControlContext();
    const ownProps = field?.getLabelProps(rest, ref) ?? { ref, ...rest };

    return (
      <label
        {...ownProps}
        className={cn('block text-start text-base mr-3 mb-2 font-medium transition duration-200 opacity-100', props.className)}
        style={{
          display: 'block',
          textAlign: 'start',
        }}
      >
        {children}
        {field?.isRequired ? requiredIndicator : optionalIndicator}
      </label>
    );
  }
);

export type RequiredIndicatorProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * Used to show a "required" text or an asterisks (*) to indicate that
 * a field is required.
 */
export const RequiredIndicator = forwardRef<RequiredIndicatorProps, 'span'>(
  (props, ref) => {
    const field = useFormControlContext();
    if (!field?.isRequired) return null;

    const className = cn('ml-1 text-red-500', props.className);

    return (
      <span
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...field?.getRequiredIndicatorProps(props as any, ref)}
        className={className}
      />
    );
  }
);
