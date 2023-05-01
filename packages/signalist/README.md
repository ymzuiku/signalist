# Signalist

<img src="packages/example-spa/public/logo.png" style="margin: 10px auto; text-align:center; height:200px" />

> The meaning of the logo is that React is frozen.

> Everything in signalist is a poor imitation of solidjs applied to React.

## About Signalist

Signalist is a React library that allows for granular updates to elements at the attribute level, using the signal method to avoid full component re-renders.

Signalist focus on performance and simplicity. With Signalist, you can enjoy the benefits of using signals to manage your state, just like you would with SolidJS. This allows you to build reactive user interfaces that only re-render when necessary, improving the performance of your application.

Signalist improves performance by only updating the necessary attributes of the components, rather than re-rendering the entire component. This means that only the specific properties that need to be updated will be changed, resulting in faster and more efficient updates.

Signalist is fully compatible with the existing React ecosystem and components. You can use your favorite React libraries and tools, and still benefit from the performance improvements offered by Signalist.

## Benefits

- Signal-based state management for improved performance
- No re-renders components, only updating the necessary attributes of the components
- Compatible with the existing React ecosystem and components
- Supports SSR
- Supports Typescript
- Lightweight and easy to use

## Compatibility

Signalist is designed to be fully compatible with the existing React ecosystem and components. You can use your favorite React libraries and tools, and still benefit from the performance improvements offered by Signalist.

## Getting Started

To get started with Signalist, install it using npm:

```
npm install signalist
```

Now, you can use the `useSignal` hook to create and subscribe to signals in your components:

```tsx
import { useSignal, useJSX } from "signalist";

function MyComponent() {
  const count = useSignal<number>(0);

  console.log("render once!");

  // useJSX hooks, auto binding signal to elements
  return useJSX(
    <div>
      <p>Count: {count}</p>
      <button onClick={() => count.value + 1}>Increment</button>
    </div>,
  );
}
```

### APIs

### core api

- signal: create global signal object
- computed: use function subscribe some signals

### react hooks api

- useSignal: create signal in react component, useSignal is equal `useRef(signal("your value")).current`
- useJSX: binding react JSX to signal update DOM

### react component api

- If: Append or remove some element, when value signal change
- For: Use list data or list signal render a list elements

## Usage

### Signal in props

```tsx
import { useSignal, useJSX, Signal } from "signalist";

function PageA({ count }: { count: Signal<T> }) {
  // no rerender, only reset div element textcontent:
  return useJSX(<div>Count: {count}</div>);
}

function PageB({ count }: { count: Signal<T> }) {
  // no rerender
  return useJSX(<div onClick={() => (count.value += 1)}>update value</div>);
}

function MyComponent() {
  const count = useSignal<number>(0);
  // no rerender
  return useJSX(
    <div>
      <PageA count={count} />
      <PageB count={count} />
    </div>,
  );
}
```

### computed

Use `signal()` in `computed`, computed can auto subscribe signal change, and return a new value

```tsx
import { computed, useSignal, useJSX } from "signalist";

function MyComponent() {
  const count = useSignal<number>(0);

  // style is typeof Signal<CSSProperties>
  const style = computed<CSSProperties>(() => ({
    // text() can subscribe
    // text.value only read value
    fontSize: text().length + "px",
    color: "#00f",
  }));

  return useJSX(
    <div>
      <h2 style={style}>count: {count}</h2>
      <button onClick={() => (count.value += 1)}> add count</button>
    </div>,
  );
}
```

### signal

`signal` is a native JavaScript method that can be used anywhere, in any framework, to trigger updates directly in React. However, when using `signal` inside a React component, you should use `useSignal`, which is just a `useRef` wrapper around `signal`, to prevent signal loss caused by React's `setState`. If you're using `signalist` exclusively and have never used React's `setState`, you can even use `signal` instead of `useSignal` throughout your project.

```tsx
import { signal } from "signalist";

// Declare in Anywhere

const username = signal<string>("user-name");

// Other page component:
function PageA() {
  return useJSX(<div>User name: {username}</div>);
}

// Other page component:
function PageB() {
  return useJSX(<input onChange={(e) => (username.value += e.target.value)} />);
}
```

### Effect

Sure, here's a possible README file for your GitHub repository:

`effect` is a signal subscription function that collects any `signal()` calls used within it, and re-executes the effect whenever the signals mutate. If you only want to retrieve the value of a signal without subscribing to it, you can use `signal.value`, which only reads the value without subscribing.

