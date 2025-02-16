import { createContext, useContext, useState } from 'react';

import { editParts } from '@/constants/questionParts';
import { useLocation, useSearchParams } from 'react-router-dom';

const EditQuestionsContext = createContext(null);

export default function EditQuestionsProvider({ children }) {
  const location = useLocation();
  const [searchParam] = useSearchParams();

  const semester = location.pathname.split('/')[4];
  const type = searchParam.get('type');

  const [selectedPart, setSelectedPart] = useState(editParts[0].part);

  return (
    <EditQuestionsContext.Provider
      value={{
        selectedPart,
        setSelectedPart,
        semester,
        type,
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
