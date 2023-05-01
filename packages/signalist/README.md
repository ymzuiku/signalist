# Signalist

Signalist is a lightweight library for building React applications with a focus on performance and simplicity. With Signalist, you can enjoy the benefits of using signals to manage your state, just like you would with SolidJS. This allows you to build reactive user interfaces that only re-render when necessary, improving the performance of your application.

Signalist is fully compatible with the existing React ecosystem and components. You can use your favorite React libraries and tools, and still benefit from the performance improvements offered by Signalist.

## Features

- Signal-based state management for improved performance
- Only re-renders components when necessary
- Compatible with the existing React ecosystem and components
- Lightweight and easy to use

## Getting Started

To get started with Signalist, install it using npm:

```
npm install signalist
```

Now, you can use the `useSignal` hook to create and subscribe to signals in your components:

```jsx
import { useSignal, useJSX } from "signalist";

function MyComponent() {
  const count = useSignal(0);

  console.log("render once!");

  return useJSX(
    <div>
      <p>Count: {count}</p>
      <button onClick={() => count.value + 1}>Increment</button>
    </div>,
  );
}
```

## Compatibility

Signalist is designed to be fully compatible with the existing React ecosystem and components. You can use your favorite React libraries and tools, and still benefit from the performance improvements offered by Signalist.

## License

Signalist is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.

## Contributing

Contributions are welcome! See the [CONTRIBUTING](./CONTRIBUTING.md) file for more information.
