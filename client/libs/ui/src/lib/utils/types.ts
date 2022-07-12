/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { ElementType } from 'react';

export type OmitCommonProps<
  Target,
  OmitAdditionalProps extends keyof any = never
> = Omit<Target, 'transition' | 'as' | 'color' | OmitAdditionalProps>;

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type RightJoinProps<
  SourceProps extends object = {},
  OverrideProps extends object = {}
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

export type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = {},
  AsComponent extends As = As
> = RightJoinProps<ComponentProps, AdditionalProps> &
  RightJoinProps<AsProps, AdditionalProps> & {
    as?: AsComponent;
  };

export type Dict<T = any> = Record<string, T>;

export type As<Props = any> = React.ElementType<Props>;

/**
 * Extract the props of a React element or component
 */
export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

export type ComponentWithAs<Component extends As, Props extends object = {}> = {
  <AsComponent extends As = Component>(
    props: MergeWithAs<
      React.ComponentProps<Component>,
      React.ComponentProps<AsComponent>,
      Props,
      AsComponent
    >
  ): JSX.Element;

  displayName?: string;
  propTypes?: React.WeakValidationMap<any>;
  contextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<any>;
  id?: string;
};

/**
 * Returns the type inferred by a promise's return value.
 *
 * @example
 * async function getThing() {
 *   // return type is a number
 *   let result: number = await fetchValueSomewhere();
 *   return result;
 * }
 *
 * type Thing = ThenArg<ReturnType<typeof getThing>>;
 * // number
 */
export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export type LiteralUnion<T extends U, U extends any = string> =
  | T
  | (U & { _?: never });

export type AnyFunction<T = any> = (...args: T[]) => any;

export type Booleanish = boolean | 'true' | 'false';
export type StringOrNumber = string | number;

export type MaybeRenderProp<P> =
  | React.ReactNode
  | ((props: P) => React.ReactNode)

type WithoutStyleAttr<T> = Omit<T, "color" | "width" | "height">

export type HTMLProps<T = any> = WithoutStyleAttr<React.HTMLAttributes<T>> &
  React.RefAttributes<T>

export type PropGetterV2<T extends ElementType, P = {}> = (
  props?: WithoutStyleAttr<React.ComponentPropsWithoutRef<T>> & P,
  ref?: React.Ref<any> | React.RefObject<any>,
) => WithoutStyleAttr<React.ComponentPropsWithRef<T>>

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AtratoComponent<T extends As, P = {}>
  extends ComponentWithAs<T, any & P> {}

export type EventKeys =
  | 'ArrowDown'
  | 'ArrowUp'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Enter'
  | 'Space'
  | 'Tab'
  | 'Backspace'
  | 'Control'
  | 'Meta'
  | 'Home'
  | 'End'
  | 'PageDown'
  | 'PageUp'
  | 'Delete'
  | 'Escape'
  | ' '
  | 'Shift';

export type EventKeyMap = Partial<
  Record<EventKeys, React.KeyboardEventHandler>
>;
