import { useRef } from "react";
import { Signal, signal } from "..";

export function useSignal<T>(value: T): Signal<T> {
  return useRef(signal(value)).current;
}
