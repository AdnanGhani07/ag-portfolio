"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RefreshCw, Trophy } from "lucide-react";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const BASE_SPEED = 160; 

const TECH_LOGOS = ["⚛️", "▲", "🟢", "🟦", "☕", "🌊", "📦", "🔥"];

interface Props {
  onClose: () => void;
}

export default function SnakeGame({ onClose }: Props) {
  // Logic states
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [food, setFood] = useState({ x: 5, y: 5, icon: "⚛️" });
  
  // Render states
  const [renderSnake, setRenderSnake] = useState(INITIAL_SNAKE);
  const [progress, setProgress] = useState(0);

  // High performance refs
  const snakeRef = useRef(INITIAL_SNAKE);
  const prevSnakeRef = useRef(INITIAL_SNAKE);
  const directionRef = useRef(INITIAL_DIRECTION);
  const nextDirectionsRef = useRef<Array<{ x: number, y: number }>>([]);
  const lastUpdateRef = useRef(0);
  const requestRef = useRef<number>(0);

  const getRandomFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
        icon: TECH_LOGOS[Math.floor(Math.random() * TECH_LOGOS.length)],
      };
      const onSnake = snakeRef.current.some(s => s.x === newFood.x && s.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    snakeRef.current = INITIAL_SNAKE;
    prevSnakeRef.current = INITIAL_SNAKE;
    directionRef.current = INITIAL_DIRECTION;
    nextDirectionsRef.current = [];
    setRenderSnake(INITIAL_SNAKE);
    setFood(getRandomFood());
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    lastUpdateRef.current = performance.now();
  };

  const updateGame = useCallback((time: number) => {
    if (isGameOver || isPaused) {
      requestRef.current = requestAnimationFrame(updateGame);
      return;
    }

    const currentSpeed = Math.max(70, BASE_SPEED - (score / 10) * 4);
    const elapsed = time - lastUpdateRef.current;
    const currentProgress = Math.min(1, elapsed / currentSpeed);
    
    setProgress(currentProgress);

    if (elapsed >= currentSpeed) {
      // Rotate refs
      prevSnakeRef.current = [...snakeRef.current];

      // Input buffering
      if (nextDirectionsRef.current.length > 0) {
        directionRef.current = nextDirectionsRef.current.shift()!;
      }

      const head = snakeRef.current[0];
      const nextHead = {
        x: (head.x + directionRef.current.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + directionRef.current.y + GRID_SIZE) % GRID_SIZE,
      };

      if (snakeRef.current.some(s => s.x === nextHead.x && s.y === nextHead.y)) {
        setIsGameOver(true);
      } else {
        const newSnake = [nextHead, ...snakeRef.current];
        if (nextHead.x === food.x && nextHead.y === food.y) {
          setScore(s => s + 10);
          setFood(getRandomFood());
          // When eating, prevSegment for the new tail is the last segment's current pos
        } else {
          newSnake.pop();
        }
        snakeRef.current = newSnake;
        setRenderSnake(newSnake);
      }
      
      lastUpdateRef.current = time;
      setProgress(0);
    }

    requestRef.current = requestAnimationFrame(updateGame);
  }, [food, isGameOver, isPaused, score, getRandomFood]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(requestRef.current);
  }, [updateGame]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const lastDir = nextDirectionsRef.current.length > 0 
        ? nextDirectionsRef.current[nextDirectionsRef.current.length - 1] 
        : directionRef.current;

      let nextDir = null;
      switch (e.key) {
        case "ArrowUp": case "w": if (lastDir.y === 0) nextDir = { x: 0, y: -1 }; break;
        case "ArrowDown": case "s": if (lastDir.y === 0) nextDir = { x: 0, y: 1 }; break;
        case "ArrowLeft": case "a": if (lastDir.x === 0) nextDir = { x: -1, y: 0 }; break;
        case "ArrowRight": case "d": if (lastDir.x === 0) nextDir = { x: 1, y: 0 }; break;
        case "Escape": onClose(); break;
        case " ": setIsPaused(p => !p); break;
      }

      if (nextDir && (nextDirectionsRef.current.length < 2)) {
         nextDirectionsRef.current.push(nextDir);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Interpolation helper with wrapping
  const getInterpolatedPos = (index: number) => {
    const curr = renderSnake[index];
    const prev = prevSnakeRef.current[index] || curr; // Handle new segments during growth

    let dx = curr.x - prev.x;
    let dy = curr.y - prev.y;

    // Handle wrapping interpolation
    if (Math.abs(dx) > 1) dx = dx > 0 ? dx - GRID_SIZE : dx + GRID_SIZE;
    if (Math.abs(dy) > 1) dy = dy > 0 ? dy - GRID_SIZE : dy + GRID_SIZE;

    return {
      x: prev.x + dx * progress,
      y: prev.y + dy * progress,
    };
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05080F]/90 backdrop-blur-md p-4 overflow-hidden">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-[#0A101C] border-2 border-emerald-500/30 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.2)] flex flex-col items-center p-6 md:p-8 max-w-full"
      >
        <button onClick={onClose} className="absolute -top-4 -right-4 p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-400 transition-colors shadow-lg">
          <X size={20} />
        </button>

        <div className="w-full flex justify-between items-center mb-6 px-2">
          <div className="flex flex-col">
            <h2 className="text-emerald-400 font-tech text-xl tracking-widest uppercase italic">Fluid_Snake v2.0</h2>
            <p className="text-emerald-600/60 text-[10px] font-mono tracking-widest mt-1">120HZ INTERPOLATION ACTIVE</p>
          </div>
          <div className="text-right">
            <span className="text-emerald-500/50 text-[10px] uppercase font-bold tracking-widest block mb-1">Mastery</span>
            <span className="text-3xl font-tech text-emerald-400 leading-none">{score}</span>
          </div>
        </div>

        <div 
          className="relative bg-black/60 border border-emerald-900/50 rounded-xl overflow-hidden shadow-inner"
          style={{ 
            width: "min(85vw, 400px)",
            height: "min(85vw, 400px)",
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: `${100 / GRID_SIZE}% ${100 / GRID_SIZE}%`,
          }}
        >
          {/* Interpolated Snake Segments */}
          {renderSnake.map((_, i) => {
            const pos = getInterpolatedPos(i);
            return (
              <div
                key={i}
                className={`absolute rounded-md ${i === 0 ? "z-10 bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)]" : "bg-emerald-600/70"}`}
                style={{
                  width: `${100 / GRID_SIZE}%`,
                  height: `${100 / GRID_SIZE}%`,
                  left: `${(pos.x * 100) / GRID_SIZE}%`,
                  top: `${(pos.y * 100) / GRID_SIZE}%`,
                  transition: 'none', // Critical for sub-pixel smoothness
                }}
              >
                {i === 0 && (
                  <div className="w-full h-full flex items-center justify-center scale-75">
                    <div className="w-1.5 h-1.5 bg-black rounded-full opacity-60 mx-px" />
                    <div className="w-1.5 h-1.5 bg-black rounded-full opacity-60 mx-px" />
                  </div>
                )}
              </div>
            );
          })}

          {/* High Fidelity Food */}
          <motion.div
            animate={{ 
                y: [0, -4, 0],
                rotate: [0, 5, -5, 0],
                scale: [1, 1.15, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute flex items-center justify-center text-xl z-20 pointer-events-none"
            style={{
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
              left: `${(food.x * 100) / GRID_SIZE}%`,
              top: `${(food.y * 100) / GRID_SIZE}%`,
              filter: "drop-shadow(0 0 10px rgba(52, 211, 153, 0.5))",
            }}
          >
            {food.icon}
          </motion.div>

          <AnimatePresence>
            {isGameOver && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-30 p-4 text-center backdrop-blur-md">
                <Trophy className="text-yellow-500 mb-2 drop-shadow-[0_0_20px_rgba(234,179,8,0.5)]" size={64} />
                <h3 className="text-3xl font-tech text-emerald-400 mb-1">SYSTEM OVERRIDE</h3>
                <p className="text-emerald-700 text-xs mb-8 uppercase tracking-[0.3em]">Final Stack Score: {score}</p>
                <div className="flex gap-4">
                  <button onClick={resetGame} className="flex items-center gap-2 px-8 py-3 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 rounded-xl hover:bg-emerald-500/40 transition-all font-tech tracking-widest uppercase text-xs">
                    <RefreshCw size={14} /> Re-Initialize
                  </button>
                  <button onClick={onClose} className="px-8 py-3 bg-white/5 border border-white/20 text-white/50 rounded-xl hover:bg-white/10 transition-all font-tech tracking-widest uppercase text-xs">
                    Eject
                  </button>
                </div>
              </motion.div>
            )}
            {isPaused && !isGameOver && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-30 text-emerald-400 backdrop-blur-sm">
                <span className="text-4xl font-tech tracking-[0.5em] animate-pulse">PAUSED</span>
                <span className="mt-4 text-[11px] uppercase opacity-40 tracking-[0.3em]">RESUME WITH SPACE</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex flex-col items-center gap-4 w-full">
          <div className="flex gap-8 text-[10px] font-mono text-emerald-500/30 uppercase tracking-[0.3em]">
            <span>WASD :: NAVIGATE</span>
            <span>SPACE :: FREEZE</span>
          </div>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-emerald-900/50 to-transparent" />
          <p className="text-emerald-700/40 text-[9px] uppercase leading-relaxed text-center italic">
             Neural Engine: FLUID_INTERPOLATION_v2.01 <br/>
             Optimized for High Refresh Displays
          </p>
        </div>
      </motion.div>
    </div>
  );
}
