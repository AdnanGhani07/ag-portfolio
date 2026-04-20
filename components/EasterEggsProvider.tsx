"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SnakeGame from "./SnakeGame";
import { Gamepad2 } from "lucide-react";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a"
];

export default function EasterEggsProvider({ children }: { children: React.ReactNode }) {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Key matches current step in Konami Code
      if (e.key === KONAMI_CODE[konamiIndex] || e.key.toLowerCase() === KONAMI_CODE[konamiIndex].toLowerCase()) {
        const nextIndex = konamiIndex + 1;
        if (nextIndex === KONAMI_CODE.length) {
          // Unlocked!
          setIsUnlocked(true);
          setKonamiIndex(0);
          
          // Auto-hide after 5 seconds
          setTimeout(() => {
            setIsUnlocked(false);
          }, 6000);
        } else {
          setKonamiIndex(nextIndex);
        }
      } else {
        // Reset if they mess up
        setKonamiIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiIndex]);

  return (
    <>
      {children}
      
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm pointer-events-none"
          >
            {/* Glitch Overlay Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] shadow-[inset_0_0_100px_rgba(255,0,0,0.5)] animate-pulse"></div>
            
            <motion.div 
              initial={{ scale: 0.8, filter: "hue-rotate(0deg)" }}
              animate={{ scale: 1, filter: "hue-rotate(360deg)" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="relative z-10 text-center"
            >
              <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 tracking-[0.2em] uppercase font-tech break-words"
                  style={{ textShadow: "4px 4px 10px rgba(255,0,0,0.8)" }}
              >
                SYSTEM OVERRIDE
              </h1>
              <p className="mt-8 text-2xl text-red-500 font-primary uppercase tracking-widest animate-pulse">
                Access Level: GOD MODE
              </p>
              <p className="mt-4 text-cyan-400 font-primary text-sm opacity-80 max-w-lg mx-auto leading-relaxed border border-cyan-500/30 p-4 bg-cyan-900/10 rounded-lg">
                &gt; Congratulations. You found the hidden backdoor.<br />
                &gt; Hiring Adnan Ghani is highly recommended.<br />
                &gt; Resuming normal protocols...
              </p>
              
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowGame(true)}
                  className="group relative flex items-center gap-3 px-8 py-3 bg-red-600/20 border border-red-500/50 hover:bg-red-600/40 text-red-500 rounded-lg transition-all font-tech tracking-[0.2em] uppercase text-sm pointer-events-auto overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/30 to-red-500/0 -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                  <Gamepad2 size={20} className="relative z-10" />
                  <span className="relative z-10">Launch Training Simulation</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGame && (
          <SnakeGame onClose={() => setShowGame(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
