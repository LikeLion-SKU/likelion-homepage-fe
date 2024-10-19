import { create } from 'zustand';

export const useStore = create((set) => ({
  answer: [[], [], []],
  setAnswer: (newAnswer, index, step) =>
    set((state) => ({
      answer: state.answer.map((stepAnswers, stepIndex) =>
        stepIndex === step
          ? stepAnswers.map((ans, answerIndex) =>
              answerIndex === index ? newAnswer : ans
            )
          : stepAnswers
      ),
    })),
  tep: 1,
  setStep: (nextStep) =>
    set(() => ({
      step: nextStep,
    })),
}));
