import { IEvent } from "fabric/fabric-impl";

class Grid {
  constructor(
    private readonly canvas: fabric.Canvas,
    private readonly size: number
  ) {}

  enable() {
    this.#addGrid();
    this.#addStickness();

    this.canvas.renderAll();
  }

  disable() {
    this.#removeGrid();
    this.#removeStickness();

    this.canvas.renderAll();
  }

  #renderGrid() {
    const ctx = this.canvas.getContext();
    ctx.save();

    // horizontal lines
    for (let i = 0; i < (this.canvas.height || 0) / this.size; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * this.size);
      ctx.strokeStyle = "rgba(0,0,0,0.1)";
      ctx.lineWidth = 1;
      ctx.lineTo(this.canvas.width || 0, i * this.size);
      ctx.stroke();
    }
    // vertical lines
    for (let i = 0; i < (this.canvas.width || 0) / this.size; i++) {
      ctx.beginPath();
      ctx.moveTo(i * this.size, 0);
      ctx.strokeStyle = "rgba(0,0,0,0.1)";
      ctx.lineWidth = 1;
      ctx.lineTo(i * this.size, this.canvas?.height || 0);
      ctx.stroke();
    }

    ctx.restore();
  }

  #unsubscribeRender: (() => void) | null = null;
  #unsubscribeSticky: ((e: IEvent<Event>) => void) | null = null;

  #addGrid() {
    this.#unsubscribeRender = this.#renderGrid.bind(this);

    this.canvas.on("before:render", this.#unsubscribeRender);
  }

  #removeGrid() {
    if (this.#unsubscribeRender) {
      this.canvas.off("before:render", this.#unsubscribeRender);
    }
  }

  #handleStickness(e: IEvent<Event>) {
    const obj = e.target;
    if (obj?.left && obj?.top) {
      obj.set({
        left: Math.round(obj.left / this.size) * this.size,
        top: Math.round(obj.top / this.size) * this.size,
      });
    }
  }

  #addStickness() {
    this.#unsubscribeSticky = this.#handleStickness.bind(this);
    this.canvas.on("object:moving", this.#unsubscribeSticky);
  }

  #removeStickness() {
    if (this.#unsubscribeSticky) {
      this.canvas.off("object:moving", this.#unsubscribeSticky);
    }
  }
}

export default Grid;
