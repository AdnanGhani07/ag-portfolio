"use client";

import React, { useRef, useEffect } from "react";

const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    // Set canvas dimensions
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Mouse Interaction
    let mouse = {
      x: undefined as number | undefined,
      y: undefined as number | undefined,
      radius: 180, // Interaction radius
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };

    const handleMouseLeave = () => {
      mouse.x = undefined;
      mouse.y = undefined;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    // Particle Class
    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;

      constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      // Draw particle
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
      }

      // Update position
      update() {
         // Collision with window edges
         if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
         if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

         // Interactive Mouse repulsion physics
         if (mouse.x !== undefined && mouse.y !== undefined) {
             let dx = mouse.x - this.x;
             let dy = mouse.y - this.y;
             let distance = Math.sqrt(dx * dx + dy * dy);
             
             // Particles slightly dodge the mouse cursor
             if (distance < mouse.radius) {
                 const forceDirectionX = dx / distance;
                 const forceDirectionY = dy / distance;
                 const force = (mouse.radius - distance) / mouse.radius;
                 const directionX = forceDirectionX * force * 2;
                 const directionY = forceDirectionY * force * 2;
                 
                 this.x -= directionX;
                 this.y -= directionY;
             }
         }

         this.x += this.directionX;
         this.y += this.directionY;
         this.draw();
      }
    }

    // Init Particle Array
    const init = () => {
      particlesArray = [];
      const numberOfParticles = (canvas.height * canvas.width) / 10000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (canvas.width - size * 2) + size * 2;
        let y = Math.random() * (canvas.height - size * 2) + size * 2;
        let directionX = Math.random() * 1 - 0.5;
        let directionY = Math.random() * 1 - 0.5;
        let color = "rgba(6, 182, 212, 0.8)"; // cyan-400 equivalent base
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };

    // Animate network lines
    const connect = () => {
        let opacityValue = 1;
        for(let a=0; a < particlesArray.length; a++){
            for(let b=a; b < particlesArray.length; b++){
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) 
                             + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width/7) * (canvas.height/7)){
                    opacityValue = 1 - (distance/25000);
                    if (!ctx) return;
                    ctx.strokeStyle = `rgba(6, 182, 212, ${opacityValue * 0.15})`;
                    ctx.lineWidth = 1;
                    ctx.shadowBlur = 0; // Don't blur connection lines for performance
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }

            // Draw line from particle to mouse cursor if close
            if (mouse.x !== undefined && mouse.y !== undefined) {
                 let dx = particlesArray[a].x - mouse.x;
                 let dy = particlesArray[a].y - mouse.y;
                 let mouseDistance = dx * dx + dy * dy;
                 if (mouseDistance < 25000) {
                    opacityValue = 1 - (mouseDistance/25000);
                    ctx.strokeStyle = `rgba(6, 182, 212, ${opacityValue * 0.4})`;
                    ctx.lineWidth = 1.5;
                    ctx.shadowBlur = 0;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                 }
            }
        }
    };

    // Animation Loop
    const animate = () => {
      if (!ctx || !canvas) return;
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Fixed innerWidth to canvas.width
      
      for(let i=0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    };

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="block bg-transparent"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default ParticleNetwork;
