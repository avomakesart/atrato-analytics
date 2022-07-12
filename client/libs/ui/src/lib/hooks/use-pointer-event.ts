import {
  EventListenerWithPointInfo,
  getPointerEventName,
  wrapPointerEventHandler,
} from '../utils';
import { EventListenerEnv, useEventListener } from './use-event-listener';

/**
 * @internal
 */
export function usePointerEvent(
  env: EventListenerEnv,
  eventName: string,
  handler: EventListenerWithPointInfo,
  options?: AddEventListenerOptions
) {
  return useEventListener(
    getPointerEventName(eventName),
    wrapPointerEventHandler(handler, eventName === 'pointerdown'),
    env,
    options
  );
}
