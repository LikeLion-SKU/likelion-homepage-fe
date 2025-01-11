import { create } from 'zustand';

export const useStore = create((set) => ({
  step: 1,
  setStep: (nextStep) =>
    set(() => ({
      step: nextStep,
    })),

  track: '',
  setTrack: (newTrack) =>
    set(() => ({
      track: newTrack,
    })),
}));
