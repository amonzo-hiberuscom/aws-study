import React, { useState, useEffect } from 'react';
import { useExamState } from './hooks/useExamState';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { QuestionCard } from './components/QuestionCard';
import { StatsBar } from './components/StatsBar';
import { CustomQuizModal } from './components/CustomQuizModal';
import { ExamResults } from './components/ExamResults';
import { ResetModal } from './components/ResetModal';
import { ExamMenu } from './components/ExamMenu';
import { EXAMS, getExamById, ExamDefinition } from './data/exams';
import {
  HelpCircle,
  Keyboard,
} from 'lucide-react';

const STORAGE_KEY_SELECTED_EXAM = 'aws_exam_selected_id_v1';
const STORAGE_KEY_THEME = 'aws_genai_exam_theme_v1';

function readInitialTheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

interface ExamAppProps {
  exam: ExamDefinition;
  onChangeExam: () => void;
}

const ExamApp: React.FC<ExamAppProps> = ({ exam, onChangeExam }) => {
  const {
    mode,
    setMode,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    currentQuestion,
    filteredQuestions,
    allQuestions,
    answers,
    stats,
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
    examDurationSeconds,
    secondsRemaining,
    isTimerRunning,
    showResultsModal,
    setShowResultsModal,
    startExam,
    finishExam,
    shuffleCurrentQuestions,
    resetAllProgress,
    resetCurrentExam,
    resetCurrentQuestion,
  } = useExamState(exam.id, exam.questions);

  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  // Global hotkey to toggle sidebar / full screen mode (M key)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }
      if (e.key.toLowerCase() === 'm') {
        setIsSidebarOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [setIsSidebarOpen]);

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReviewIncorrect = () => {
    setFilters(prev => ({ ...prev, status: 'incorrect' }));
    setShowResultsModal(false);
    setMode('practice');
    setCurrentQuestionIndex(0);
  };

  const handleReviewAll = () => {
    setFilters(prev => ({ ...prev, status: 'all' }));
    setShowResultsModal(false);
    setMode('practice');
    setCurrentQuestionIndex(0);
  };

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors`}>

      {/* Top Header */}
      <Header
        mode={mode}
        setMode={setMode}
        theme={theme}
        setTheme={setTheme}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        stats={stats}
        onOpenExamModal={() => setIsQuizModalOpen(true)}
        onReset={() => setIsResetModalOpen(true)}
        onShuffle={shuffleCurrentQuestions}
        secondsRemaining={secondsRemaining}
        isTimerRunning={isTimerRunning}
        onFinishExam={finishExam}
        examName={exam.name}
        examBadge={exam.badge}
        totalQuestions={allQuestions.length}
        onChangeExam={onChangeExam}
      />

      {/* Main Layout Body */}
      <div className={`flex-1 flex w-full mx-auto transition-all duration-300 ${isSidebarOpen ? 'max-w-7xl' : 'max-w-6xl'}`}>

        {/* Sidebar Drawer */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          categories={exam.categories}
          allQuestions={allQuestions}
          filteredQuestions={filteredQuestions}
          currentIndex={currentQuestionIndex}
          onSelectQuestion={(idx) => {
            setCurrentQuestionIndex(idx);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          answers={answers}
          filters={filters}
          setFilters={setFilters}
          mode={mode}
          stats={stats}
        />

        {/* Content Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {filteredQuestions.length > 0 && currentQuestion ? (
            <div className="space-y-4">
              {/* Mini Stats Bar with Fullscreen/Sidebar Toggle */}
              <StatsBar
                currentIndex={currentQuestionIndex}
                totalFiltered={filteredQuestions.length}
                mode={mode}
                stats={stats}
                isSidebarOpen={isSidebarOpen}
                onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
              />

              {/* Question Card */}
              <QuestionCard
                question={currentQuestion}
                questionIndex={currentQuestionIndex}
                totalFiltered={filteredQuestions.length}
                answerRecord={answers[currentQuestion.id]}
                mode={mode}
                isSidebarOpen={isSidebarOpen}
                onSelectChoice={handleSelectChoice}
                onCheckAnswer={handleCheckAnswer}
                onResetQuestion={resetCurrentQuestion}
                onToggleFlag={handleToggleFlag}
                onSaveNotes={handleSaveNotes}
                onNext={handleNext}
                onPrev={handlePrev}
                hasPrev={currentQuestionIndex > 0}
                hasNext={currentQuestionIndex < filteredQuestions.length - 1}
              />

              {/* Keyboard Shortcuts Hint Bar */}
              <div className={`mx-auto flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-2 px-1 transition-all duration-300 ${isSidebarOpen ? 'max-w-4xl' : 'max-w-5xl'}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="hidden sm:inline">Atajos:</span>
                  <span className="inline-flex items-center gap-1 font-mono bg-slate-200/80 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">
                    A-F
                  </span>
                  <span>elegir •</span>
                  <span className="inline-flex items-center gap-1 font-mono bg-slate-200/80 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">
                    Enter / C
                  </span>
                  <span>corregir •</span>
                  <span className="inline-flex items-center gap-1 font-mono bg-slate-200/80 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">
                    ← / →
                  </span>
                  <span>navegar •</span>
                  <span className="inline-flex items-center gap-1 font-mono bg-slate-200/80 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">
                    M
                  </span>
                  <span>panel</span>
                </div>

                <button
                  onClick={() => setShowKeyboardShortcuts(true)}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition underline underline-offset-2"
                >
                  Ver ayuda
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto my-16 text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <HelpCircle className="w-12 h-12 text-indigo-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No hay preguntas para los filtros actuales
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Prueba a restablecer los filtros de categoría o búsqueda para ver todas las {allQuestions.length} preguntas.
              </p>
              <button
                onClick={() => setFilters({ category: exam.categories[0], status: 'all', searchQuery: '' })}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                Restablecer Filtros
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Quiz Modal */}
      <CustomQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        onStartExam={(count, mins, cat) => {
          if (cat) {
            setFilters(prev => ({ ...prev, category: cat }));
          }
          startExam(count, mins);
        }}
        totalAvailable={allQuestions.length}
        categories={exam.categories}
      />

      {/* Exam Results Modal */}
      <ExamResults
        isOpen={showResultsModal}
        onClose={() => setShowResultsModal(false)}
        questions={allQuestions}
        answers={answers}
        onReviewIncorrect={handleReviewIncorrect}
        onReviewAll={handleReviewAll}
        onRestart={() => {
          setShowResultsModal(false);
          setIsQuizModalOpen(true);
        }}
        timeSpentSeconds={examDurationSeconds - secondsRemaining}
      />

      {/* Reset Confirmation Modal */}
      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        mode={mode}
        currentQuestionNumber={currentQuestion ? currentQuestion.questionNumber : currentQuestionIndex + 1}
        currentQuestionId={currentQuestion ? currentQuestion.id : -1}
        onResetAll={resetAllProgress}
        onResetCurrentExam={resetCurrentExam}
        onResetCurrentQuestion={resetCurrentQuestion}
      />

      {/* Keyboard Shortcuts Help Modal */}
      {showKeyboardShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                <Keyboard className="w-4 h-4 text-indigo-600" />
                Atajos de Teclado
              </div>
              <button
                onClick={() => setShowKeyboardShortcuts(false)}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Cerrar
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50 dark:border-slate-800/50">
                <span className="text-slate-600 dark:text-slate-300">Seleccionar Opciones</span>
                <span className="font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-900 dark:text-white">
                  A, B, C, D, E, F
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50 dark:border-slate-800/50">
                <span className="text-slate-600 dark:text-slate-300">Corregir Respuesta</span>
                <span className="font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-indigo-600 dark:text-indigo-400">
                  Enter ó C
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50 dark:border-slate-800/50">
                <span className="text-slate-600 dark:text-slate-300">Siguiente Pregunta</span>
                <span className="font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-900 dark:text-white">
                  → (Flecha Der)
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50 dark:border-slate-800/50">
                <span className="text-slate-600 dark:text-slate-300">Pregunta Anterior</span>
                <span className="font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-900 dark:text-white">
                  ← (Flecha Izq)
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50 dark:border-slate-800/50">
                <span className="text-slate-600 dark:text-slate-300">Marcar para Revisión</span>
                <span className="font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-900 dark:text-white">
                  F
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50 dark:border-slate-800/50">
                <span className="text-slate-600 dark:text-slate-300">Ocultar/Mostrar Panel (Pantalla completa)</span>
                <span className="font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-indigo-600 dark:text-indigo-400">
                  M
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowKeyboardShortcuts(false)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default function App() {
  const [selectedExamId, setSelectedExamId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_SELECTED_EXAM);
    } catch {
      return null;
    }
  });
  const [menuTheme] = useState<'light' | 'dark'>(() => readInitialTheme());

  const handleSelectExam = (examId: string) => {
    try {
      localStorage.setItem(STORAGE_KEY_SELECTED_EXAM, examId);
    } catch {
      // ignore storage errors
    }
    setSelectedExamId(examId);
  };

  const handleChangeExam = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_SELECTED_EXAM);
    } catch {
      // ignore storage errors
    }
    setSelectedExamId(null);
  };

  const exam = selectedExamId ? getExamById(selectedExamId) : undefined;

  if (!exam) {
    return <ExamMenu exams={EXAMS} onSelectExam={handleSelectExam} theme={menuTheme} />;
  }

  return <ExamApp key={exam.id} exam={exam} onChangeExam={handleChangeExam} />;
}
