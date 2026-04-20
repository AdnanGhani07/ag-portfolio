"use client";

import React, { useEffect, useRef } from "react";

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = Math.max(14, Math.floor(width / 100)); // Dynamic font size based on screen width
    const columns = Math.floor(width / fontSize);

    // Array of drops - one per column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
        // start at random high negative positions so they don't all fall at once
      drops[i] = Math.random() * -100;
    }

    let animationFrameId: number;

    const draw = () => {
      // Semi-transparent black to create trailing effect.
      // Opacity affects the tail length.
      ctx.fillStyle = "rgba(10, 15, 28, 0.1)"; // Using the background color roughly
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(6, 182, 212, 0.8)"; // Cyan color for rain
      // In night mode, CSS hue-rotate will shift this cyan automatically!
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Grab a random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop to top randomly to scatter the resets
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // move drop down
        drops[i]++;
      }
      
      // Control speed, requestAnimationFrame is usually ~60fps, which is too fast for matrix rain
      // But we can throttle it via setTimeout or just live with it and scale font size.
      // Actually we'll just run it every frame for smooth fading, but move drops conditionally or just let it fly.
      // Matrix rain usually updates every ~30-50ms
    };

    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const loop = (time: number) => {
        if (!lastTime) lastTime = time;
        const deltaTime = time - lastTime;
        
        if (deltaTime > interval) {
            draw();
            lastTime = time - (deltaTime % interval);
        }
        animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      const newFontSize = Math.max(14, Math.floor(width / 100));
      const newColumns = Math.floor(width / newFontSize);
      
      if (newColumns > drops.length) {
          for (let i = drops.length; i < newColumns; i++) {
              drops[i] = Math.random() * -100;
          }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none opacity-30 mix-blend-screen"
      style={{
        // Ensure it doesn't block interactions and sits physically behind the content
      }}
    />
  );
};

export default MatrixRain;
