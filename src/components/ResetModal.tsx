import React from 'react';
import { RotateCcw, AlertTriangle, X, Trash2, RefreshCw, Undo2 } from 'lucide-react';
import { ExamMode } from '../types';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ExamMode;
  currentQuestionNumber: number;
  currentQuestionId: number;
  onResetAll: () => void;
  onResetCurrentExam: () => void;
  onResetCurrentQuestion: (questionId: number) => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onClose,
  mode,
  currentQuestionNumber,
  currentQuestionId,
  onResetAll,
  onResetCurrentExam,
  onResetCurrentQuestion,
}) => {
  if (!isOpen) return null;

  const handleResetAll = () => {
    onResetAll();
    onClose();
  };

  const handleResetCurrentExam = () => {
    onResetCurrentExam();
    onClose();
  };

  const handleResetCurrentQuestion = () => {
    onResetCurrentQuestion(currentQuestionId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Reiniciar Progreso
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Selecciona el tipo de reinicio que deseas aplicar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {/* Option 1: Reset Current Exam (if in exam mode) */}
          {mode === 'exam' && (
            <button
              type="button"
              id="reset-current-exam-action-btn"
              onClick={handleResetCurrentExam}
              className="w-full text-left p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800/70 bg-indigo-50/50 dark:bg-indigo-950/30 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition group flex items-start gap-3.5"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-indigo-950 dark:text-indigo-200 mb-0.5">
                  Reiniciar Examen en Curso
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Reinicia el temporizador y borra las respuestas de esta sesión de examen para empezar desde la pregunta 1.
                </p>
              </div>
            </button>
          )}

          {/* Option 2: Reset Single Question */}
          <button
            type="button"
            id="reset-single-question-action-btn"
            onClick={handleResetCurrentQuestion}
            className="w-full text-left p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition group flex items-start gap-3.5"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
              <Undo2 className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">
                Limpiar Pregunta #{currentQuestionNumber}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Desmarca la opción elegida y quita la corrección de esta pregunta para volver a responderla.
              </p>
            </div>
          </button>

          {/* Option 3: Complete Wipe */}
          <button
            type="button"
            id="reset-all-action-btn"
            onClick={handleResetAll}
            className="w-full text-left p-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 hover:bg-rose-50/80 dark:hover:bg-rose-950/40 transition group flex items-start gap-3.5"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <Trash2 className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-rose-900 dark:text-rose-300 mb-0.5">
                Reiniciar TODO el Progreso (97 Preguntas)
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Borra todas las respuestas guardadas, estadísticas acumuladas y regresa al inicio en Modo Práctica.
              </p>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