```jsx
import React from "react";
import { signal } from "signalist";
import Effect from "@signalist/effect";

function MyComponent(props) {
  const [count, setCount] = React.useState(0);

  // Subscribe to the count signal and log its value
  effect(() => {
    console.log(signal(count));
  });

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

In this example, the `effect` function subscribes to the `count` signal and logs its value whenever it changes. Whenever the `count` state is updated, the `effect` function will re-execute and log the new value of the `count` signal.

Using `effect` can simplify the process of subscribing to signals and executing code when they mutate. It provides a simple and intuitive syntax for handling signal subscriptions, making it easier to write efficient and performant React components.

### Effect + component + global signal example:

```tsx
import { signal, effect } from "signalist";

const userInfo = signal();

// Other page component:
function PageA() {
  effect(async () => {
    const data = fetch("/api/user-info?name" + username()).then((v) => v.json());
    userInfo.value = data;
  });
  return useJSX(<div>User name: {username}</div>);
}

// Other page component:
function PageB() {
  const email = computed(() => userInfo().email);

  return useJSX(
    <div>
      <input onChange={(e) => (username.value += e.target.value)} />
      <div>{email}</div>
    </div>,
  );
}
```

### If component

> Because without `re-render`, you can only do this.

The If component is a React component that serves as a replacement for the ternary operator in React. It allows you to conditionally render components based on a boolean expression, without having to resort to a ternary operator.
To use the If component, import it into your React component and use it as follows:

```ts
import { computed, useSignal, useJSX } from "signalist";
function MyComponent() {
  const show = useSignal<boolean>(false);
  // no rerender
  return useJSX(
    <div>
      <button onClick={() => (show.value = !show.value)}>Change show</button>
      <If value={show}>
        <div>ok, i maby show</div>
      </If>
    </div>,
  );
}
```

### For component

> Because without `re-render`, you can only do this.

# For Component

The `For` component is a React component that serves as a replacement for the `map()` function in React. It allows you to easily render a list of components based on an array of data, without having to manually iterate over the array and return a list of components.

In this example, the `For` component is used to render a list of items based on an array of data. The `each` prop specifies the array of data to iterate over, and the children of the `For` component are a function that takes two arguments: the item from the array and its index. The function returns the component to be rendered for each item in the array.

```ts
import { computed, useSignal, useJSX } from "signalist";
function MyComponent() {
  const list = useSignal([]);
  // no rerender
  return useJSX(
    <div>
      <input
        onChange={(e) => {
          list.value = [...list.value, e.target.value];
        }}
      >
        Change show
      </input>
      <For each={(list, index)}>{(item) => <div key={index}>{item}</div>}</For>
    </div>,
  );
}
```

#### For component props

The `For` component accepts the following props:

- `each`: An array of data to iterate over.
- `children`: A function that takes two arguments: the item from the array and its index. The function returns the element or component to be rendered for each item in the array.

### With react state, useEffect

You may not need this use case, but it does work. Signalist is designed to cater to gradual migration of legacy React projects, hence its flexibility in accommodating various use cases.

You can use react main api:

```tsx
import { useState } from "react";
import { computed, useSignal, useJSX } from "signalist";

function MyComponent() {
  const [state, setState] = useState(0);
  const count = useSignal<number>(0);

  useEffect(() => {
    console.log("I mount");
    () => {
      console.log("I unmount");
    };
  }, []);

  return useJSX(
    <div>
      <button onClick={() => setState(state + 1)}> add react state</button>
      <h2 style={style}>count: {count}</h2>
      <button onClick={() => (count.value += 1)}> add count</button>
    </div>,
  );
}
```

## signalStorage

Sure! Here's a possible README.md for the `signalStorage` component written entirely in English:

# signalStorage

`signalStorage` is a React component that can automatically persist state to local storage and supports secure SSR hydration. To ensure successful SSR hydration, it's use the `useInitStorage` hook in conjunction.

First, use the `useInitStorage` hooks at the root component of your application:

```jsx
import { useInitStorage } from 'signalist';

const

function App() {
  useInitStorage();
  return (
    <div>
      {/* your app */}
    </div>
  );
}
```

Then, you can use the `signalStorage` hook in any component that needs to persist state, signalStorage will automatically persist to localhost, and will be reloaded after useInitStorage is executed:

```jsx
import { signalStorage } from "signalist";

// auto load
const clicks = signalStorage("clicks", "");

function Counter() {
  return (
    <div>
      <p>Count: {clicks}</p>
      {/* auto save in change */}
      <button onClick={() => (clicks.value += 1)}>Increment</button>
    </div>
  );
}
```

## License

Signalist is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.

## Contributing

Contributions are welcome! See the [CONTRIBUTING](./CONTRIBUTING.md) file for more information.
