import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden bg-gradient-to-b from-warm-stone to-rose-gold-light/20">
      
      {/* Decorative Blur Spheres for colorful aesthetic */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-rose-200/40 blur-3xl -z-10 animate-pulse duration-10000" />
      <div className="absolute bottom-1/4 right-1/10 w-80 h-80 rounded-full bg-amber-100/40 blur-3xl -z-10 animate-pulse duration-7000" />

      {/* Floating Sparkles */}
      <motion.div
        animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute top-1/5 right-1/4 text-rose-gold"
      >
        <Sparkles size={24} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/5 left-1/4 text-rose-gold-dark"
      >
        <Heart size={20} fill="currentColor" />
      </motion.div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-md w-full glass-panel rounded-3xl p-8 shadow-xl relative z-10 border border-rose-gold-light/30"
      >
        {/* Heart Icon Container */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mx-auto w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mb-6 shadow-inner border border-rose-200"
        >
          <Heart className="text-romantic-pink neon-border-heart" size={40} fill="currentColor" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-serif text-4xl font-bold tracking-tight text-rose-gold-dark mb-2"
        >
          Our 2 Years Journey
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-gray-600 font-medium mb-8 text-sm md:text-base leading-relaxed"
        >
          Sebuah perjalanan penuh tawa, cinta, dan ribuan memori indah berdua. 
          Siap untuk menguji ingatanmu tentang kisah kita? 💖
        </motion.p>

        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="w-full py-4 bg-gradient-to-r from-rose-gold to-romantic-pink text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Mulai Nostalgia</span>
          <Heart size={18} fill="currentColor" />
        </motion.button>
      </motion.div>

      {/* Footer Branding */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 font-handwritten text-xl text-rose-gold-dark"
      >
        Happy 2nd Anniversary, Sayang...
      </motion.p>
    </div>
  );
}
