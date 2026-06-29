import { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import GrandFinale from './components/GrandFinale';

function App() {
  const [screen, setScreen] = useState('welcome');
  const [backgroundHearts, setBackgroundHearts] = useState([]);

  // Generate background floating hearts
  useEffect(() => {
    const createHeart = () => {
      const id = Math.random();
      const left = Math.random() * 100; // random percentage position
      const size = Math.random() * (24 - 12) + 12; // random size from 12px to 24px
      const duration = Math.random() * (20 - 10) + 10; // random speed from 10s to 20s
      const floatX = Math.random() * (60 - -60) + -60; // offset animation drift
      const angle = Math.random() * 360;

      const heart = { id, left, size, duration, floatX, angle };
      setBackgroundHearts((prev) => [...prev, heart]);

      // Remove after duration
      setTimeout(() => {
        setBackgroundHearts((prev) => prev.filter((h) => h.id !== id));
      }, duration * 1000);
    };

    // Spawn heart periodically
    const interval = setInterval(createHeart, 2500);
    // Initial spawn
    for (let i = 0; i < 5; i++) {
      createHeart();
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 flex justify-center items-center">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md min-h-screen bg-warm-stone shadow-2xl relative flex flex-col overflow-hidden border-x border-rose-gold-light/20">
        
        {/* Floating background hearts */}
        {backgroundHearts.map((heart) => (
          <svg
            key={heart.id}
            style={{
              left: `${heart.left}%`,
              width: `${heart.size}px`,
              height: `${heart.size}px`,
              '--float-duration': `${heart.duration}s`,
              '--float-x': `${heart.floatX}px`,
              '--float-angle': `${heart.angle}deg`,
            }}
            className="floating-heart text-romantic-pink/40 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ))}

        {/* Active Screen State Manager */}
        {screen === 'welcome' && (
          <WelcomeScreen onStart={() => setScreen('quiz')} />
        )}
        {screen === 'quiz' && (
          <QuizScreen onComplete={() => setScreen('finale')} />
        )}
        {screen === 'finale' && (
          <GrandFinale />
        )}
      </div>
    </div>
  );
}

export default App;
