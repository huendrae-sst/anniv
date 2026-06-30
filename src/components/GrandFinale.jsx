import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Sparkles, Mail, Eye, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GrandFinale({ stopQuizMusic }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [typedLength, setTypedLength] = useState(0);
  const messageText = 
    "Sayangku,\n\n" +
    "Selamat hari jadi pernikahan kita yang ke-2! Gak terasa ya waktu berjalan begitu cepat. " +
    "Dua tahun ini penuh warna, kebersamaan, canda, tawa, dan sedikit bumbu-bumbu cemberut manis darimu.\n\n" +
    "Terima kasih sudah menjadi istri terbaik, rekan petualang terbaik, dan pendengar paling setia. " +
    "Aku bersyukur setiap hari karena memilikimu di sisiku.\n\n" +
    "Mari kita terus melangkah bersama, menulis lembaran baru kisah kita dengan penuh kasih dan kebahagiaan.\n\n" +
    "Dengan segenap cintaku,\n" +
    "Suamimu 💖";

  const typedMessage = messageText.slice(0, typedLength);
  const galleryRef = useRef(null);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  // Cleanup interval and audio on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      if (stopQuizMusic) {
        stopQuizMusic();
      }
      // Play background music
      try {
        const audio = new Audio('/maher.mp3');
        audio.loop = true;
        audio.volume = 0.5; // 50% volume
        audio.play().catch(err => console.log("Audio play blocked/failed:", err));
        audioRef.current = audio;
      } catch (err) {
        console.error("Failed to play audio:", err);
      }
      setIsOpen(true);
      // Trigger confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
      // Fire side confettis too
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
      }, 250);
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 400);

      // Typing animation start
      intervalRef.current = setInterval(() => {
        setTypedLength((prev) => {
          if (prev >= messageText.length) {
            clearInterval(intervalRef.current);
            // Show gallery after message typing completes
            setTimeout(() => setShowGallery(true), 1000);
            return prev;
          }
          return prev + 1;
        });
      }, 40); // speed of typing
    }
  };

  const images = [
    {
      src: "/images/first_date.png",
      caption: "Kencan pertama kita",
      desc: "Momen gugup tapi manis saat pertama kali melangkah berdua..."
    },
    {
      src: "/images/proposal_day.png",
      caption: "Lamaran kita",
      desc: "Janji awal untuk mengikat komitmen selamanya..."
    },
    {
      src: "/images/wedding_day.png",
      caption: "Hari pernikahan",
      desc: "Saat dua keluarga menyatu dan janji suci terucap indah..."
    },
    {
      src: "/images/couple_adventure.png",
      caption: "Bulan madu pertama",
      desc: "Petualangan pertama kita sebagai sepasang suami istri..."
    },
    {
      src: "/images/anniversary_cake.png",
      caption: "Tahun kedua kita",
      desc: "Dua tahun bersama, bersiap menyambut petualangan tak terhingga..."
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start py-12 px-4 bg-gradient-to-b from-warm-stone via-rose-50 to-rose-gold-light/30 overflow-x-hidden">
      
      {/* Background Hearts */}
      <div className="absolute top-10 left-10 text-rose-gold-light opacity-30 animate-bounce duration-5000">
        <Heart size={40} fill="currentColor" />
      </div>
      <div className="absolute top-1/3 right-10 text-rose-gold-light opacity-30 animate-bounce duration-7000">
        <Heart size={30} fill="currentColor" />
      </div>

      {/* Title */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="text-center mb-10 z-10"
      >
        <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-gold-dark font-semibold text-xs px-3 py-1 rounded-full border border-rose-200 mb-2 uppercase tracking-wider">
          <Award size={12} /> Hore, Kamu Berhasil!
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-rose-gold-dark drop-shadow-sm">
          Happy 2nd Anniversary!
        </h1>
        <p className="text-gray-600 mt-2 font-medium text-sm md:text-base">
          Sentuh amplop di bawah ini untuk membuka surat cintamu...💌
        </p>
      </motion.div>

      {/* Interactive Envelope Area */}
      <div className="h-[360px] flex items-center justify-center mb-10 relative z-20">
        <div className="envelope-wrapper" onClick={handleOpenEnvelope}>
          <div className={`envelope cursor-pointer transition-transform duration-300 ${isOpen ? '' : 'hover:scale-105'}`}>
            {/* Envelope Flap */}
            <div className={`envelope-flap ${isOpen ? 'open' : ''}`}></div>
            
            {/* Envelope Pocket */}
            <div className="envelope-pocket"></div>
            
            {/* The Heart Stamp */}
            {!isOpen && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-md border border-rose-200 z-10 animate-pulse">
                <Heart size={28} className="text-romantic-pink" fill="currentColor" />
              </div>
            )}

            {/* Letter Inside */}
            <div className={`envelope-letter ${isOpen ? 'extracted' : ''} text-left overflow-y-auto`}>
              {isOpen ? (
                <div className="font-sans text-gray-700 text-sm md:text-base whitespace-pre-line leading-relaxed">
                  {typedMessage}
                  <span className="animate-pulse font-bold text-rose-gold">|</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-rose-gold-dark/40">
                  <Mail size={32} />
                  <span className="text-xs mt-1 font-bold">Surat Khusus Istriku</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Scroll Gallery */}
      {showGallery && (
        <motion.div
          ref={galleryRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-md w-full mt-12 space-y-12 px-2"
        >
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl font-bold text-rose-gold-dark flex items-center justify-center gap-2">
              <Sparkles size={20} className="text-amber-gold" /> Galeri Memori Kita <Sparkles size={20} className="text-amber-gold" />
            </h2>
            <p className="text-gray-500 text-xs md:text-sm mt-1">Scroll ke bawah untuk melihat perjalanan kita</p>
          </div>

          {images.map((img, idx) => (
            <GalleryItem key={idx} img={img} index={idx} />
          ))}

          {/* Sweet Closing */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center py-12"
          >
            <div className="inline-block relative">
              <Heart size={50} className="text-romantic-pink mx-auto animate-pulse" fill="currentColor" />
              <Sparkles size={20} className="text-amber-gold absolute -top-2 -right-2 animate-bounce" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-rose-gold-dark mt-4">
              To Be Continued...
            </h3>
            <p className="text-gray-600 mt-2 font-medium text-sm">
              Menatap masa depan bersama dengan penuh keyakinan dan cinta.
            </p>
            <p className="font-handwritten text-3xl text-romantic-pink mt-6">
              I Love You More & More
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function GalleryItem({ img, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="glass-panel p-4 rounded-3xl shadow-lg border border-rose-gold-light/20 flex flex-col overflow-hidden"
    >
      <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-rose-100 shadow-inner group">
        <img
          src={img.src}
          alt={img.caption}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
        <span className="absolute bottom-3 left-4 text-white font-serif text-lg font-bold">
          {img.caption}
        </span>
      </div>
      <div className="py-4 px-2">
        <p className="text-gray-600 text-sm leading-relaxed font-sans font-medium">
          {img.desc}
        </p>
      </div>
    </motion.div>
  );
}
