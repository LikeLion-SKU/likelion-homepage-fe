export function convertQuestionPartToString(part) {
  let convertedPartName;
  switch (part) {
    case 'commonQuestions':
      convertedPartName = '공통 질문';
      break;
    case 'pmQuestions':
      convertedPartName = '기획';
      break;
    case 'backEndQuestions':
      convertedPartName = '백엔드';
      break;
    case 'frontEndQuestions':
      convertedPartName = '프론트엔드';
      break;
    case 'designQuestions':
      convertedPartName = '디자인';
      break;
  }

  return convertedPartName;
}
