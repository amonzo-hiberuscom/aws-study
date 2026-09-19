import React from 'react';
import { GraduationCap, ArrowRight, BookMarked } from 'lucide-react';
import { ExamDefinition } from '../data/exams';

interface ExamMenuProps {
  exams: ExamDefinition[];
  onSelectExam: (examId: string) => void;
  theme: 'light' | 'dark';
}

export const ExamMenu: React.FC<ExamMenuProps> = ({ exams, onSelectExam, theme }) => {
  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-4 sm:p-8 font-sans transition-colors`}>
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-indigo-200 dark:shadow-none">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Centro de Certificaciones AWS
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Elige el examen que quieres practicar
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {exams.map(exam => (
            <button
              key={exam.id}
              onClick={() => onSelectExam(exam.id)}
              className="group text-left p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {exam.code}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                {exam.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {exam.description}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 pt-1">
                <BookMarked className="w-3.5 h-3.5 text-indigo-500" />
                {exam.questions.length} preguntas oficiales
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
