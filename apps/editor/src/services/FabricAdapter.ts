import { fabric } from "fabric";

import editorStore from "../store/editor";

import applyObjectDefaults from "./object";
import Grid from "./Grid";

class FabricAdapter {
  canvas: fabric.Canvas;
  grid: Grid;

  constructor(canvasEl: HTMLCanvasElement) {
    this.canvas = new fabric.Canvas(canvasEl);

    this.grid = new Grid(this.canvas, 20);

    applyObjectDefaults(this.canvas);
  }

  enableGrid() {
    this.grid.enable();
  }

  disableGrid() {
    this.grid.disable();
  }

  addRect() {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 200,
      height: 200,
      fill: "transparent",
      stroke: "black",
      strokeWidth: 2,
    });

    this.canvas.add(rect);
  }
}

export default FabricAdapter;
