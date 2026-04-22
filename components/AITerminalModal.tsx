"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { flushSync } from "react-dom";
import { X, Terminal as TerminalIcon, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import SnakeGame from "./SnakeGame";
import { useThemeStatus } from "./ThemeController";

interface ChatLog {
  role: "user" | "ai" | "system";
  content: string;
}

interface ToolAction {
  tool: string;
  args: Record<string, any>;
}

export default function AITerminalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<ChatLog[]>([
    { role: "system", content: "AI Assistant [AG_V2.0] initialized." },
    {
      role: "ai",
      content:
        "Hello! I'm Adnan's AI Assistant. Ask me anything about his skills, projects, or experience — or I can navigate the site for you!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSnake, setShowSnake] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { isRaining, setManualNight, setManualRain } = useThemeStatus();

  // Toggle modal on Backquote / CMD+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default browser behavior for shortcuts
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "`" && !isOpen) {
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

  // ── Tool action executor ─────────────────────────────
  const executeAction = useCallback(
    (action: ToolAction) => {
      const { tool, args } = action;

      switch (tool) {
        case "navigate_to_section": {
          const section = args.section as string;
          const routes: Record<string, string> = {
            home: "/",
            resume: "/resume",
            work: "/work",
            contact: "/contact",
          };
          if (routes[section]) {
            setLogs((prev) => [
              ...prev,
              {
                role: "system",
                content: `🎯 Navigating to ${section.charAt(0).toUpperCase() + section.slice(1)}...`,
              },
            ]);
            router.push(routes[section]);
          }
          break;
        }

        case "toggle_theme": {
          const theme = args.theme as string;
          const isNight = theme === "night";
          setManualNight(isNight);
          setLogs((prev) => [
            ...prev,
            {
              role: "system",
              content: isNight
                ? "🌙 Night mode activated."
                : "☀️ Day mode activated.",
            },
          ]);
          break;
        }

        case "toggle_matrix": {
          const enabled = !!args.enabled;
          setManualRain(enabled);
          setLogs((prev) => [
            ...prev,
            {
              role: "system",
              content: enabled
                ? "💊 Matrix rain activated. Welcome to the real world."
                : "Matrix rain deactivated.",
            },
          ]);
          break;
        }

        case "launch_snake": {
          setLogs((prev) => [
            ...prev,
            {
              role: "system",
              content: "🐍 SNAKE_PROTOCOL_v4.2 launching...",
            },
          ]);
          setTimeout(() => setShowSnake(true), 500);
          break;
        }

        case "download_resume": {
          setLogs((prev) => [
            ...prev,
            {
              role: "system",
              content: "📄 Initiating resume download...",
            },
          ]);
          setTimeout(() => {
            const link = document.createElement("a");
            link.href = "/AG-Resumex.pdf";
            link.download = "Adnan_Ghani_Resume.pdf";
            link.click();
          }, 300);
          break;
        }

        case "show_projects_by_tech": {
          // This is handled entirely by the AI's text response (option B)
          break;
        }

        default:
          break;
      }
    },
    [router, setManualNight, setManualRain],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setLogs((prev) => [...prev, { role: "user", content: userMessage }]);

    // Secret Commands (keep legacy commands working)
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
      setManualRain(!isRaining);
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
      // Send conversation history (last 10 messages, excluding system)
      const historyForApi = logs
        .filter((log) => log.role === "user" || log.role === "ai")
        .slice(-10);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: historyForApi,
        }),
      });
      const data = await res.json();

      flushSync(() => {
        if (res.ok) {
          // Add AI reply
          if (data.reply) {
            setLogs((prev) => [...prev, { role: "ai", content: data.reply }]);
          }

          // Execute tool action if present
          if (data.action) {
            executeAction(data.action);
          }
        } else {
          setLogs((prev) => [
            ...prev,
            {
              role: "system",
              content: `ERROR: ${data.error || "Connection lost"}`,
            },
          ]);
        }
        setIsLoading(false);
      });
    } catch (err) {
      flushSync(() => {
        setLogs((prev) => [
          ...prev,
          {
            role: "system",
            content: "CRITICAL FAILURE: Unable to reach AI core.",
          },
        ]);
        setIsLoading(false);
      });
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center bg-cyan-950/20 hover:bg-cyan-900/40 border border-cyan-500/20 p-4 rounded-full backdrop-blur-2xl transition-all duration-500 ease-out shadow-[0_0_25px_rgba(6,182,212,0.2)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] group overflow-hidden"
      >
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 bg-cyan-400 rounded-full blur-md opacity-20 group-hover:opacity-60 transition-opacity animate-pulse" />
          <TerminalIcon
            className="relative z-10 text-cyan-400 group-hover:text-cyan-200 transition-colors"
            size={20}
          />
        </div>
        <div className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-3 transition-all duration-500 ease-out whitespace-nowrap overflow-hidden">
          <span className="text-cyan-400 text-[11px] font-bold uppercase tracking-[0.3em] group-hover:text-cyan-100 transition-colors font-tech">
            AI Assistant
          </span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed inset-x-4 bottom-24 md:inset-x-auto md:right-6 md:bottom-28 z-50 w-auto md:w-[500px] shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-2xl border border-cyan-500/15 overflow-hidden bg-[#070d1f]/90 backdrop-blur-[40px] flex flex-col font-primary"
            style={{ maxHeight: "70vh", height: "600px" }}
          >
            {/* Header: Tactical HUD */}
            <div className="bg-cyan-950/20 px-5 py-4 border-b border-cyan-500/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-400 tracking-wider font-bold font-tech uppercase">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  AI ASSISTANT
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500/5 border border-cyan-500/10 text-cyan-500/60 hover:text-cyan-400 hover:bg-cyan-500/20 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div
              ref={scrollRef}
              className="flex-grow p-5 overflow-y-auto custom-assistant-scrollbar flex flex-col gap-4 text-sm"
            >
              {logs.map((log, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${log.role === "user" ? "items-end" : "items-start"} max-w-[90%] ${log.role === "user" ? "ml-auto" : ""}`}
                >
                  <span className="text-[9px] text-cyan-600/40 uppercase tracking-[0.2em] font-tech mb-2 px-1">
                    {log.role}
                  </span>
                  <div
                    className={`
                    p-4 rounded-xl leading-relaxed border backdrop-blur-lg
                    ${
                      log.role === "user"
                        ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-50 rounded-tr-none shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                        : log.role === "system"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 rounded-tl-none font-mono text-[12px] tracking-tight"
                          : "bg-white/5 border-white/10 text-cyan-200 rounded-tl-none shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                    }
                  `}
                  >
                    {log.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex flex-col items-start translate-y-2">
                  <span className="text-[9px] text-cyan-600/40 uppercase tracking-[0.2em] font-tech mb-2 px-1 animate-pulse">
                    ai
                  </span>
                  <div className="p-4 rounded-xl border bg-white/5 border-white/10 text-cyan-400/60 rounded-tl-none italic text-xs flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.3s]" />
                    <span className="ml-2">Processing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Actions: Tool-Based Chips (shown only before first message) */}
            {logs.length <= 2 && (
            <div className="px-5 pb-3 pt-2 flex flex-wrap gap-2 text-[11px] font-tech font-bold uppercase tracking-wider">
              {[
                "Show me Adnan's resume",
                "Turn on the night mode",
                "Launch the Matrix",
                "Play a game",
                "React projects?",
                "Go to Work section",
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(q)}
                  className="bg-cyan-500/5 hover:bg-cyan-500/15 text-cyan-400/70 hover:text-cyan-300 border border-cyan-500/10 hover:border-cyan-500/30 rounded-full px-4 py-1.5 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
            )}

            {/* Input Area: Tactical Trigger */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-cyan-500/10 bg-cyan-950/20 backdrop-blur-md"
            >
              <div className="relative flex items-center group">
                <span className="absolute left-4 text-cyan-500 font-bold font-tech opacity-70 group-focus-within:opacity-100 group-focus-within:animate-pulse transition-opacity">
                  {">"}
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-black/40 border border-cyan-500/10 group-focus-within:border-cyan-500/50 rounded-lg py-3.5 pl-10 pr-14 text-cyan-100 placeholder:text-cyan-900/60 focus:outline-none transition-all shadow-inner"
                  autoComplete="off"
                  spellCheck="false"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2.5 p-2 bg-cyan-500/10 text-cyan-600 hover:text-cyan-300 hover:bg-cyan-500/30 rounded-md disabled:opacity-30 disabled:hover:bg-transparent transition-all"
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
    </>
  );
}
