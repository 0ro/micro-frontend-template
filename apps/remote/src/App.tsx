import logo from "./logo.svg";
import "./App.css";
import useMainStore from "store";

function App() {
  const count = useMainStore((state) => state.count);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Remote {count}</h1>
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
    </div>
  );
}

export default App;
