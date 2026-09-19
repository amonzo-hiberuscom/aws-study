import React, { useState } from 'react';
import { X, Clock, Play, CheckCircle2, Award, Zap, BookOpen } from 'lucide-react';

interface CustomQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartExam: (count: number, minutes: number, category?: string) => void;
  totalAvailable: number;
  categories: string[];
}

export const CustomQuizModal: React.FC<CustomQuizModalProps> = ({
  isOpen,
  onClose,
  onStartExam,
  totalAvailable,
  categories
}) => {
  const [selectedPreset, setSelectedPreset] = useState<'full' | 'sprint' | 'half' | 'custom'>('full');
  const [questionCount, setQuestionCount] = useState(totalAvailable);
  const [timeMinutes, setTimeMinutes] = useState(130);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');

  if (!isOpen) return null;

  const handleSelectPreset = (preset: 'full' | 'sprint' | 'half' | 'custom') => {
    setSelectedPreset(preset);
    if (preset === 'full') {
      setQuestionCount(totalAvailable);
      setTimeMinutes(130);
    } else if (preset === 'sprint') {
      setQuestionCount(20);
      setTimeMinutes(30);
    } else if (preset === 'half') {
      setQuestionCount(50);
      setTimeMinutes(65);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartExam(
      selectedPreset === 'full' ? totalAvailable : questionCount,
      timeMinutes,
      selectedCategory !== 'All Categories' ? selectedCategory : undefined
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Simulador de Examen AWS GenAI
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Configura tu prueba cronometrada oficial
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presets */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Formato de Examen
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                id: 'full',
                title: 'Examen Completo',
                desc: `${totalAvailable} preguntas • 130 min`,
                icon: Award,
                badge: 'Oficial'
              },
              {
                id: 'half',
                title: 'Medio Examen',
                desc: '50 preguntas • 65 min',
                icon: BookOpen,
                badge: 'Recomendado'
              },
              {
                id: 'sprint',
                title: 'Test Rápido',
                desc: '20 preguntas • 30 min',
                icon: Zap,
                badge: 'Sprint'
              },
              {
                id: 'custom',
                title: 'Personalizado',
                desc: 'Ajusta tiempo y preguntas',
                icon: Clock,
                badge: 'Custom'
              }
            ].map(preset => {
              const isSelected = selectedPreset === preset.id;
              const Icon = preset.icon;
              return (
                <div
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset.id as any)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 ring-1 ring-indigo-500'
                      : 'bg-slate-50/70 dark:bg-slate-800/60 border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                      {preset.badge}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{preset.title}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{preset.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Inputs if custom is selected */}
        {selectedPreset === 'custom' && (
          <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Nº de Preguntas
              </label>
              <input
                type="number"
                min={5}
                max={totalAvailable}
                value={questionCount}
                onChange={e => setQuestionCount(Math.min(totalAvailable, Math.max(5, parseInt(e.target.value) || 5)))}
                className="w-full text-xs p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Tiempo (Minutos)
              </label>
              <input
                type="number"
                min={5}
                max={240}
                value={timeMinutes}
                onChange={e => setTimeMinutes(Math.max(5, parseInt(e.target.value) || 30))}
                className="w-full text-xs p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}

        {/* Category restriction */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Filtrar Dominio Específico
          </label>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 font-medium focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Cancelar
          </button>
          <button
            type="button"
            id="start-exam-confirm-btn"
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100 dark:shadow-none transition"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Comenzar Examen
          </button>
        </div>

      </div>
    </div>
  );
};
