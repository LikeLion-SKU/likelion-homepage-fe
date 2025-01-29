import { createContext, useContext, useState } from 'react';

import { questionParts } from '@/constants/questionParts';

const QuestionsContext = createContext(null);

export default function QuestionsProvider({ children }) {
  const [selectedPart, setSelectedPart] = useState(questionParts[0].part);
  const [questions, setQuestions] = useState({
    commonQuestions: [
      {
        id: `${Date.now()}-${Math.random()}`,
        content: '',
      },
    ],
    pmQuestions: [
      {
        id: `${Date.now()}-${Math.random()}`,
        content: '',
      },
    ],
    designQuestions: [
      {
        id: `${Date.now()}-${Math.random()}`,
        content: '',
      },
    ],
    frontEndQuestions: [
      {
        id: `${Date.now()}-${Math.random()}`,
        content: '',
      },
    ],
    backEndQuestions: [
      {
        id: `${Date.now()}-${Math.random()}`,
        content: '',
      },
    ],
  });

  function createNewQuestion() {
    const newQuestion = {
      id: `${Date.now()}-${Math.random()}`,
      content: '',
    };

    setQuestions((prev) => ({
      ...prev,
      [selectedPart]: [...prev[selectedPart], newQuestion],
    }));
  }

  function deleteQuestion(id) {
    setQuestions((prev) => ({
      ...prev,
      [selectedPart]: prev[selectedPart].filter((q) => q.id !== id),
    }));
  }

  function updateQuestionContent(id, value) {
    setQuestions((prev) => ({
      ...prev,
      [selectedPart]: prev[selectedPart].map((q) => (q.id === id ? { ...q, content: value } : q)),
    }));
  }

  return (
    <QuestionsContext.Provider
      value={{
        selectedPart,
        setSelectedPart,
        questions,
        createNewQuestion,
        deleteQuestion,
        updateQuestionContent,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

export function useQuestions() {
  const ctx = useContext(QuestionsContext);

  if (!ctx) throw new Error('useQuestions은 QuestionsProvider내에서 사용해주세요');

  return ctx;
}
