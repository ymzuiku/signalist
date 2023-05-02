/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { EmptyArray, Signal, effect } from "../core";
import { signalJSX } from "./use-jsx";

export function For<T>({
  each,
  children,
}: {
  each: (() => T[]) | Signal<T[]>;
  children: (item: T, index: number) => JSX.Element;
}) {
  const [list, setList] = useState<any[]>(each());
  useMemo(() => {
    effect(() => {
      setList(each());
    });
  }, EmptyArray);

  if (list && list.length) {
    return signalJSX(<>{list.map(children)}</>);
  }
  return null;
}
