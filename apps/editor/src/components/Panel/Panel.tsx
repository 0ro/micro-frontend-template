import { useEffect } from "react";

import editorStore from "../../store/editor";

import styles from "./Panel.module.scss";

const Panel = () => {
  const {
    ready,
    hasGrid,
    enableGrid: showGrid,
    disableGrid: hideGrid,
    addRect,
  } = editorStore();

  // NOTE: need to call it only once to initialize the grid from the store
  useEffect(() => {
    if (ready) {
      if (hasGrid) {
        showGrid();
      } else {
        hideGrid();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const handleHasGridChange: React.ChangeEventHandler<HTMLInputElement> = (
    ev
  ) => {
    const target = ev.target as HTMLInputElement;

    if (target.checked) {
      showGrid();
    } else {
      hideGrid();
    }
  };

  const addRectHandler = () => {
    addRect();
  };
  return (
    <div className={styles.root}>
      <label>
        <span>Add grid</span>
        <input
          type="checkbox"
          checked={hasGrid}
          onChange={handleHasGridChange}
        />
      </label>
      <button onClick={addRectHandler}>Add rect</button>
    </div>
  );
};

export default Panel;
