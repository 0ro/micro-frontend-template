import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import FabricAdapter from "../services/FabricAdapter";

export interface EditorState {
  init: (canvasEl: HTMLCanvasElement) => void;
  enableGrid: () => void;
  disableGrid: () => void;
  addRect: () => void;
  hasGrid: boolean;
  ready: boolean;
  adapter: FabricAdapter | null;
}

const editorStore = create<EditorState>()(
  devtools(
    persist(
      (set, get) => ({
        adapter: null,
        hasGrid: false,
        ready: false,
        init(canvasEl) {
          if (!get().adapter) {
            set({
              adapter: new FabricAdapter(canvasEl),
              ready: true,
            });
          }
        },
        enableGrid() {
          get().adapter?.enableGrid();
          set({
            hasGrid: true,
          });
        },
        disableGrid() {
          get().adapter?.disableGrid();
          set({
            hasGrid: false,
          });
        },
        addRect() {
          get().adapter?.addRect();
        },
      }),
      {
        name: "editor-store",
        partialize: (state) => {
          return {
            ...state,
            adapter: null,
            ready: false,
          };
        },
      }
    )
  )
);

export default editorStore;
