/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useState } from "react";
import { EmptyArray, Signal, effect } from "../core";

export function For<T>({
  each,
  children,
}: {
  each: (() => T[]) | Signal<T[]>;
  children: (item: T, index: number) => JSX.Element;
}) {
  const [list, setList] = useState(each());
  useLayoutEffect(() => {
    effect(() => {
      setList(each());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, EmptyArray);

  if (list && list.length) {
    return list.map(children) as any;
  }
  return null;
}
