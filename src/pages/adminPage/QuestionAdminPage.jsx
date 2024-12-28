import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_APP_API_URL}/api/questions`;

const QuestionTypes = {
  COMMON: '공통',
  FRONT_END: '프론트엔드',
  BACK_END: '백엔드',
  PM_DESIGN: '기획/디자인',
};

function QuestionCard({ question, onUpdate, onDelete, onEdit, editingQuestion, setEditingQuestion }) {
  const isEditing = editingQuestion?.id === question.id;
  const [editedContent, setEditedContent] = useState(question.content);
  const [editedOrder, setEditedOrder] = useState(question.orderNumber);

  return isEditing ? (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '0 0 10px 0' }}>
      <div>
        <label>
          질문 내용:
          <input
            type='text'
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            style={{ width: '100%', margin: '0 0 10px 0' }}
          />
        </label>
      </div>
      <div>
        <label>
          순서:
          <input
            type='number'
            value={editedOrder}
            onChange={(e) => setEditedOrder(parseInt(e.target.value))}
            style={{ width: '100px' }}
          />
        </label>
      </div>
      <div style={{ margin: '10px 0 0 0' }}>
        <button onClick={() => onUpdate({ ...question, content: editedContent, orderNumber: editedOrder })}>
          저장
        </button>
        <button
          onClick={() => setEditingQuestion(null)}
          style={{ margin: '0 0 0 10px' }}
        >
          취소
        </button>
      </div>
    </div>
  ) : (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '0 0 10px 0' }}>
      <div style={{ margin: '0 0 5px 0' }}>순서: {question.orderNumber}</div>
      <div style={{ margin: '0 0 10px 0' }}>{question.content}</div>
      <div>
        <button onClick={() => onEdit(question)}>수정</button>
        <button
          onClick={() => onDelete(question.id)}
          style={{ margin: '0 0 0 10px' }}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

function QuestionAdminPage() {
  const [activeType, setActiveType] = useState('COMMON');
  const [questions, setQuestions] = useState(() => ({
    COMMON: [],
    FRONT_END: [],
    BACK_END: [],
    PM_DESIGN: [],
  }));
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    type: 'COMMON',
    content: '',
    orderNumber: 1,
  });

  const fetchQuestions = async () => {
    try {
      const responses = await Promise.all([
        axios.get(`${API_BASE_URL}/common`),
        axios.get(`${API_BASE_URL}/front-end`),
        axios.get(`${API_BASE_URL}/back-end`),
        axios.get(`${API_BASE_URL}/pm-design`),
      ]);

      setQuestions({
        COMMON: responses[0].data,
        FRONT_END: responses[1].data,
        BACK_END: responses[2].data,
        PM_DESIGN: responses[3].data,
      });
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleCreateQuestion = async () => {
    try {
      await axios.post(API_BASE_URL, newQuestion);
      setShowAddForm(false);
      setNewQuestion({ type: 'COMMON', content: '', orderNumber: 1 });
      fetchQuestions();
    } catch (error) {
      console.error('Failed to create question:', error);
    }
  };

  const handleUpdateQuestion = async (question) => {
    try {
      await axios.put(`${API_BASE_URL}/${question.id}`, {
        type: question.type,
        content: question.content,
        orderNumber: question.orderNumber,
      });
      setEditingQuestion(null);
      fetchQuestions();
    } catch (error) {
      console.error('Failed to update question:', error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchQuestions();
    } catch (error) {
      console.error('Failed to delete question:', error);
    }
  };

  const renderAddForm = () =>
    showAddForm ? (
      <div style={{ border: '1px solid #ddd', padding: '20px', margin: '0 0 20px 0' }}>
        <h2>새 질문 추가</h2>
        <div style={{ margin: '0 0 10px 0' }}>
          <label>
            질문 유형:
            <select
              value={newQuestion.type}
              onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
              style={{ margin: '0 0 0 10px' }}
            >
              {Object.entries(QuestionTypes).map(([key, value]) => (
                <option
                  key={key}
                  value={key}
                >
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ margin: '0 0 10px 0' }}>
          <label>
            질문 내용:
            <input
              type='text'
              value={newQuestion.content}
              onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
              style={{ margin: '0 0 0 10px' }}
            />
          </label>
        </div>
        <div style={{ margin: '0 0 10px 0' }}>
          <label>
            순서:
            <input
              type='number'
              value={newQuestion.orderNumber}
              onChange={(e) => setNewQuestion({ ...newQuestion, orderNumber: parseInt(e.target.value) })}
              style={{ margin: '0 0 0 10px', width: '100px' }}
            />
          </label>
        </div>
        <div>
          <button onClick={handleCreateQuestion}>추가</button>
          <button
            onClick={() => setShowAddForm(false)}
            style={{ margin: '0 0 0 10px' }}
          >
            취소
          </button>
        </div>
      </div>
    ) : null;

  const renderQuestions = () => {
    const currentQuestions = questions[activeType] || [];
    return currentQuestions.length > 0 ? (
      currentQuestions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          onUpdate={handleUpdateQuestion}
          onDelete={handleDeleteQuestion}
          onEdit={setEditingQuestion}
          editingQuestion={editingQuestion}
          setEditingQuestion={setEditingQuestion}
        />
      ))
    ) : (
      <div>질문이 없습니다.</div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 0 20px 0' }}>
        <h1>질문 관리</h1>
        <button onClick={() => setShowAddForm(true)}>새 질문 추가</button>
      </div>

      {renderAddForm()}

      <div>
        <div style={{ margin: '0 0 20px 0' }}>
          {Object.entries(QuestionTypes).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setActiveType(key)}
              style={{
                margin: '0 10px 0 0',
                backgroundColor: activeType === key ? '#ddd' : 'transparent',
              }}
            >
              {value}
            </button>
          ))}
        </div>

        <div>
          <h2>{QuestionTypes[activeType]} 질문 목록</h2>
          {renderQuestions()}
        </div>
      </div>
    </div>
  );
}

export default QuestionAdminPage;
