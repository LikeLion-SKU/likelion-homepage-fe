import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './QuestionAdminPage.css';

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
    <div className='editing-card'>
      <div className='editing-form'>
        <div className='form-group'>
          <label>
            질문 내용:
            <input
              type='text'
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            순서:
            <input
              type='number'
              value={editedOrder}
              onChange={(e) => setEditedOrder(parseInt(e.target.value))}
            />
          </label>
        </div>
        <div className='button-group'>
          <button
            className='button button-primary'
            onClick={() => onUpdate({ ...question, content: editedContent, orderNumber: editedOrder })}
          >
            저장
          </button>
          <button
            className='button button-secondary'
            onClick={() => setEditingQuestion(null)}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className='question-card'>
      <div className='order-number'>순서: {question.orderNumber}</div>
      <div className='content'>{question.content}</div>
      <div className='button-group'>
        <button
          className='button button-primary'
          onClick={() => onEdit(question)}
        >
          수정
        </button>
        <button
          className='button button-danger'
          onClick={() => onDelete(question.id)}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

function QuestionAdminPage() {
  const [generation, setGeneration] = useState(13);
  const [activeType, setActiveType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    generation: 13,
    type: 'COMMON',
    content: '',
    orderNumber: 1,
  });

  const fetchQuestions = useCallback(async () => {
    try {
      setError(null);
      let response;
      if (activeType) {
        response = await axios.get(`${API_BASE_URL}/generation/${generation}/type/${activeType}`);
      } else {
        response = await axios.get(`${API_BASE_URL}/generation/${generation}`);
      }

      // 응답 데이터가 배열인지 확인
      const questionsData = response.data;
      if (Array.isArray(questionsData)) {
        setQuestions(questionsData);
      } else {
        console.error('Received non-array data:', questionsData);
        setQuestions([]);
        setError('데이터 형식이 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      setQuestions([]);
      setError('질문 목록을 불러오는데 실패했습니다.');
    }
  }, [generation, activeType]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleCreateQuestion = async () => {
    try {
      await axios.post(API_BASE_URL, newQuestion);
      setShowAddForm(false);
      setNewQuestion({ generation: 13, type: 'COMMON', content: '', orderNumber: 1 });
      fetchQuestions();
    } catch (error) {
      console.error('Failed to create question:', error);
    }
  };

  const handleUpdateQuestion = async (question) => {
    try {
      await axios.put(`${API_BASE_URL}/${question.id}`, {
        generation: question.generation,
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
      <div className='add-form'>
        <h2>새 질문 추가</h2>
        <div className='form-group'>
          <label>
            기수:
            <input
              type='number'
              value={newQuestion.generation}
              onChange={(e) => setNewQuestion({ ...newQuestion, generation: parseInt(e.target.value) })}
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            질문 유형:
            <select
              value={newQuestion.type}
              onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
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
        <div className='form-group'>
          <label>
            질문 내용:
            <input
              type='text'
              value={newQuestion.content}
              onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            순서:
            <input
              type='number'
              value={newQuestion.orderNumber}
              onChange={(e) => setNewQuestion({ ...newQuestion, orderNumber: parseInt(e.target.value) })}
            />
          </label>
        </div>
        <div className='button-group'>
          <button
            className='button button-primary'
            onClick={handleCreateQuestion}
          >
            추가
          </button>
          <button
            className='button button-secondary'
            onClick={() => setShowAddForm(false)}
          >
            취소
          </button>
        </div>
      </div>
    ) : null;

  return (
    <div className='question-admin'>
      <div className='header-container'>
        <div>
          <h1>질문 관리</h1>
          <div className='generation-selector'>
            <label>기수:</label>
            <input
              type='number'
              value={generation}
              onChange={(e) => setGeneration(parseInt(e.target.value))}
            />
          </div>
        </div>
        <button
          className='button button-primary'
          onClick={() => setShowAddForm(true)}
        >
          새 질문 추가
        </button>
      </div>

      {renderAddForm()}

      <div className='type-filters'>
        <button
          className={`type-button ${activeType === null ? 'active' : ''}`}
          onClick={() => setActiveType(null)}
        >
          전체
        </button>
        {Object.entries(QuestionTypes).map(([key, value]) => (
          <button
            key={key}
            className={`type-button ${activeType === key ? 'active' : ''}`}
            onClick={() => setActiveType(key)}
          >
            {value}
          </button>
        ))}
      </div>

      <div>
        <h2>{activeType ? QuestionTypes[activeType] : '전체'} 질문 목록</h2>
        {error ? (
          <div className='error-message'>{error}</div>
        ) : questions.length > 0 ? (
          questions.map((question) => (
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
          <div className='no-questions'>질문이 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default QuestionAdminPage;
