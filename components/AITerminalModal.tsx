"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Terminal as TerminalIcon, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SnakeGame from "./SnakeGame";
import MatrixRain from "./MatrixRain";

interface ChatLog {
  role: "user" | "ai" | "system";
  content: string;
}

export default function AITerminalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<ChatLog[]>([
    { role: "system", content: "AI Assistant [ADNAN_GHANI_v1.0] initialized." },
    {
      role: "ai",
      content:
        "Hello. I am Adnan's AI Assistant. Ask me anything about his skills or experience.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSnake, setShowSnake] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle modal on Backquote / CMD+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default browser behavior for shortcuts
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "\`" && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setLogs((prev) => [...prev, { role: "user", content: userMessage }]);

    // Secret Commands
    const cmd = userMessage.toLowerCase();

    if (cmd === "snake") {
      setLogs((prev) => [
        ...prev,
        { role: "system", content: "SNAKE_PROTOCOL_v4.2 status: READY." },
      ]);
      setTimeout(() => setShowSnake(true), 500);
      return;
    }

    if (cmd === "matrix") {
      setLogs((prev) => [
        ...prev,
        { role: "system", content: "Hacking into the mainframe..." },
      ]);
      setShowMatrix(!showMatrix);
      return;
    }

    if (cmd === "sudo rm -rf /" || cmd === "sudo rm -rf") {
      setLogs((prev) => [
        ...prev,
        {
          role: "system",
          content: "FATAL ERROR: Unauthorized system wipe initiated.",
        },
        { role: "system", content: "Bypassing kernel protection..." },
      ]);
      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          {
            role: "system",
            content:
              "Access Denied. Just kidding. Launching training simulation...",
          },
        ]);
        setShowSnake(true);
      }, 1500);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();

      if (res.ok) {
        setLogs((prev) => [...prev, { role: "ai", content: data.reply }]);
      } else {
        setLogs((prev) => [
          ...prev,
          {
            role: "system",
            content: `ERROR: ${data.error || "Connection lost"}`,
          },
        ]);
      }
    } catch (err) {
      setLogs((prev) => [
        ...prev,
        {
          role: "system",
          content: "CRITICAL FAILURE: Unable to reach AI core.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/50 px-5 py-3.5 rounded-full backdrop-blur-md transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] group"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-cyan-400 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
          <TerminalIcon
            className="relative z-10 text-cyan-400 group-hover:text-cyan-200 transition-colors"
            size={18}
          />
        </div>
        <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.25em] group-hover:text-cyan-100 transition-colors">
          AI Assistant
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed inset-x-4 bottom-24 md:inset-x-auto md:right-6 md:bottom-24 z-50 w-auto md:w-[450px] shadow-[0_0_30px_rgba(6,182,212,0.2)] rounded-xl border border-cyan-800/50 overflow-hidden bg-[#0A101C]/95 backdrop-blur-xl flex flex-col font-primary"
            style={{ maxHeight: "60vh", height: "500px" }}
          >
            {/* Header */}
            <div className="bg-cyan-950/40 px-4 py-3 border-b border-cyan-800/50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400 text-sm tracking-widest uppercase font-bold">
                <TerminalIcon size={16} />
                <span className="ml-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[9px] text-cyan-500/80 tracking-normal font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  AI ASSISTANT
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-cyan-500/50 hover:text-cyan-400 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div
              ref={scrollRef}
              className="flex-grow p-4 overflow-y-auto custom-scrollbar flex flex-col gap-3 text-sm"
            >
              {logs.map((log, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${log.role === "user" ? "items-end" : "items-start"}`}
                >
                  <span className="text-[10px] text-cyan-600/60 uppercase tracking-widest mb-1.5 px-1">
                    {log.role}
                  </span>
                  <div
                    className={`
                    max-w-[85%] p-3 rounded-lg border leading-relaxed
                    ${
                      log.role === "user"
                        ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-100 rounded-tr-none"
                        : log.role === "system"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 rounded-tl-none font-mono"
                          : "bg-black/40 border-cyan-900/50 text-cyan-300 rounded-tl-none"
                    }
                  `}
                  >
                    {log.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-cyan-600/60 uppercase tracking-widest mb-1 px-1">
                    ai
                  </span>
                  <div className="max-w-[85%] p-3 rounded-lg border bg-black/40 border-cyan-900/50 text-cyan-300 rounded-tl-none">
                    <span className="animate-pulse">Processing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Questions */}
            <div className="px-4 pb-2 pt-1 flex flex-wrap gap-2 text-xs">
              {[
                "What's your tech stack?",
                "Recent projects?",
                "Best project?",
                "Work experience?",
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(q)}
                  className="bg-cyan-900/30 hover:bg-cyan-800/50 text-cyan-300/80 hover:text-cyan-200 border border-cyan-800/50 rounded-full px-3 py-1 transition-colors tracking-wide whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-cyan-800/50 bg-black/50"
            >
              <div className="relative flex items-center">
                <span className="absolute left-3 text-cyan-500 font-bold">
                  {">"}
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a command or question..."
                  className="w-full bg-transparent border border-cyan-900/50 rounded-md py-2.5 pl-8 pr-12 text-cyan-100 placeholder:text-cyan-800/70 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  autoComplete="off"
                  spellCheck="false"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-1.5 text-cyan-600 hover:text-cyan-400 disabled:text-cyan-900 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlays */}
      <AnimatePresence>
        {showSnake && <SnakeGame onClose={() => setShowSnake(false)} />}
      </AnimatePresence>

      {showMatrix && <MatrixRain />}
    </>
  );
}
