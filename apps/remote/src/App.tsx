import { Routes } from "project-constants";
import { Link } from "react-router-dom";
import useMainStore from "store";

import logo from "./logo.svg";

import styles from "./App.module.scss";
import "ui/global.scss";

function App() {
  const count = useMainStore((state) => state.count);
  return (
    <div className={styles["app"]}>
      <header className={styles["app-header"]}>
        <h1>Remote {count}</h1>
        <img src={logo} className={styles["app-logo"]} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={styles["app-link"]}
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
