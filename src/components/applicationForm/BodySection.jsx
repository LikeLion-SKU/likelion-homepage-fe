import { useState } from 'react';
import AnswerSection from './AnswerSection';
import QuestionType from './QuestionType';

export default function BodySection() {
  const [clickStep, setClickStep] = useState(1);

  return (
    <div style={{ marginTop: '31px', width: '100%' }}>
      <QuestionType setClickStep={setClickStep} clickStep={clickStep} />
      <AnswerSection step={clickStep} />
    </div>
  );
}
