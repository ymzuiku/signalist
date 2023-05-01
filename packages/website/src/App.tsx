import { CSSProperties, useState } from "react";
import { For, If, Signal, computed, useJSX, useSignal } from "signalist";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function Hello({ value, children }: { value: string; children: (value: string) => React.ReactNode }) {
  return <div>{children(value + Date.now())}</div>;
}

const World = function ({
  value,
  children,
}: {
  value: Signal<string>;
  children: (value: Signal<string>) => React.ReactNode;
}) {
  const v = computed(() => value() + Date.now());
  return <div>{useJSX(children(v))}</div>;
};

const Sub = ({ value }: { value: Signal<number> }) => {
  const count = useSignal(0);

  const num = useSignal("aaaa");

  return useJSX(
    <div className="card">
      <div>sub: {value}</div>
      <div>
        <button onClick={() => (count.value += 1)}>{count}</button>
        <button onClick={() => (num.value += 1)}>{computed(() => "count is" + num())}</button>
        <button onClick={() => (num.value += 1)}>{computed(() => "count is" + num())}</button>
        <Hello value={num()}>{(v) => <div>hello: {v}</div>}</Hello>
        <World value={num}>{(v) => <div>world: {v}</div>}</World>
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

  return useJSX(
    <div className="card">
      <main>
        <button onClick={() => setState(state + 1)}>{state}</button>
        <div style={style}>bbbbbbbbbbbcccccccccccc</div>
        <input
          ref={(r) => {
            console.log("in-app-ref", r);
          }}
          value={text}
          onChange={(e) => {
            console.log("--debug--", text.value, e.target.value);
            setTimeout(() => {
              console.log("--debug--vv", text.value);
            }, 0);
            text.value = e.target.value;
          }}
        />
        <input
          value={text}
          onChange={(e) => {
            const value = (e.target as HTMLInputElement).value;
            text.value = value;
            count.value = value.length;
            if (value.length > 5) {
              list.value = [...list.value, value];
            } else if (value.length === 0) {
              list.value = [];
            } else {
              list.value.pop();
            }
          }}
        />
        <button onClick={() => (count.value += 1)}>{count}</button>
        <button onClick={() => (num.value += 1)}>{num}</button>
        <If value={() => count() < 5}>
          <Sub value={num} />
          <div>aaaaaaa</div>
        </If>
        <For each={list}>{(item, index) => <div key={index}>{item}listlist</div>}</For>
      </main>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>,
  );
};

const App = () => {
  return useJSX(
    <>
      <div>
        <a target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Counter />
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>,
  );
};

export default App;
