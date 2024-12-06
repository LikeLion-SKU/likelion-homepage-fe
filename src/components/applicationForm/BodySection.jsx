import AnswerSection from './AnswerSection';
import QuestionType from './QuestionType';
import { useSearchParams } from 'react-router-dom';

export default function BodySection() {
  const [param] = useSearchParams();
  const step = parseInt(param.get('step'), 10);

  return (
    <div style={{ marginTop: '31px', width: '100%' }}>
      <QuestionType step={step} />
      <AnswerSection step={step} />
    </div>
  );
}
