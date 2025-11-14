import { create } from "zustand";


export const useMultiStepStore = create((set, get) => ({
  currentStep: 1,
  totalSteps: 6,
  next: () => {
    const { currentStep, totalSteps } = get();
    if (currentStep < totalSteps) set({ currentStep: currentStep + 1 });
  },
  back: () => {
    const { currentStep } = get();
    if (currentStep > 1) set({ currentStep: currentStep - 1 });
  },
  goTo: (step) => set({ currentStep: step }),
  reset: () => set({ currentStep: 1 }),
}));
