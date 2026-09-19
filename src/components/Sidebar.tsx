import React from 'react';
import { 
  Search, 
  X, 
  Filter, 
  Bookmark, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  BarChart3,
  Sparkles,
  Info,
  ChevronLeft,
  PanelLeftClose
} from 'lucide-react';
import { Question, FilterOptions, UserAnswerRecord, ExamMode } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  allQuestions: Question[];
  filteredQuestions: Question[];
  currentIndex: number;
  onSelectQuestion: (index: number) => void;
  answers: Record<number, UserAnswerRecord>;
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
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
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  categories,
  allQuestions,
  filteredQuestions,
  currentIndex,
  onSelectQuestion,
  answers,
  filters,
  setFilters,
  mode,
  stats
}) => {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        id="question-sidebar"
        className={`fixed lg:sticky top-0 lg:top-16 z-40 h-full lg:h-[calc(100vh-4rem)] w-80 sm:w-96 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300 ease-in-out shrink-0 ${
          isOpen
            ? 'translate-x-0 opacity-100'
            : '-translate-x-full lg:w-0 lg:opacity-0 lg:border-none pointer-events-none lg:overflow-hidden'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 shrink-0 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
              <h2 className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest">
                Navegador de Preguntas
              </h2>
            </div>
            <button
              onClick={onClose}
              id="close-sidebar-btn"
              className="flex items-center gap-1 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition text-xs font-medium"
              title="Ocultar panel (Pantalla completa)"
              aria-label="Ocultar panel de preguntas"
            >
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Ocultar</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>Progreso general: {stats.answered}/{stats.total}</span>
              <span className="font-bold text-slate-900 dark:text-white">{stats.progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden flex">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${(stats.correct / stats.total) * 100}%` }}
              />
              <div
                className="bg-rose-500 h-full transition-all duration-300"
                style={{ width: `${(stats.incorrect / stats.total) * 100}%` }}
              />
              <div
                className="bg-indigo-500 h-full transition-all duration-300"
                style={{ width: `${((stats.answered - stats.correct - stats.incorrect) / stats.total) * 100}%` }}
              />
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="sidebar-search-input"
              type="text"
              placeholder="Buscar tema, concepto o #..."
              value={filters.searchQuery}
              onChange={e => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white transition"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <select
              id="category-filter-select"
              value={filters.category}
              onChange={e => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="w-full text-xs py-2 px-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Todas' },
              { id: 'unanswered', label: 'Pendientes' },
              { id: 'flagged', label: 'Marcadas' },
              { id: 'correct', label: 'Aciertos' },
              { id: 'incorrect', label: 'Fallos' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilters(prev => ({ ...prev, status: f.id as any }))}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                  filters.status === f.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question Grid list */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {filteredQuestions.length} de {allQuestions.length} preguntas
            </span>
          </div>

          {filteredQuestions.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No se encontraron preguntas con los filtros actuales.
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-2">
              {filteredQuestions.map((q, idx) => {
                const record = answers[q.id];
                const isCurrent = idx === currentIndex;
                const isAnswered = record && record.selectedLetters.length > 0;
                const isSubmitted = record && record.isSubmitted;
                const isCorrect = record && record.isCorrect;
                const isFlagged = record && record.isFlagged;

                let btnStyle = "bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-slate-700 hover:border-slate-300";

                if (isSubmitted) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 font-bold";
                  } else {
                    btnStyle = "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700 font-bold";
                  }
                } else if (isAnswered) {
                  btnStyle = "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700 font-semibold";
                }

                if (isCurrent) {
                  btnStyle = "bg-indigo-600 text-white border-transparent font-bold ring-4 ring-indigo-100 dark:ring-indigo-900/60 scale-105 z-10 shadow-md shadow-indigo-100 dark:shadow-none";
                }

                return (
                  <button
                    key={q.id}
                    id={`sidebar-question-${idx + 1}`}
                    onClick={() => {
                      onSelectQuestion(idx);
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={`relative h-10 rounded-xl text-xs font-semibold flex items-center justify-center border transition-all duration-150 ${btnStyle}`}
                  >
                    <span>{idx + 1}</span>
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-xs">
                        <Bookmark className="w-2 h-2 fill-current" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Help Tip Card in Sidebar */}
          <div className="mt-6 p-3.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
            <p className="text-xs text-indigo-700 dark:text-indigo-300 font-bold mb-1 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              Tip de Estudio
            </p>
            <p className="text-[11px] text-indigo-600/90 dark:text-indigo-400/90 leading-relaxed">
              Marca las preguntas dudosas presionando <strong className="font-mono bg-white dark:bg-slate-900 px-1 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">F</strong> para repasarlas antes de finalizar.
            </p>
          </div>
        </div>

        {/* Legend Footer */}
        <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 text-[11px] text-slate-500 dark:text-slate-400 space-y-1.5 shrink-0">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span>Correcta</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              <span>Incorrecta</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
              <span>Respondida</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
              <span>Pendiente</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
