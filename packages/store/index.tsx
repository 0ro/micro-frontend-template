import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface MainState {
  count: number;
  increase: (by: number) => void;
}

const useMainStore = create<MainState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increase: (by) => set((state) => ({ count: state.count + by })),
      }),
      {
        name: "main-store",
      }
    )
  )
);

export default useMainStore;
