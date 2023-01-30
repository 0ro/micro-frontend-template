import "ui/global.scss";

import useStore from "store";
import { Link } from "react-router-dom";
import { Button } from "ui";
import { Routes } from "project-constants";

import logo from "./logo.svg";

import styles from "./App.module.scss";

function App() {
  const { count, increase } = useStore((state) => state);
  return (
    <div className="App">
      <header className={styles["App-header"]}>
        <h1>HOST</h1>
        <img src={logo} className={styles["App-logo"]} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={styles["App-link"]}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button onClick={() => increase(1)}>Boop {count}</Button>
        <div>Hello</div>
        <Link to={Routes.Remote}>Remote</Link>
      </header>
    </div>
  );
}

export default App;
