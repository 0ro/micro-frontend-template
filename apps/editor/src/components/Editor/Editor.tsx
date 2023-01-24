import { useLayoutEffect, useRef } from "react";
import Mediator from "../../services/mediator";

import styles from "./Editor.module.scss";

const Editor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    if (canvasRef.current) {
      Mediator.initCanvas(canvasRef.current);
    }
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.editor}>
        <canvas className={styles.canvas} ref={canvasRef} />
      </div>
      <div className={styles.toolPanel}>
        <button
          onClick={() => {
            Mediator.addRect({
              top: 100,
              left: 50,
              width: 100,
              height: 100,
              fill: "green",
            });
          }}
        >
          Add Rect
        </button>
      </div>
    </div>
  );
};

export default Editor;
