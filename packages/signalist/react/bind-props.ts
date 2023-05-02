/* eslint-disable @typescript-eslint/no-explicit-any */
const noAttr: Record<string, boolean> = {
  value: true,
  className: true,
};

export function bindingProps(ele: Element | null, key: string, nextValue: any) {
  if (!ele) {
    return;
  }
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
