import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuizState {
  totalQuestions: number;
  isAnswerCorrect: boolean[];
  quizData: {
    questionId: string;
    question: string;
    questionType: string;
    answerType: string;
    options: string[];
    correctAnswer: string[];
  }[];
}

const initialState: QuizState = {
  totalQuestions: 0,
  isAnswerCorrect: [],
  quizData: [], // Add quizData to the state
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setTotalQuestions(state, action: PayloadAction<number>) {
      state.totalQuestions = action.payload;
      state.isAnswerCorrect = new Array(action.payload).fill(false); // Initialize answers as false
    },
    setQuizData(
      state,
      action: PayloadAction<{
        questionId: string;
        question: string;
        questionType: string;
        answerType: string;
        options: string[];
        correctAnswer: string[];
      }[]>
    ) {
      state.quizData = action.payload; // Set quiz data
    },
    setAnswerCorrect(
      state,
      action: PayloadAction<{ questionIndex: number; isCorrect: boolean }>
    ) {
      state.isAnswerCorrect[action.payload.questionIndex] = action.payload.isCorrect;
    },
  },
});

export const { setTotalQuestions, setQuizData, setAnswerCorrect } = quizSlice.actions;

export default quizSlice.reducer;