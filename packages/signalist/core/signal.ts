/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { context } from "./effect";

export type Signal<T> = T &
  // use signal.value = newValue to update the value
  (() => T) & {
    value: T;
  };

export function isSignal(v: any) {
  return typeof v === "function" && v.__signal;
}

export function signal<T>(value: T): Signal<T> {
  const subscribers = new Set<Function>();
  const _read = () => {
    const current = context[context.length - 1];
    if (current) {
      subscribers.add(current);
    }
    return _read.value;
  };
  _read.value = value;
  _read.__signal = true;

  const read = new Proxy(_read, {
    set: function (target, prop, nextValue) {
      if (prop === "value") {
        target.value = nextValue;
        for (const sub of subscribers) {
          sub();
        }
      }
      return true;
    },
  });

  return read as any;
}

export type SignalFn<T> = T & (() => T);

export function computed<T>(fn: () => T): Signal<T> {
  const signal = () => {
    signal.value = fn();
    return signal.value;
  };
  signal.value = fn();
  signal.__signal = true;
  return signal as any;
}
