import React, { Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
const RemoteApp = React.lazy(() => import("remote/App"));

function App() {
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
      </header>
      <Suspense fallback="...">
        <RemoteApp />
      </Suspense>
    </div>
  );
}

export default App;
