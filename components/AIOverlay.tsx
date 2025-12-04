import React, { useState, useEffect } from 'react';
import { X, BrainCircuit, CheckCircle2, TrendingUp } from './Icons';
import { Video } from '../types';
import { generateSummary, generateQuiz, QuizQuestion } from '../services/geminiService';

interface AIOverlayProps {
  video: Video;
  isOpen: boolean;
  onClose: () => void;
  onXPEarned: (amount: number) => void;
}

const AIOverlay: React.FC<AIOverlayProps> = ({ video, isOpen, onClose, onXPEarned }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'quiz'>('summary');
  const [summary, setSummary] = useState<string>('');
  const [quiz, setQuiz] = useState<QuizQuestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<'correct' | 'incorrect' | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Reset state on open
      setSummary('');
      setQuiz(null);
      setSelectedOption(null);
      setQuizResult(null);
      setActiveTab('summary');
      loadAIContent();
    }
  }, [isOpen, video]);

  const loadAIContent = async () => {
    setLoading(true);
    // Parallel fetch for speed
    const [sumRes, quizRes] = await Promise.all([
      generateSummary(video),
      generateQuiz(video)
    ]);
    setSummary(sumRes);
    setQuiz(quizRes);
    setLoading(false);
  };

  const handleQuizAnswer = (index: number) => {
    if (quizResult !== null) return; // Prevent multiple guesses
    setSelectedOption(index);
    
    if (quiz && index === quiz.correctAnswerIndex) {
      setQuizResult('correct');
      onXPEarned(50); // Give 50 XP for correct answer
    } else {
      setQuizResult('incorrect');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md h-[70vh] bg-gray-900 rounded-t-3xl border-t border-gray-700 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2 text-purple-400">
            <BrainCircuit size={20} />
            <span className="font-bold text-lg">AI Knowledge Check</span>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex p-2 bg-gray-900 gap-2">
          <button 
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'summary' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400'}`}
            onClick={() => setActiveTab('summary')}
          >
            Summary
          </button>
          <button 
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'quiz' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}
            onClick={() => setActiveTab('quiz')}
          >
            Quick Quiz
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p>Gemini is analyzing...</p>
            </div>
          ) : (
            <>
              {activeTab === 'summary' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-2">Key Takeaways</h3>
                  <div className="space-y-3">
                    {summary.split('\n').map((line, i) => (
                      line.trim() && (
                        <div key={i} className="flex gap-3 items-start p-3 bg-gray-800/50 rounded-xl border border-gray-700">
                          <CheckCircle2 size={18} className="text-purple-400 mt-1 flex-shrink-0" />
                          <p className="text-gray-200 text-sm leading-relaxed">{line.replace(/^[-*•]\s*/, '')}</p>
                        </div>
                      )
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-xl border border-purple-500/30">
                    <div className="flex items-center gap-2 mb-2 text-purple-300">
                      <TrendingUp size={16} />
                      <span className="font-bold text-xs uppercase tracking-wider">Why it matters</span>
                    </div>
                    <p className="text-xs text-gray-400">This concept is foundational for {video.category} and appears in 85% of related job interviews.</p>
                  </div>
                </div>
              )}

              {activeTab === 'quiz' && quiz && (
                <div className="space-y-6">
                  <div className="mb-4">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 block">Question</span>
                    <h3 className="text-lg font-bold text-white leading-snug">{quiz.question}</h3>
                  </div>

                  <div className="space-y-3">
                    {quiz.options.map((option, idx) => {
                      let btnClass = "w-full p-4 rounded-xl text-left border transition-all duration-200 relative ";
                      
                      if (selectedOption === null) {
                        btnClass += "bg-gray-800 border-gray-700 hover:border-gray-500 text-gray-200";
                      } else if (idx === quiz.correctAnswerIndex) {
                        btnClass += "bg-green-900/30 border-green-500 text-green-100";
                      } else if (selectedOption === idx) {
                        btnClass += "bg-red-900/30 border-red-500 text-red-100";
                      } else {
                        btnClass += "bg-gray-800 border-gray-700 text-gray-500 opacity-50";
                      }

                      return (
                        <button 
                          key={idx}
                          onClick={() => handleQuizAnswer(idx)}
                          disabled={selectedOption !== null}
                          className={btnClass}
                        >
                          <span className="text-sm font-medium">{option}</span>
                          {selectedOption !== null && idx === quiz.correctAnswerIndex && (
                            <CheckCircle2 size={20} className="absolute right-4 top-4 text-green-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizResult === 'correct' && (
                    <div className="text-center animate-in zoom-in duration-300 py-4">
                      <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                        +50 XP Earned!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIOverlay;