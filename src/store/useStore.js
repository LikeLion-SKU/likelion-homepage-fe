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

  answers: [],
  setAnswers: (newAnswers) =>
    set(() => ({
      answers: newAnswers,
    })),

  questions: [],
  setQuestions: (newQuestions) =>
    set(() => ({
      questions: newQuestions,
    })),
}));
