import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, Sparkles, HelpCircle } from 'lucide-react';
import { questions } from '../data/questions';

export default function QuizScreen({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [showClue, setShowClue] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanAnswer = answer.trim().toLowerCase();
    const correctAnswer = currentQuestion.jawabanBenar.trim().toLowerCase();

    if (cleanAnswer === correctAnswer) {
      setIsWrong(false);
      setShowClue(false);
      setWrongCount(0);
      setAnswer('');
      
      // Go to next question or complete
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onComplete();
      }
    } else {
      // Trigger shake animation and clue
      setIsWrong(true);
      setShowClue(true);
      setWrongCount((prev) => prev + 1);
      // Reset shake after animation completes
      setTimeout(() => setIsWrong(false), 500);
    }
  };

  const handleSkip = () => {
    setIsWrong(false);
    setShowClue(false);
    setWrongCount(0);
    setAnswer('');
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  // Shake variant
  const cardVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      transition: { duration: 0.5 }
    },
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-warm-stone to-amber-100/20 overflow-hidden">
      
      {/* Decorative colorful elements */}
      <div className="absolute top-1/10 right-1/10 w-64 h-64 rounded-full bg-amber-100/50 blur-3xl -z-10" />
      <div className="absolute bottom-1/10 left-1/10 w-72 h-72 rounded-full bg-rose-100/40 blur-3xl -z-10" />

      {/* Main Container */}
      <div className="max-w-md w-full relative z-10">
        
        {/* Heart Progress Indicator */}
        <div className="flex justify-between items-center mb-8 px-2">
          {questions.map((q, idx) => {
            const isCompleted = idx < currentIndex;
            const isActive = idx === currentIndex;
            return (
              <motion.div
                key={q.id}
                animate={isActive ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={isActive ? { repeat: Infinity, duration: 1.5 } : {}}
                className={`relative flex items-center justify-center`}
              >
                <Heart
                  size={isActive ? 22 : 18}
                  fill={isCompleted || isActive ? "#ff6b8b" : "none"}
                  className={`${
                    isCompleted || isActive
                      ? "text-romantic-pink drop-shadow-sm"
                      : "text-rose-gold-light"
                  } transition-colors duration-300`}
                />
                {isActive && (
                  <span className="absolute -top-6 text-[10px] font-bold text-rose-gold font-sans bg-rose-100 px-1.5 py-0.5 rounded-full border border-rose-200">
                    {idx + 1}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Quiz Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={cardVariants}
            initial="initial"
            animate={isWrong ? "shake" : "animate"}
            exit="exit"
            transition={{ duration: 0.4 }}
            className="glass-panel rounded-3xl p-8 shadow-xl border border-rose-gold-light/30 flex flex-col min-h-[350px]"
          >
            {/* Header info */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs uppercase font-bold tracking-widest text-rose-gold-dark/70 flex items-center gap-1.5">
                <HelpCircle size={14} /> Pertanyaan {currentIndex + 1} dari 10
              </span>
              <span className="text-xs font-bold text-amber-gold flex items-center gap-1">
                <Sparkles size={12} /> Nostalgia Time
              </span>
            </div>

            {/* Question Text */}
            <h2 className="font-serif text-lg md:text-xl font-semibold text-rose-gold-dark mb-6 leading-relaxed flex-grow">
              {currentQuestion.pertanyaan}
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-auto space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ketik jawabanmu di sini..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className={`w-full px-5 py-4 rounded-2xl bg-white/70 border ${
                    isWrong ? "border-red-400 focus:ring-red-200" : "border-rose-gold-light focus:ring-rose-gold-light/50"
                  } focus:border-rose-gold focus:outline-none focus:ring-4 transition duration-200 pr-12 text-gray-800 font-medium`}
                  autoFocus
                  required
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-gold hover:text-romantic-pink p-2 transition cursor-pointer"
                >
                  <Send size={20} />
                </button>
              </div>

              {/* Clue message if wrong */}
              <AnimatePresence>
                {showClue && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs md:text-sm font-medium leading-relaxed space-y-3"
                  >
                    <div>
                      😔 <strong>Aduhh salah sayang!</strong> <br />
                      Clue: <em>"{currentQuestion.clueSalah}"</em>
                    </div>
                    
                    {wrongCount >= 3 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="pt-2 border-t border-red-200/50 flex flex-col gap-2"
                      >
                        <p className="text-rose-gold-dark font-sans text-xs italic">
                          "{currentQuestion.pesanSkip}"
                        </p>
                        <button
                          type="button"
                          onClick={handleSkip}
                          className="w-full py-2 px-4 bg-gradient-to-r from-rose-gold to-romantic-pink text-white text-xs font-semibold rounded-xl shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
                        >
                          Skip Pertanyaan Ini
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
