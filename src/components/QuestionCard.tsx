import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  EyeOff, 
  MessageSquare, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Save, 
  Sparkles,
  HelpCircle,
  Check,
  RotateCcw
} from 'lucide-react';
import { Question, UserAnswerRecord, ExamMode } from '../types';

const OPTION_LABEL_RE = /(Opci[oó]n\s+[A-F](?:\s*\([^)]*\))?\s*:)/gi;

function renderExplanation(text: string): React.ReactNode {
  const lines = text
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .flatMap(line => line.split(OPTION_LABEL_RE).filter(part => part.trim() !== ''));

  const paragraphs: React.ReactNode[] = [];
  let current: React.ReactNode[] = [];

  const flush = () => {
    if (current.length > 0) {
      paragraphs.push(<p key={paragraphs.length}>{current}</p>);
      current = [];
    }
  };

  lines.forEach((part, idx) => {
    if (OPTION_LABEL_RE.test(part)) {
      OPTION_LABEL_RE.lastIndex = 0;
      flush();
      current.push(<strong key={`label-${idx}`}>{part}</strong>);
    } else {
      current.push(<span key={`text-${idx}`}> {part}</span>);
    }
  });
  flush();

  return paragraphs.length > 0 ? <div className="space-y-2">{paragraphs}</div> : text;
}

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  totalFiltered: number;
  answerRecord?: UserAnswerRecord;
  mode: ExamMode;
  isSidebarOpen?: boolean;
  onSelectChoice: (question: Question, letter: string) => void;
  onCheckAnswer: (questionId: number) => void;
  onResetQuestion?: (questionId: number) => void;
  onToggleFlag: (questionId: number) => void;
  onSaveNotes: (questionId: number, notes: string) => void;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionIndex,
  totalFiltered,
  answerRecord,
  mode,
  isSidebarOpen = true,
  onSelectChoice,
  onCheckAnswer,
  onResetQuestion,
  onToggleFlag,
  onSaveNotes,
  onNext,
  onPrev,
  hasPrev,
  hasNext
}) => {
  const [showAnswerForced, setShowAnswerForced] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showNotesEditor, setShowNotesEditor] = useState(false);
  const [noteText, setNoteText] = useState(answerRecord?.notes || '');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Sync note text when question changes
  useEffect(() => {
    setNoteText(answerRecord?.notes || '');
    setShowAnswerForced(false);
  }, [question.id, answerRecord?.notes]);

  const selectedLetters = answerRecord?.selectedLetters || [];
  const isSubmitted = Boolean(answerRecord?.isSubmitted);
  const isAnswerRevealed = showAnswerForced || isSubmitted;
  const isFlagged = Boolean(answerRecord?.isFlagged);

  // Text to Speech
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert("La síntesis de voz no está soportada en tu navegador.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${question.question}. Options: ${question.choices.map(c => `Option ${c.letter}: ${c.text}`).join('. ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid hotkeys when typing notes
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === 'ArrowLeft' && hasPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNext();
      } else if (e.key.toLowerCase() === 'f') {
        onToggleFlag(question.id);
      } else if (e.key === 'Enter' || e.key.toLowerCase() === 'c') {
        if (selectedLetters.length > 0 && !isSubmitted) {
          onCheckAnswer(question.id);
        }
      } else if (['a', 'b', 'c', 'd', 'e', 'f'].includes(e.key.toLowerCase())) {
        const targetLetter = e.key.toUpperCase();
        const choiceExists = question.choices.some(c => c.letter === targetLetter);
        if (choiceExists) {
          onSelectChoice(question, targetLetter);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question, hasPrev, hasNext, onPrev, onNext, onSelectChoice, onToggleFlag, onCheckAnswer, selectedLetters, isSubmitted]);

  const handleSaveNote = () => {
    onSaveNotes(question.id, noteText);
    setShowNotesEditor(false);
  };

  return (
    <div id={`question-card-${question.questionNumber}`} className={`mx-auto space-y-5 transition-all duration-300 ${isSidebarOpen ? 'max-w-4xl' : 'max-w-5xl'}`}>
      
      {/* Main Question Card Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        
        {/* Card Header: Numbers, Category, Flags, TTS */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60">
              Pregunta {questionIndex + 1} de {totalFiltered}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {question.category}
            </span>
            {question.multiSelect ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Selección Múltiple ({selectedLetters.length}/{question.requiredCount})
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400">
                Opción Única
              </span>
            )}
          </div>

          {/* Action buttons on header */}
          <div className="flex items-center gap-2">
            <button
              id="read-aloud-btn"
              onClick={toggleSpeech}
              title={isSpeaking ? "Detener lectura" : "Escuchar pregunta en inglés"}
              className={`p-2 rounded-xl text-xs font-medium border transition ${
                isSpeaking 
                  ? 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-200 dark:border-indigo-700 animate-pulse'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-indigo-600" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              id={`flag-question-btn-${question.questionNumber}`}
              onClick={() => onToggleFlag(question.id)}
              title={isFlagged ? "Desmarcar pregunta" : "Marcar para repasar más tarde (Tecla F)"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                isFlagged
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isFlagged ? 'fill-white' : ''}`} />
              <span className="hidden sm:inline">{isFlagged ? 'Marcada' : 'Marcar'}</span>
            </button>
          </div>
        </div>

        {/* Question Body */}
        <div className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 leading-relaxed mb-6 select-text">
          {question.question}
        </div>

        {/* Choice Options List */}
        <div className="space-y-3 mb-5" role="radiogroup">
          {question.choices.map((choice) => {
            const isSelected = selectedLetters.includes(choice.letter);
            const isCorrect = choice.isCorrect;

            let cardStyle = "bg-slate-50/60 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700/60";
            let badgeStyle = "border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800";

            if (isAnswerRevealed) {
              if (isCorrect) {
                cardStyle = "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500/50 font-medium";
                badgeStyle = "bg-emerald-500 text-white border-emerald-500";
              } else if (isSelected && !isCorrect) {
                cardStyle = "bg-rose-50/90 dark:bg-rose-950/40 border-rose-400 text-rose-950 dark:text-rose-200";
                badgeStyle = "bg-rose-500 text-white border-rose-500";
              }
            } else if (isSelected) {
              cardStyle = "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-950 dark:text-indigo-100 ring-1 ring-indigo-500/50 font-medium";
              badgeStyle = "bg-indigo-600 text-white border-indigo-600 shadow-xs";
            }

            return (
              <div
                key={choice.letter}
                id={`choice-${choice.letter}-q${question.questionNumber}`}
                onClick={() => onSelectChoice(question, choice.letter)}
                className={`group flex items-start gap-4 p-4.5 rounded-2xl border-2 cursor-pointer transition-all duration-150 ${cardStyle}`}
              >
                {/* Option Letter Pill Badge */}
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-bold text-xs transition-colors ${badgeStyle}`}>
                  {choice.letter}
                </div>

                {/* Option Text */}
                <div className="flex-1 text-sm sm:text-base leading-relaxed pt-1 select-text">
                  {choice.text}
                </div>

                {/* Result Indicator Icon */}
                {isAnswerRevealed && (
                  <div className="shrink-0 pt-1">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Correction Action Section */}
        {!isSubmitted ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-slate-50/80 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 mb-6">
            <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
              {question.multiSelect ? (
                <span>
                  Selecciona <strong className="text-slate-900 dark:text-white">{question.requiredCount}</strong> opciones: (elegidas: <strong className="text-indigo-600 dark:text-indigo-400">{selectedLetters.length > 0 ? selectedLetters.join(', ') : 'ninguna'}</strong>)
                </span>
              ) : (
                <span>
                  {selectedLetters.length > 0 ? (
                    <>Opción elegida: <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{selectedLetters[0]}</strong> (pulsa Corregir para validar)</>
                  ) : (
                    <>Selecciona una opción y pulsa <strong className="text-slate-900 dark:text-white font-bold">Corregir</strong></>
                  )}
                </span>
              )}
            </div>

            <button
              type="button"
              id={`check-answer-btn-q${question.questionNumber}`}
              onClick={() => onCheckAnswer(question.id)}
              disabled={selectedLetters.length === 0}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-indigo-100 dark:shadow-none transition active:scale-98"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Corregir</span>
            </button>
          </div>
        ) : (
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl border mb-6 animate-in fade-in duration-200 ${
            answerRecord?.isCorrect
              ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/80'
              : 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800/80'
          }`}>
            <div className="flex items-center gap-3">
              {answerRecord?.isCorrect ? (
                <>
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 block">
                      ¡Respuesta Correcta!
                    </span>
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-400">
                      Has acertado la opción oficial de AWS.
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <XCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-rose-900 dark:text-rose-200 block">
                      Respuesta Incorrecta
                    </span>
                    <span className="text-[11px] text-rose-700 dark:text-rose-400">
                      Respuesta correcta: <strong className="font-bold underline">{question.choices.filter(c => c.isCorrect).map(c => c.letter).join(', ')}</strong>
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {onResetQuestion && (
                <button
                  type="button"
                  id={`retry-q${question.questionNumber}-btn`}
                  onClick={() => onResetQuestion(question.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-xs"
                  title="Limpiar respuesta y volver a intentar"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reintentar</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowComments(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Ver Explicación</span>
              </button>
            </div>
          </div>
        )}

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            {mode === 'practice' && (
              <button
                id="toggle-reveal-answer-btn"
                onClick={() => setShowAnswerForced(prev => !prev)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
              >
                {isAnswerRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{isAnswerRevealed ? 'Ocultar Respuesta' : 'Revelar Respuesta'}</span>
              </button>
            )}

            <button
              id="toggle-comments-btn"
              onClick={() => setShowComments(prev => !prev)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                showComments
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{showComments ? 'Ocultar Explicación' : 'Ver Explicación'}</span>
            </button>

            <button
              id="toggle-notes-btn"
              onClick={() => setShowNotesEditor(prev => !prev)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                answerRecord?.notes
                  ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{answerRecord?.notes ? 'Mis Notas (1)' : 'Añadir Notas'}</span>
            </button>
          </div>

          {/* Navigation Prev / Next Buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              id="prev-question-btn"
              onClick={onPrev}
              disabled={!hasPrev}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Anterior</span>
            </button>
            <button
              id="next-question-btn"
              onClick={onNext}
              disabled={!hasNext}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-indigo-100 dark:shadow-none transition"
            >
              <span className="hidden sm:inline">Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Notes Editor Accordion / Panel */}
      {showNotesEditor && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-indigo-200 dark:border-indigo-900/60 shadow-xs space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Notas de Estudio para Pregunta {question.questionNumber}</span>
            </div>
            <button
              onClick={() => setShowNotesEditor(false)}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Cerrar
            </button>
          </div>
          <textarea
            id="question-notes-textarea"
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            placeholder="Escribe aquí tus apuntes, trucos mnemotécnicos o dudas para repasar..."
            rows={3}
            className="w-full text-xs sm:text-sm p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex justify-end gap-2">
            <button
              id="save-notes-btn"
              onClick={handleSaveNote}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition"
            >
              <Save className="w-3.5 h-3.5" />
              Guardar Nota
            </button>
          </div>
        </div>
      )}

      {/* Explanation & Discussion Section */}
      {showComments && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-indigo-200/80 dark:border-indigo-900/50 shadow-xs space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">
                Explicación Oficial & Guía del Examen
              </h3>
            </div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              Respuesta Correcta: {question.choices.filter(c => c.isCorrect).map(c => c.letter).join(', ')}
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            {question.comments
              ? renderExplanation(question.comments)
              : "No hay comentarios adicionales para esta pregunta."}
          </div>
        </div>
      )}

    </div>
  );
};
