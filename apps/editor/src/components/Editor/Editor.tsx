import { useEffect, useRef } from "react";

import editorStore from "../../store/editor";

import styles from "./Editor.module.scss";

const Editor = () => {
  const { init } = editorStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      init(canvasRef.current);
    }
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      width="1200"
      height="1200"
    />
  );
};

export default Editor;
