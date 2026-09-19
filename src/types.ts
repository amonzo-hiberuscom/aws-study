export interface Choice {
  letter: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  questionNumber: number;
  question: string;
  choices: Choice[];
  comments: string;
  category: string;
  multiSelect: boolean;
  requiredCount: number;
}

export type ExamMode = 'practice' | 'exam' | 'review' | 'custom';

export interface UserAnswerRecord {
  questionId: number;
  selectedLetters: string[];
  isSubmitted: boolean;
  isCorrect: boolean;
  isFlagged: boolean;
  notes?: string;
  timestamp: number;
}

export interface ExamHistoryItem {
  id: string;
  date: string;
  mode: ExamMode;
  totalQuestions: number;
  scorePercent: number;
  correctCount: number;
  incorrectCount: number;
  timeSpentSeconds: number;
  categoryScores: Record<string, { correct: number; total: number }>;
}

export interface FilterOptions {
  category: string;
  status: 'all' | 'unanswered' | 'answered' | 'correct' | 'incorrect' | 'flagged';
  searchQuery: string;
}
