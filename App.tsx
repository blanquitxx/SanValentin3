import React, { useState, useRef, useEffect } from 'react';
import HeartBackground from './components/HeartBackground';
import Envelope from './components/Envelope';
import musicFile from './quelinda.mp3?url';

const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isStarted && audioRef.current) {
      audioRef.current.play().catch(e => {
        console.warn("No se pudo reproducir el audio:", e);
      });
    }
  }, [isStarted]);

  const handleStart = () => {
    setIsStarted(true);
    triggerHeartsEffect();
  };

  const triggerHeartsEffect = () => {
    const heartContainer = document.createElement('div');
    heartContainer.className = 'fixed inset-0 pointer-events-none';
    document.body.appendChild(heartContainer);

    for (let i = 0; i < 50; i++) {
      const heart = document.createElement('div');
      heart.className = 'absolute text-pink-500';
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.top = `${Math.random() * 100}vh`;
      heart.style.fontSize = `${Math.random() * 20 + 10}px`;
      heart.style.animation = `float-up ${Math.random() * 3 + 2}s ease-in-out forwards`;
      heart.textContent = '❤️';
      heartContainer.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 5000);
    }

    setTimeout(() => {
      heartContainer.remove();
    }, 5000);
  };

  const handleOpenEnvelope = () => {
    if (!isStarted) handleStart();
    setIsEnvelopeOpen(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden font-sans">
      <HeartBackground />

      {/* Audio Player */}
      <audio 
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src={musicFile} type="audio/mpeg" />
        Tu navegador no soporta reproducción de audio.
      </audio>

      {!isStarted ? (
        <div className="text-center z-20 animate-fade-in space-y-8 max-w-md px-4">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold valentine-text heartbeat drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
              Un Dia Menos para verte mi amor ❤️
            </h1>
            <p className="text-xl sm:text-2xl text-white/95 italic drop-shadow-md">
              Eres lo más bonito que me ha pasado
            </p>
          </div>
          
          <button 
            onClick={handleStart}
            className="group relative px-10 py-5 bg-white text-[#ff4e73] font-bold text-xl rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:scale-110 hover:shadow-white/20 transition-all duration-300 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">Haz clic para empezar 💖</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="absolute inset-0 rounded-full border-2 border-pink-300 group-hover:border-pink-500 animate-pulse"></div>
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center animate-fade-in w-full max-w-xl z-10">
          <div className="mb-12 text-center text-white space-y-2">
            <h2 className="text-2xl sm:text-4xl font-bold drop-shadow-lg">Tienes un mensaje...</h2>
            {isEnvelopeOpen && (
                <p className="animate-bounce text-pink-100 font-semibold text-lg">¡Te amo muchísimo! 💝</p>
            )}
          </div>
          
          <Envelope 
            isOpen={isEnvelopeOpen} 
            onOpen={handleOpenEnvelope} 
          />

          {isEnvelopeOpen && (
            <button 
              onClick={() => setIsEnvelopeOpen(false)}
              className="mt-24 text-white/70 hover:text-white transition-colors text-sm font-medium underline underline-offset-8 decoration-white/30"
            >
              Cerrar y volver a abrir
            </button>
          )}
        </div>
      )}

      {/* Credit Footer */}
      <footer className="absolute bottom-6 text-white/50 text-[10px] sm:text-xs tracking-widest uppercase">
        Hecho con todo mi amor ❤️
      </footer>

      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          .heartbeat {
            animation: heartbeat 1.5s infinite;
          }
          .valentine-text {
            background: linear-gradient(90deg, #ff7f91, #ffb3c1, #ff7f91);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
          }
          @keyframes float-up {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default App;
