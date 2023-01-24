import React, { Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "ui";
import useStore from "store";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
const RemoteApp = React.lazy(() => import("remote/App"));

function App() {
  const { count, increase } = useStore((state) => state);
  return (
    <div className="App">
      <header className="App-header">
        <h1>HOST</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button />
        <button onClick={() => increase(1)}>Boop {count}</button>
      </header>
      <Suspense fallback="...">
        <RemoteApp />
      </Suspense>
    </div>
  );
}

export default App;
