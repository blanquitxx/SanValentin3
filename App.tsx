import React, { useState, useRef } from 'react';
import HeartBackground from './components/HeartBackground';
import Envelope from './components/Envelope';

const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = () => {
    setIsStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.src = "./musica.mp3"; // Update the audio source to musica.mp3
      audioRef.current.play().catch(e => {
        console.warn("La reproducción automática de audio fue bloqueada por el navegador.", e);
      });
    }
  };

  const handleOpenEnvelope = () => {
    if (!isStarted) handleStart();
    setIsEnvelopeOpen(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden font-sans">
      <HeartBackground />

      <audio ref={audioRef} loop preload="auto">
        <source src="/musica.mp3" type="audio/mpeg" />
      </audio>

      {!isStarted ? (
        <div className="text-center z-20 animate-fade-in space-y-8 max-w-md px-4">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
              Para ti, mi amor ❤️
            </h1>
            <p className="text-xl sm:text-2xl text-white/95 italic drop-shadow-md">
              Eres lo más bonito que me ha pasado
            </p>
          </div>
          
          <button 
            onClick={() => {
              handleStart();
              if (audioRef.current) {
                audioRef.current.play().catch(e => {
                  console.warn("La reproducción automática de audio fue bloqueada por el navegador.", e);
                });
              }
            }}
            className="group relative px-10 py-5 bg-white text-[#ff4e73] font-bold text-xl rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:scale-110 hover:shadow-white/20 transition-all duration-300 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">Haz clic para empezar 💖</span>
            <div className="absolute inset-0 bg-white group-hover:bg-[#fff0f3] transition-colors duration-300"></div>
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
        `}
      </style>
    </div>
  );
};

export default App;
