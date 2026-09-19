import { useState, useEffect, useCallback, useMemo } from 'react';
import { Question, ExamMode, UserAnswerRecord, ExamHistoryItem, FilterOptions } from '../types';

export function shuffleArray<T>(array: readonly T[] | T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

const STORAGE_KEY_THEME = 'aws_genai_exam_theme_v1';

export function useExamState(examId: string, allQuestionsInput: Question[]) {
  const ALL_QUESTIONS = allQuestionsInput;
  const STORAGE_KEY_ANSWERS = `aws_exam_${examId}_answers_v1`;
  const STORAGE_KEY_HISTORY = `aws_exam_${examId}_history_v1`;

  const [mode, setMode] = useState<ExamMode>('practice');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, UserAnswerRecord>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ANSWERS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [history, setHistory] = useState<ExamHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const [filters, setFilters] = useState<FilterOptions>({
    category: 'All Categories',
    status: 'all',
    searchQuery: '',
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      return true;
    }
    return false;
  });
  // Always initialize with randomly shuffled questions when the file/app loads
  const [activeQuestionList, setActiveQuestionList] = useState<Question[]>(() => shuffleArray(ALL_QUESTIONS));
  
  // Timer state for Exam Mode
  const [examDurationSeconds, setExamDurationSeconds] = useState(130 * 60); // 130 minutes default
  const [secondsRemaining, setSecondsRemaining] = useState(130 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [examStartTime, setExamStartTime] = useState<number | null>(null);

  // Save answers to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(answers));
    } catch (e) {
      console.error("Failed to save answers to localStorage", e);
    }
  }, [answers]);

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history", e);
    }
  }, [history]);

  // Handle theme
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    } catch (e) {
      console.error("Failed to save theme", e);
    }
  }, [theme]);

  // Exam timer interval
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsRemaining > 0 && !examFinished) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            finishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, secondsRemaining, examFinished]);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return activeQuestionList.filter(q => {
      // Category filter
      if (filters.category !== 'All Categories' && q.category !== filters.category) {
        return false;
      }

      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const inQuestion = q.question.toLowerCase().includes(query);
        const inChoices = q.choices.some(c => c.text.toLowerCase().includes(query));
        const inComments = q.comments.toLowerCase().includes(query);
        const inCategory = q.category.toLowerCase().includes(query);
        const inNumber = q.questionNumber.toString().includes(query);
        if (!inQuestion && !inChoices && !inComments && !inCategory && !inNumber) {
          return false;
        }
      }

      // Status filter
      const record = answers[q.id];
      if (filters.status === 'unanswered') {
        return !record || record.selectedLetters.length === 0;
      }
      if (filters.status === 'answered') {
        return record && record.selectedLetters.length > 0;
      }
      if (filters.status === 'correct') {
        return record && record.isSubmitted && record.isCorrect;
      }
      if (filters.status === 'incorrect') {
        return record && record.isSubmitted && !record.isCorrect;
      }
      if (filters.status === 'flagged') {
        return record && record.isFlagged;
      }

      return true;
    });
  }, [activeQuestionList, filters, answers]);

  // Ensure currentQuestionIndex is within filtered bounds
  const currentQuestion: Question | undefined = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];

  // Answer selection handler - toggles/selects options WITHOUT immediate evaluation
  const handleSelectChoice = useCallback((question: Question, letter: string) => {
    setAnswers(prev => {
      const existing = prev[question.id] || {
        questionId: question.id,
        selectedLetters: [],
        isSubmitted: false,
        isCorrect: false,
        isFlagged: false,
        timestamp: Date.now(),
      };

      let newSelected: string[];
      if (question.multiSelect) {
        if (existing.selectedLetters.includes(letter)) {
          newSelected = existing.selectedLetters.filter(l => l !== letter);
        } else {
          // If we reached required count in multi-select, replace oldest or append
          if (existing.selectedLetters.length < question.requiredCount) {
            newSelected = [...existing.selectedLetters, letter].sort();
          } else {
            // Replace the first selected to keep exactly requiredCount
            newSelected = [...existing.selectedLetters.slice(1), letter].sort();
          }
        }
      } else {
        // Single choice: set to newly selected letter
        newSelected = [letter];
      }

      // Check correctness
      const correctLetters = question.choices.filter(c => c.isCorrect).map(c => c.letter).sort();
      const isCorrect = newSelected.length === correctLetters.length &&
        newSelected.every((l, i) => l === correctLetters[i]);

      return {
        ...prev,
        [question.id]: {
          ...existing,
          selectedLetters: newSelected,
          isSubmitted: false, // Remains unsubmitted until Corregir is clicked
          isCorrect,
          timestamp: Date.now()
        }
      };
    });
  }, []);

  // Check / Validate Answer handler (Corregir)
  const handleCheckAnswer = useCallback((questionId: number) => {
    setAnswers(prev => {
      const existing = prev[questionId];
      if (!existing || existing.selectedLetters.length === 0) return prev;

      const q = activeQuestionList.find(item => item.id === questionId) || ALL_QUESTIONS.find(item => item.id === questionId);
      if (!q) return prev;

      const correctLetters = q.choices.filter(c => c.isCorrect).map(c => c.letter).sort();
      const isCorrect = existing.selectedLetters.length === correctLetters.length &&
        existing.selectedLetters.every((l, i) => l === correctLetters[i]);

      return {
        ...prev,
        [questionId]: {
          ...existing,
          isSubmitted: true,
          isCorrect,
          timestamp: Date.now()
        }
      };
    });
  }, [activeQuestionList]);

  // Toggle flagged status
  const handleToggleFlag = useCallback((questionId: number) => {
    setAnswers(prev => {
      const existing = prev[questionId] || {
        questionId,
        selectedLetters: [],
        isSubmitted: false,
        isCorrect: false,
        isFlagged: false,
        timestamp: Date.now(),
      };
      return {
        ...prev,
        [questionId]: {
          ...existing,
          isFlagged: !existing.isFlagged
        }
      };
    });
  }, []);

  // Save notes for a question
  const handleSaveNotes = useCallback((questionId: number, notes: string) => {
    setAnswers(prev => {
      const existing = prev[questionId] || {
        questionId,
        selectedLetters: [],
        isSubmitted: false,
        isCorrect: false,
        isFlagged: false,
        timestamp: Date.now(),
      };
      return {
        ...prev,
        [questionId]: {
          ...existing,
          notes
        }
      };
    });
  }, []);

  // Start exam mode
  const startExam = useCallback((questionCount: number = ALL_QUESTIONS.length, timeMinutes: number = 130, category?: string) => {
    let questionsPool = category && category !== 'All Categories'
      ? ALL_QUESTIONS.filter(q => q.category === category)
      : [...ALL_QUESTIONS];

    // Always randomize order for the exam
    questionsPool = shuffleArray(questionsPool);
    if (questionCount < questionsPool.length) {
      questionsPool = questionsPool.slice(0, questionCount);
    }
    setActiveQuestionList(questionsPool);
    setMode('exam');
    setExamDurationSeconds(timeMinutes * 60);
    setSecondsRemaining(timeMinutes * 60);
    setIsTimerRunning(true);
    setExamFinished(false);
    setShowResultsModal(false);
    setExamStartTime(Date.now());
    setCurrentQuestionIndex(0);
    
    // Reset answers for this exam session
    const freshAnswers: Record<number, UserAnswerRecord> = {};
    for (const q of questionsPool) {
      freshAnswers[q.id] = {
        questionId: q.id,
        selectedLetters: [],
        isSubmitted: false,
        isCorrect: false,
        isFlagged: false,
        timestamp: Date.now()
      };
    }
    setAnswers(freshAnswers);
  }, []);

  // Finish exam
  const finishExam = useCallback(() => {
    setIsTimerRunning(false);
    setExamFinished(true);

    // Compute stats
    let correct = 0;
    let answered = 0;
    const categoryStats: Record<string, { correct: number; total: number }> = {};

    activeQuestionList.forEach(q => {
      const ans = answers[q.id];
      if (!categoryStats[q.category]) {
        categoryStats[q.category] = { correct: 0, total: 0 };
      }
      categoryStats[q.category].total += 1;

      if (ans && ans.selectedLetters.length > 0) {
        answered += 1;
        const correctLetters = q.choices.filter(c => c.isCorrect).map(c => c.letter).sort();
        const isCorr = ans.selectedLetters.length === correctLetters.length &&
          ans.selectedLetters.every((l, i) => l === correctLetters[i]);
        
        if (isCorr) {
          correct += 1;
          categoryStats[q.category].correct += 1;
        }
      }
    });

    const total = activeQuestionList.length;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    const timeSpent = examStartTime ? Math.round((Date.now() - examStartTime) / 1000) : (examDurationSeconds - secondsRemaining);

    const historyItem: ExamHistoryItem = {
      id: 'exam_' + Date.now(),
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: 'exam',
      totalQuestions: total,
      scorePercent: percent,
      correctCount: correct,
      incorrectCount: total - correct,
      timeSpentSeconds: timeSpent,
      categoryScores: categoryStats
    };

    setHistory(prev => [historyItem, ...prev.slice(0, 19)]);
    setShowResultsModal(true);

    // Mark all as submitted
    setAnswers(prev => {
      const updated = { ...prev };
      activeQuestionList.forEach(q => {
        const record = updated[q.id];
        const correctLetters = q.choices.filter(c => c.isCorrect).map(c => c.letter).sort();
        const isCorr = record && record.selectedLetters.length === correctLetters.length &&
          record.selectedLetters.every((l, i) => l === correctLetters[i]);
        if (record) {
          updated[q.id] = {
            ...record,
            isSubmitted: true,
            isCorrect: Boolean(isCorr)
          };
        }
      });
      return updated;
    });
  }, [activeQuestionList, answers, examStartTime, examDurationSeconds, secondsRemaining]);

  // Shuffle current question order on demand
  const shuffleCurrentQuestions = useCallback(() => {
    setActiveQuestionList(prev => shuffleArray(prev));
    setCurrentQuestionIndex(0);
  }, []);

  // Reset all answers and progress across the app
  const resetAllProgress = useCallback(() => {
    setAnswers({});
    try {
      localStorage.removeItem(STORAGE_KEY_ANSWERS);
    } catch (e) {
      console.error(e);
    }
    setActiveQuestionList(shuffleArray(ALL_QUESTIONS));
    setMode('practice');
    setIsTimerRunning(false);
    setExamFinished(false);
    setShowResultsModal(false);
    setCurrentQuestionIndex(0);
  }, []);

  // Reset only the current exam session
  const resetCurrentExam = useCallback(() => {
    setExamFinished(false);
    setShowResultsModal(false);
    setSecondsRemaining(examDurationSeconds);
    setIsTimerRunning(true);
    setExamStartTime(Date.now());
    setCurrentQuestionIndex(0);

    // Reset answers for active question list
    setAnswers(prev => {
      const next = { ...prev };
      activeQuestionList.forEach(q => {
        next[q.id] = {
          questionId: q.id,
          selectedLetters: [],
          isSubmitted: false,
          isCorrect: false,
          isFlagged: false,
          timestamp: Date.now()
        };
      });
      return next;
    });
  }, [activeQuestionList, examDurationSeconds]);

  // Reset single question state
  const resetCurrentQuestion = useCallback((questionId: number) => {
    setAnswers(prev => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  }, []);

  // Stats calculation for practice or current view
  const stats = useMemo(() => {
    let answered = 0;
    let correct = 0;
    let incorrect = 0;
    let flagged = 0;

    ALL_QUESTIONS.forEach(q => {
      const record = answers[q.id];
      if (record) {
        if (record.isFlagged) flagged++;
        if (record.selectedLetters.length > 0) {
          answered++;
          if (record.isSubmitted) {
            if (record.isCorrect) correct++;
            else incorrect++;
          }
        }
      }
    });

    const total = ALL_QUESTIONS.length;
    const progressPercent = Math.round((answered / total) * 100);
    const accuracyPercent = (correct + incorrect) > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 0;

    return {
      total,
      answered,
      unanswered: total - answered,
      correct,
      incorrect,
      flagged,
      progressPercent,
      accuracyPercent,
    };
  }, [answers]);

  return {
    mode,
    setMode,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    currentQuestion,
    filteredQuestions,
    allQuestions: ALL_QUESTIONS,
    activeQuestionList,
    answers,
    stats,
    history,
    theme,
    setTheme,
    filters,
    setFilters,
    isSidebarOpen,
    setIsSidebarOpen,
    handleSelectChoice,
    handleCheckAnswer,
    handleToggleFlag,
    handleSaveNotes,
    // Exam timer & mode
    examDurationSeconds,
    secondsRemaining,
    isTimerRunning,
    examFinished,
    showResultsModal,
    setShowResultsModal,
    startExam,
    finishExam,
    shuffleCurrentQuestions,
    resetProgress: resetAllProgress,
    resetAllProgress,
    resetCurrentExam,
    resetCurrentQuestion,
  };
}
