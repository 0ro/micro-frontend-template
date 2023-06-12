import Editor from "./components/Editor/Editor";
import Panel from "./components/Panel/Panel";

import styles from "./App.module.scss";

import "ui/global.scss";

function App() {
  return (
    <div className={styles.root}>
      <header>
        <h1>Editor</h1>
        <div className={styles.container}>
          <Editor />
          <Panel />
        </div>
      </header>
    </div>
  );
}

export default App;
