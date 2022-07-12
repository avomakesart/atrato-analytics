/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import * as React from 'react';

/**
 * Well basically these utils are based on
 * typescript generics, generics are great
 * for reusable functions and cool utils.
 */

type FunctionArguments<T extends Function> = T extends (...args: infer R) => any
  ? R
  : never;

function callAllHandlers<T extends (event: any) => void>(
  ...fns: (T | undefined)[]
) {
  return function func(event: FunctionArguments<T>[0]) {
    fns.some((fn) => {
      fn?.(event);
      return event?.defaultPrevented;
    });
  };
}

const isFunction = (value: any): value is Function =>
  typeof value === 'function';

type ReactRef<T> =
  | React.Ref<T>
  | React.RefObject<T>
  | React.MutableRefObject<T>;

function assignRef<T = any>(ref: ReactRef<T> | undefined, value: T) {
  if (ref == null) return;

  if (isFunction(ref)) {
    ref(value);
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ref.current = value;
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
}

/**
 * Combine multiple React refs into a single ref function.
 * This is used mostly when you need to allow consumers forward refs to
 * internal components
 *
 * @param refs refs to assign to value to
 */
function mergeRefs<T>(...refs: (ReactRef<T> | undefined)[]) {
  return (node: T | null) => {
    refs.forEach((ref) => assignRef(ref, node));
  };
}

type Merge<T, P> = P & Omit<T, keyof P>;

type PropGetter<T extends HTMLElement = any, P = {}> = (
  props?: Merge<React.HTMLProps<T>, P>,
  ref?: React.Ref<any> | React.RefObject<any>
) => Merge<React.HTMLProps<T>, P>;

function canUseDOM(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

const isBrowser = canUseDOM();

export type { PropGetter, Merge, ReactRef, FunctionArguments };

export {
  mergeRefs,
  assignRef,
  isFunction,
  callAllHandlers,
  canUseDOM,
  isBrowser,
};
