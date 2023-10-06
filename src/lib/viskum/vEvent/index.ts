import { EventMap } from "./configuration";

type EventNames = keyof EventMap;

function listen<K extends EventNames>(ev: K, func: (e: CustomEvent<EventMap[K]>) => void, options?: AddEventListenerOptions): void {
  document.addEventListener(ev, ((e: CustomEvent<any>) => func(e as CustomEvent<EventMap[K]>)) as EventListener, options);
}

function dispatch<K extends EventNames>(ev: K, detail: EventMap[K]): void {
  const event = new CustomEvent(ev, { detail });
  document.dispatchEvent(event);
}

export const vEvent = {
  listen: listen,
  dispatch: dispatch,
};
