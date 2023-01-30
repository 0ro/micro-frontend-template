import logo from "./logo.svg";
import "ui/global.scss";
import useMainStore from "store";
import styles from "./App.module.scss";
import { Routes } from "project-constants";

import { Link } from "react-router-dom";

function App() {
  const count = useMainStore((state) => state.count);
  return (
    <div className={styles["App"]}>
      <header className={styles["App-header"]}>
        <h1>Remote {count}</h1>
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
        <Link to={Routes.Host}>Host</Link>
      </header>
    </div>
  );
}

export default App;
