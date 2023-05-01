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

Then, import the `SignalProvider` component from the library and wrap your application with it:

```jsx
import { SignalProvider } from "signalist";

function App() {
  return <SignalProvider>{/* Your app components */}</SignalProvider>;
}
```

Now, you can use the `useSignal` hook to create and subscribe to signals in your components:

```jsx
import { useSignal } from "signalist";

function MyComponent() {
  const [count, setCount] = useSignal(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## Compatibility

Signalist is designed to be fully compatible with the existing React ecosystem and components. You can use your favorite React libraries and tools, and still benefit from the performance improvements offered by Signalist.

## License

Signalist is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.

## Contributing

Contributions are welcome! See the [CONTRIBUTING](./CONTRIBUTING.md) file for more information.
