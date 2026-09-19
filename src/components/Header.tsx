import React from 'react';
import { 
  BookOpen, 
  Clock, 
  Award, 
  Moon, 
  Sun, 
  Menu, 
  RotateCcw,
  CheckCircle2,
  XCircle,
  Bookmark,
  Sparkles,
  Layers,
  Shuffle,
  PanelLeftClose,
  PanelLeftOpen,
  GraduationCap
} from 'lucide-react';
import { ExamMode } from '../types';

interface HeaderProps {
  mode: ExamMode;
  setMode: (mode: ExamMode) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  stats: {
    total: number;
    answered: number;
    correct: number;
    incorrect: number;
    flagged: number;
    progressPercent: number;
    accuracyPercent: number;
  };
  onOpenExamModal: () => void;
  onReset: () => void;
  onShuffle?: () => void;
  secondsRemaining: number;
  isTimerRunning: boolean;
  onFinishExam: () => void;
  examName: string;
  examBadge: string;
  totalQuestions: number;
  onChangeExam: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  setMode,
  theme,
  setTheme,
  isSidebarOpen,
  setIsSidebarOpen,
  stats,
  onOpenExamModal,
  onReset,
  onShuffle,
  secondsRemaining,
  isTimerRunning,
  onFinishExam,
  examName,
  examBadge,
  totalQuestions,
  onChangeExam
}) => {
  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Left: Brand and Sidebar Toggle */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              id="sidebar-toggle-btn"
              onClick={() => setIsSidebarOpen(prev => !prev)}
              aria-label={isSidebarOpen ? "Ocultar panel de preguntas" : "Mostrar panel de preguntas"}
              title={isSidebarOpen ? "Ocultar panel (Pantalla completa / Vista amplia)" : `Mostrar panel de preguntas (1-${totalQuestions})`}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition ${
                isSidebarOpen
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800/80'
                  : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-4 h-4" />
              ) : (
                <PanelLeftOpen className="w-4 h-4" />
              )}
              <span className="hidden sm:inline text-xs font-semibold">
                {isSidebarOpen ? 'Panel' : 'Ver Panel'}
              </span>
            </button>

            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200 dark:shadow-none shrink-0 text-sm">
                AWS
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-bold text-slate-900 dark:text-white leading-tight truncate">
                    {examName}
                  </h1>
                  <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {examBadge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider truncate hidden md:block">
                  {totalQuestions} Preguntas Oficiales & Explicaciones Clave
                </p>
              </div>
            </div>

            <button
              id="change-exam-btn"
              onClick={onChangeExam}
              title="Cambiar de examen"
              aria-label="Cambiar de examen"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <GraduationCap className="w-4 h-4" />
              <span className="text-xs font-semibold">Cambiar examen</span>
            </button>
          </div>

          {/* Center: Mode Switcher */}
          <div className="hidden md:flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80">
            <button
              id="mode-practice-btn"
              onClick={() => setMode('practice')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                mode === 'practice'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              Modo Práctica
            </button>
            <button
              id="mode-exam-btn"
              onClick={onOpenExamModal}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                mode === 'exam'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Simulador Examen
            </button>
          </div>

          {/* Right: Timer (if in exam) or Stats and Theme Toggle */}
          <div className="flex items-center gap-3">
            {mode === 'exam' ? (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Tiempo Restante</div>
                  <div className={`text-lg font-mono font-bold ${secondsRemaining < 300 ? 'text-red-600 dark:text-red-400 animate-pulse' : 'text-indigo-600 dark:text-indigo-400'}`}>
                    {formatTime(secondsRemaining)}
                  </div>
                </div>
                <button
                  id="finish-exam-header-btn"
                  onClick={onFinishExam}
                  className="px-4 py-2 bg-slate-900 dark:bg-indigo-600 text-white rounded-full text-xs font-semibold hover:bg-slate-800 dark:hover:bg-indigo-700 transition-colors shadow-xs"
                >
                  Finalizar Examen
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-200/80 dark:border-emerald-800/60 font-semibold" title="Aciertos">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{stats.correct}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 px-2.5 py-1 rounded-lg border border-rose-200/80 dark:border-rose-800/60 font-semibold" title="Fallos">
                  <XCircle className="w-3.5 h-3.5 text-rose-500" />
                  <span>{stats.incorrect}</span>
                </div>
                {stats.flagged > 0 && (
                  <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-lg border border-indigo-200/80 dark:border-indigo-800/60 font-semibold" title="Marcadas para repasar">
                    <Bookmark className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 fill-current" />
                    <span>{stats.flagged}</span>
                  </div>
                )}
              </div>
            )}

            {/* Shuffle Questions */}
            {onShuffle && (
              <button
                type="button"
                id="shuffle-questions-btn"
                onClick={onShuffle}
                title="Barajar orden de preguntas (aleatorio)"
                aria-label="Barajar orden de preguntas"
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <Shuffle className="w-4 h-4" />
              </button>
            )}

            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Cambiar tema de color"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Reset / Settings */}
            <button
              id="reset-progress-btn"
              onClick={onReset}
              title="Reiniciar progreso"
              aria-label="Reiniciar progreso de estudio"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
