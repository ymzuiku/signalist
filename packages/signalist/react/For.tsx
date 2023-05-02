/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef, useState } from "react";
import { EmptyArray, Signal, effect } from "../core";
import { signalJSX } from "./signal-jsx";

export function For<T>({
  each,
  children,
}: {
  each: (() => T[]) | Signal<T[]>;
  children: (item: T, index: number) => JSX.Element;
}) {
  const [list, setList] = useState<any[]>(each());
  const keys = useRef<any>({});
  useMemo(() => {
    effect(() => {
      setList(each());
    });
  }, EmptyArray);

  if (list && list.length) {
    return list.map(children).map((v, index) => {
      const key = v.key || index;
      const old = keys.current[key];
      if (old) {
        return old;
      }
      keys.current[key] = signalJSX(v);
      return keys.current[key];
    });
  }
}
