import { fabric } from "fabric";

class Mediator {
  canvas: fabric.Canvas | null = null;

  initCanvas(canvasEl: HTMLCanvasElement) {
    // singleton
    if (this.canvas) {
      return this.canvas;
    }

    this.canvas = new fabric.Canvas(canvasEl, {
      width: 600,
      height: 600,
    });

    this.canvas.on("object:added", () => {
      console.log("object:added");
    });
    this.canvas.on("selection:created", () => {
      console.log("selection");
    });

    return this.canvas;
  }

  addRect(options: fabric.IRectOptions) {
    const rect = new fabric.Rect(options);

    console.log(rect);

    this.canvas?.add(rect);
    this.canvas?.renderAll();
  }
}

export default new Mediator();
