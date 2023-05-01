/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { EmptyArray, Signal, effect, signal } from "../core";

function localStorageGet(key: string) {
  if (typeof window === "undefined") {
    return void 0;
  }
  const v = localStorage.getItem(key);
  if (!v) {
    return void 0;
  }
  try {
    return JSON.parse(v).j;
  } catch (e) {
    return void 0;
  }
}
function localStorageSet(key: string, value: any) {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(key, JSON.stringify({ j: value }));
}

const storageList: any[] = [];
let inited = 0;

export function signalStorage<T>(key: string, value: T): Signal<T> {
  const cache = signal(value);
  storageList.push({
    signal: cache,
    key,
  });
  effect(() => {
    const value = cache();
    if (inited) {
      if (inited === 2) {
        localStorageSet(key, value);
      }
      if (inited === 1) {
        inited = 2;
      }
    }
  });
  return cache;
}

export function useInitStorage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      inited = 1;
      storageList.forEach((v) => {
        const value = localStorageGet(v.key);

        v.signal.value = value === void 0 ? v.signal.value : value;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, EmptyArray);
}
