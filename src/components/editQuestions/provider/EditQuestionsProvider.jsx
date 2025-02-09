import { createContext, useContext, useState } from 'react';

import { editParts } from '@/constants/questionParts';

const EditQuestionsContext = createContext(null);

export default function EditQuestionsProvider({ children }) {
  const [selectedPart, setSelectedPart] = useState(editParts[0].part);

  return (
    <EditQuestionsContext.Provider
      value={{
        selectedPart,
        setSelectedPart,
      }}
    >
      {children}
    </EditQuestionsContext.Provider>
  );
}

export function useEditQuestions() {
  const ctx = useContext(EditQuestionsContext);

  if (!ctx) throw new Error('useEditQuestions은 EditQuestionsProvider내에서 사용해주세요');

  return ctx;
}
