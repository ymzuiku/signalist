/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useState } from "react";
import { EmptyArray, effect } from "../core";

export function If({
  value: signal,
  children,
}: {
  value: () => any;
  children: any;
}) {
  const [show, setShow] = useState(!!signal());
  useLayoutEffect(() => {
    effect(() => {
      setShow(!!signal());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, EmptyArray);

  return show ? children : null;
}
