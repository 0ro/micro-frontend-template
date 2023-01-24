import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';

// @ts-ignore
const EditorApp = React.lazy(() => import('editor/App'));

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
        <EditorApp />
      </Suspense>
    </div>
  );
}

export default App;
