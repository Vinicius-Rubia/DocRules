import { create } from "zustand";

interface FlowState {
  accessKey: string;
  setAccessKey: (accessKey: string) => void;
}

export const useFlowStore = create<FlowState>((set) => ({
  accessKey: "",
  setAccessKey: (accessKey) => set({ accessKey }),
}));
