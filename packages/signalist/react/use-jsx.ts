/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { effect, isSignal } from "../core";
import { bindingProps } from "./bind-props";

const signalElement = Symbol("signal.element");

// const ignoreTypes = new Set([If, For]);

const ignoreKeys = new Set([
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

const getChildrens = (children: any[]) => {
  let arrayDesp = false;
  const childs = flattenArray(children).map((child) => {
    if (isSignal(child)) {
      arrayDesp = true;
      return signalJSX(child());
    }
    return signalJSX(child);
  });
  return [childs, arrayDesp] as const;
};

// const isSSR = typeof window === "undefined";

export function signalJSX(tree: any) {
  if (!tree || tree._signalComponent) {
    return tree;
  }

  const { props, ref, ...rest } = tree;
  if (!props) {
    return tree;
  }
  if (typeof rest.type === "function") {
    return tree;
  }

  const isElement = typeof tree.type === "string";

  const nextProps = { ...props };

  const desp: any[] = [];
  let ele: Element | null;
  let nextRef: any = null;

  Object.keys(props).forEach((key) => {
    const v = props[key];
    if (v === null || v === void 0) {
      return;
    }
    if (ignoreKeys.has(key)) {
      return;
    }

    if (key === "children") {
      if (Array.isArray(v)) {
        const [children, arrayDesp] = getChildrens(v);
        if (arrayDesp) {
          desp.push(() => {
            const [childs] = getChildrens(v);
            bindingProps(ele, key, childs.join(""));
          });
        }
        nextProps.children = children;
        return;
      } else {
        if (isSignal(v)) {
          desp.push(() => {
            const nextValue = v();
            bindingProps(ele, key, nextValue);
          });

          const ch = v();
          if (isSignal(ch)) {
            nextProps.children = ch();
          } else {
            nextProps.children = v();
          }
        } else {
          nextProps.children = signalJSX(v);
        }
      }
    }

    if (isSignal(v)) {
      desp.push(() => {
        const nextValue = v();
        if (ele) {
          bindingProps(ele, key, nextValue);
        }
      });
      nextProps[key] = v();
    }
  });

  effect(() => {
    desp.forEach((fn) => fn());
  });

  if (isElement && desp.length) {
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
