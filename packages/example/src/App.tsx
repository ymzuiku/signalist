import { CSSProperties, useState } from "react";
import { For, If, Signal, computed, signal, useJSX, useSignal } from "signalist";
import "./App.css";

const store = signal<string>("");

const RenderProps = function ({
  value,
  children,
}: {
  value: Signal<string>;
  children: (value: Signal<string>) => React.ReactNode;
}) {
  const v = computed(() => value() + Date.now());
  return useJSX(
    <div>
      <div>Render props component last render time: {new Date().toISOString()}</div>
      <div>global store: {store}</div>
      <div>value: {useJSX(children(v))}</div>
    </div>,
  );
};

const Sub = ({ value }: { value: Signal<number> }) => {
  const count = useSignal(0);

  const num = useSignal("string value");

  return useJSX(
    <div>
      <h2>Sub component</h2>
      <div>Sub component last render time: {new Date().toISOString()}</div>
      <div>Props value: {value}</div>
      <div>
        <button onClick={() => (count.value += 1)}>now sub count:{count}</button>
        <button onClick={() => (num.value += 1)}>now sub num: {num}</button>
        <RenderProps value={num}>{(v) => <div>world: {v}</div>}</RenderProps>
      </div>
    </div>,
  );
};

const Counter = () => {
  const [state, setState] = useState(0);
  const count = useSignal<number>(0);
  const text = useSignal<string>("");
  const num = useSignal<number>(0);
  const list = useSignal<string[]>([]);
  const style = computed<CSSProperties>(() => ({
    fontSize: text().length + "px",
  }));

  const handleOnChange = (e: { target: HTMLInputElement }) => {
    const value = e.target.value;
    text.value = value;
    count.value = value.length;
    if (value.length > 5) {
      list.value = [...list.value, value];
    } else if (value.length === 0) {
      list.value = [];
    } else {
      list.value.pop();
    }
  };

  return useJSX(
    <div className="card">
      <div>Counter component last render time: {new Date().toISOString()}</div>
      <main style={{ display: "flex", flexDirection: "column" }}>
        <div style={style}>{text}</div>
        <h2>Double bind</h2>
        <div>Text length reset count</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input value={text} onChange={handleOnChange} />
          <input value={text} onChange={handleOnChange} />
        </div>
        <div>
          <button onClick={() => (count.value += 1)}>add count: {count}</button>
          <button onClick={() => (count.value -= 1)}>sub count: {count}</button>
          <button onClick={() => (num.value += 1)}>add num: {num}</button>
          <button onClick={() => (num.value -= 1)}>sub num: {num}</button>
        </div>
        <h2>If count less 5, show {`<Sub />`}</h2>
        <If value={() => count() < 5}>
          <Sub value={num} />
        </If>
        <If value={() => count() >= 5}>
          <h2>
            Count {`>`} 5, {`<Sub />`} is remove
          </h2>
        </If>
      </main>
      <h2>
        If change input text, add list item, if input text is {`""`}, clean list, now list length:{" "}
        {computed(() => list().length)}
      </h2>
      <For each={list}>{(item, index) => <div key={index}>{item}listlist</div>}</For>
      <h2>Global store signal</h2>
      <input
        value={store}
        onChange={(e) => {
          store.value = e.target.value;
        }}
      />
      <div>
        <button onClick={() => setState(state + 1)}>react useState, update all components, state : {state}</button>
      </div>
    </div>,
  );
};

const App = () => {
  return useJSX(
    <>
      <div>
        <a target="_blank">
          <img style={{ height: "300px" }} src="/logo.png" className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Signalist = React + Signal</h1>
      <div>App last render time: {new Date().toISOString()}</div>
      <Counter />
    </>,
  );
};

export default App;
