/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { EmptyArray, effect } from "../core";
import { signalJSX } from "./signal-jsx";

export function If({ value, children }: { value: () => any; children: any }) {
  const [show, setShow] = useState(!!value());
  useMemo(() => {
    if (typeof value === "function") {
      effect(() => {
        setShow(value());
      });
    }
  }, EmptyArray);

  const signalChildren = useMemo(() => signalJSX(children), [EmptyArray]);
  return show ? signalChildren : null;
}
