import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw, 
  ArrowRight, 
  BookOpen, 
  Sparkles,
  BarChart2,
  X
} from 'lucide-react';
import { Question, UserAnswerRecord, ExamHistoryItem } from '../types';

interface ExamResultsProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  answers: Record<number, UserAnswerRecord>;
  onReviewIncorrect: () => void;
  onReviewAll: () => void;
  onRestart: () => void;
  timeSpentSeconds: number;
}

export const ExamResults: React.FC<ExamResultsProps> = ({
  isOpen,
  onClose,
  questions,
  answers,
  onReviewIncorrect,
  onReviewAll,
  onRestart,
  timeSpentSeconds
}) => {
  if (!isOpen) return null;

  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;
  const categoryStats: Record<string, { correct: number; total: number }> = {};

  questions.forEach(q => {
    if (!categoryStats[q.category]) {
      categoryStats[q.category] = { correct: 0, total: 0 };
    }
    categoryStats[q.category].total += 1;

    const ans = answers[q.id];
    if (ans && ans.selectedLetters.length > 0) {
      const correctLetters = q.choices.filter(c => c.isCorrect).map(c => c.letter).sort();
      const isCorr = ans.selectedLetters.length === correctLetters.length &&
        ans.selectedLetters.every((l, i) => l === correctLetters[i]);
      if (isCorr) {
        correct++;
        categoryStats[q.category].correct++;
      } else {
        incorrect++;
      }
    } else {
      unanswered++;
    }
  });

  const total = questions.length;
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  // Scaled score AWS style (100 to 1000, 750 passing score ~ 75%)
  const awsScaledScore = Math.round(100 + (percent / 100) * 900);
  const isPassed = awsScaledScore >= 750;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}m ${s}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Resultados del Examen Oficial
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Puntuación oficial escalada según estándar AWS
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Hero Banner */}
        <div className={`p-6 sm:p-8 rounded-3xl border text-center space-y-2.5 ${
          isPassed 
            ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800' 
            : 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800'
        }`}>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-1"
               style={{
                 backgroundColor: isPassed ? '#10b981' : '#f43f5e',
                 color: '#ffffff'
               }}>
            {isPassed ? 'APROBADO (PASSED)' : 'NO SUPERADO (FAILED)'}
          </div>

          <div className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            {awsScaledScore} <span className="text-xl sm:text-2xl font-bold text-slate-400">/ 1000</span>
          </div>

          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            {percent}% de acierto • {correct} de {total} correctas (Corte para aprobar: 750 / 75%)
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Aciertos</span>
            </div>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{correct}</div>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <XCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>Fallos</span>
            </div>
            <div className="text-xl font-bold text-rose-600 dark:text-rose-400">{incorrect}</div>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Sin Responder</span>
            </div>
            <div className="text-xl font-bold text-slate-600 dark:text-slate-400">{unanswered}</div>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Tiempo</span>
            </div>
            <div className="text-xl font-bold text-slate-700 dark:text-slate-300">{formatTime(timeSpentSeconds)}</div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-indigo-600" />
            Desglose por Dominio
          </h3>

          <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1 custom-scrollbar">
            {Object.entries(categoryStats).map(([category, data]) => {
              const catPercent = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
              const isCatPassed = catPercent >= 75;
              return (
                <div key={category} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-medium text-slate-700 dark:text-slate-300">
                    <span className="truncate pr-2">{category}</span>
                    <span className={`font-bold ${isCatPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
                      {data.correct}/{data.total} ({catPercent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${isCatPassed ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                      style={{ width: `${catPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          {incorrect > 0 && (
            <button
              id="review-incorrect-btn"
              onClick={onReviewIncorrect}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition shadow-xs"
            >
              <XCircle className="w-4 h-4" />
              Revisar Falladas ({incorrect})
            </button>
          )}

          <button
            id="review-all-btn"
            onClick={onReviewAll}
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
          >
            <BookOpen className="w-4 h-4" />
            Revisar Todo
          </button>

          <button
            id="restart-exam-btn"
            onClick={onRestart}
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-md shadow-indigo-100 dark:shadow-none"
          >
            <RotateCcw className="w-4 h-4" />
            Nuevo Examen
          </button>
        </div>

      </div>
    </div>
  );
};
