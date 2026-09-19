import React from 'react';
import { PanelLeftOpen, Maximize2, Minimize2, CheckCircle2, XCircle } from 'lucide-react';
import { ExamMode } from '../types';

interface StatsBarProps {
  currentIndex: number;
  totalFiltered: number;
  mode: ExamMode;
  stats: {
    total: number;
    answered: number;
    correct: number;
    incorrect: number;
    flagged: number;
    progressPercent: number;
    accuracyPercent: number;
  };
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  currentIndex,
  totalFiltered,
  mode,
  stats,
  isSidebarOpen = true,
  onToggleSidebar
}) => {
  return (
    <div className={`mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 pb-1 transition-all duration-300 ${isSidebarOpen ? 'max-w-4xl' : 'max-w-5xl'}`}>
      <div className="flex items-center gap-2.5 font-medium">
        <span className="text-slate-900 dark:text-white font-bold text-sm">
          Pregunta {currentIndex + 1} de {totalFiltered}
        </span>
        {mode === 'practice' && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-200/80 dark:border-indigo-800/60">
            Modo Práctica
          </span>
        )}
        {mode === 'exam' && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/60 animate-pulse">
            Examen en Curso
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 text-xs">
        <span className="hidden md:inline">
          Precisión: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{stats.accuracyPercent}%</strong>
        </span>
        <span className="hidden sm:inline">
          Progreso: <strong className="text-slate-900 dark:text-white font-bold">{stats.progressPercent}%</strong>
        </span>

        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            id="statsbar-fullscreen-toggle-btn"
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold border transition shadow-2xs ${
              !isSidebarOpen
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/60'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
            title={isSidebarOpen ? "Ocultar panel (Pantalla completa / Vista amplia)" : "Mostrar panel de preguntas (1-97)"}
          >
            {isSidebarOpen ? (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span className="hidden sm:inline">Pantalla Completa</span>
              </>
            ) : (
              <>
                <PanelLeftOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Mostrar Panel</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

