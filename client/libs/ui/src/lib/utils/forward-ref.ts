/**
 * All credit goes to Chance (Reach UI), Haz (Reakit) and (fluentui)
 * for creating the base type definitions upon which I improved on
 */
import * as React from 'react';
import { As, ComponentWithAs, PropsOf, RightJoinProps } from './types';

export function forwardRef<Props extends object, Component extends As>(
  component: React.ForwardRefRenderFunction<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    RightJoinProps<PropsOf<Component>, Props> & {
      as?: As;
    }
  >
) {
  return React.forwardRef(component) as unknown as ComponentWithAs<
    Component,
    Props
  >;
}
