/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { effect, isSignal } from "../core";

const signalElement = Symbol("signal.element");

const IgnoreKeys = new Set([
  "$$typeof",
  "key",
  "ref",
  "_owner",
  "_store",
  "_self",
  "_source",
  "_signal",
  "_signalComponent",
]);

const noAttr: Record<string, boolean> = {
  value: true,
  className: true,
};

function bindingProps(ele: Element, key: string, nextValue: any) {
  if (key === "children") {
    ele.textContent = nextValue;
  } else if (key === "value") {
    requestAnimationFrame(() => {
      (ele as any).value = nextValue;
    });
  } else if (key === "style") {
    Object.assign((ele as any).style, nextValue);
  } else if (noAttr[key]) {
    (ele as any)[key] = nextValue;
  } else if (typeof nextValue === "string" || typeof nextValue === "number") {
    ele.setAttribute(key, nextValue as string);
  } else if (typeof nextValue === "boolean") {
    if (nextValue) {
      ele.setAttribute(key, "");
    } else {
      ele.removeAttribute(key);
    }
  } else {
    (ele as any)[key] = nextValue;
  }
}

function flattenArray(arr: any[]): any[] {
  let result: any[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flattenArray(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

export function signalJSX(tree: any) {
  if (!tree || tree._signalComponent) {
    return tree;
  }

  const { props, ref, ...rest } = tree;

  // TODO: need fix other type
  if (typeof tree.type !== "string") {
    return tree;
  }

  const nextProps = {} as any;

  const desp: any[] = [];
  let ele: Element | null;

  Object.keys(props).forEach((key) => {
    const v = props[key];
    if (IgnoreKeys.has(key)) {
      nextProps[key] = v;
      return;
    }

    if (isSignal(v)) {
      desp.push(() => {
        const nextValue = v();
        if (ele) {
          bindingProps(ele, key, nextValue);
        }
      });
      nextProps[key] = v();

      return;
    }

    if (key === "children" && Array.isArray(v)) {
      let arrayDesp = false;
      const children = flattenArray(v).map((child) => {
        if (isSignal(child)) {
          arrayDesp = true;
          return signalJSX(child());
        }
        return signalJSX(child);
      });
      if (arrayDesp) {
        desp.push(() => {
          const texts = flattenArray(v)
            .map((child) => signalJSX(isSignal(child) ? child() : child))
            .join("");
          if (ele) {
            ele.textContent = texts;
          }
        });
      }
      nextProps[key] = children;
      return;
    }

    nextProps[key] = v;
  });

  effect(() => {
    desp.forEach((fn) => fn());
  });

  let nextRef = null;
  if (desp.length) {
    nextRef = (r: Element) => {
      ele = r;
      ref && ref(r);
    };
  }

  return {
    _signalComponent: signalElement,
    props: nextProps,
    ref: nextRef || ref,
    ...rest,
  };
}
