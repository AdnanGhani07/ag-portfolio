"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import projects, {
  projectsMap,
  projectsDescriptionsMap,
  projectsTagsMap,
} from "@/lib/data/projects";
import { FaExternalLinkAlt, FaGithub, FaTerminal } from "react-icons/fa";
import Link from "next/link";

interface RepoData {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  topics: string[];
}

const TerminalOutput = ({ repo }: { repo: RepoData }) => {
  const [typedText, setTypedText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const contentToType = `> Connecting to GitHub...
> Found project: ${projectsMap[repo.name] || repo.name}
> Loading details...

----------------------------------------

Name         : ${projectsMap[repo.name] || repo.name}
Description  : ${repo.description || projectsDescriptionsMap[repo.name] || "No description provided."}
Main Language: ${repo.language || "Unknown"}
Tags         : ${repo.topics?.length ? repo.topics.join(", ") : projectsTagsMap[repo.name] ? projectsTagsMap[repo.name].join(", ") : "None"}
GitHub Link  : ${repo.html_url}
${repo.homepage ? `Live Website : ${repo.homepage}\n` : ""}
----------------------------------------

> Ready.`;

  useEffect(() => {
    setTypedText("");
    let i = 0;
    const typingInterval = setInterval(() => {
      setTypedText(contentToType.substring(0, i));
      i += 2; // Type in bigger chunks
      if (i > contentToType.length) {
        setTypedText(contentToType);
        clearInterval(typingInterval);
      }
    }, 30); // Slower interval frequency to free up browser scrolling CPU

    return () => clearInterval(typingInterval);
  }, [repo, contentToType]);

  // Auto-scroll to bottom smoothly while typing
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [typedText]);

  // Transform raw text into beautifully styled CLI output
  const renderStyledText = (rawText: string) => {
    return rawText.split("\n").map((line, index) => {
      if (line.startsWith("> Ready.")) {
        return (
          <div
            key={index}
            className="text-green-400 font-bold mt-4 flex items-center"
          >
            {line}
            {typedText.length >= contentToType.length && (
              <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-2"></span>
            )}
          </div>
        );
      }
      if (line.startsWith(">")) {
        return (
          <div key={index} className="text-cyan-500/80 font-bold opacity-80">
            {line}
          </div>
        );
      }
      if (line.startsWith("---")) {
        return (
          <div
            key={index}
            className="text-cyan-800/50 mt-2 mb-2 tracking-widest"
          >
            {line}
          </div>
        );
      }
      if (line.includes(":") && !line.startsWith("http")) {
        // Ensure we don't accidentally split random http: lines
        const keyIndex = line.indexOf(":");
        const key = line.substring(0, keyIndex).trim();
        const value = line.substring(keyIndex + 1).trim();

        // Special color mapping for specific fields
        let valueColor = "text-cyan-100";
        if (key === "Name") valueColor = "text-white font-black tracking-wide";
        if (key === "Main Language")
          valueColor = "text-yellow-400/90 font-bold";
        if (key === "Tags") valueColor = "text-pink-400/90";

        // Render clickable anchor tags for links
        if (key === "GitHub Link" || key === "Live Website") {
          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:gap-4 my-1.5"
            >
              <span className="text-cyan-600 font-bold w-36 shrink-0 tracking-widest uppercase text-xs sm:text-sm mt-0.5">
                {key}
              </span>
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline decoration-blue-400/30 underline-offset-4 hover:text-cyan-300 hover:decoration-cyan-300 transition-colors break-all"
              >
                {value}
              </a>
            </div>
          );
        }

        return (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:gap-4 my-1.5"
          >
            <span className="text-cyan-600 font-bold w-36 shrink-0 tracking-widest uppercase text-xs sm:text-sm mt-0.5">
              {key}
            </span>
            <span className={`${valueColor} break-words`}>
              {value || "..."}
            </span>
          </div>
        );
      }

      return (
        <div key={index} className="text-cyan-300">
          {line}
        </div>
      );
    });
  };

  return (
    <div
      ref={scrollRef}
      className="font-primary whitespace-pre-wrap text-sm sm:text-base h-full overflow-y-auto scroll-smooth custom-scrollbar pr-4 pb-16 relative z-10 flex flex-col justify-start"
    >
      <div className="flex-grow">
        {renderStyledText(typedText)}
        {/* If still typing and not at 'Ready.', show the cyan cursor */}
        {typedText.length < contentToType.length && (
          <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-1 align-middle mt-1"></span>
        )}
      </div>
    </div>
  );
};

const Work = () => {
  const [allRepos, setAllRepos] = useState<RepoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState<RepoData | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("/api/github-repos");
        const data = await res.json();

        if (data.repos) {
          // Filter to only include featured repos defined in projects.js array
          const filtered = data.repos.filter((r: RepoData) =>
            projects.includes(r.name),
          );

          // Sort them based on the specific order in the projects array
          filtered.sort(
            (a: RepoData, b: RepoData) =>
              projects.indexOf(a.name) - projects.indexOf(b.name),
          );

          setAllRepos(filtered);
          if (filtered.length > 0) {
            setSelectedRepo(filtered[0]);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repos", error);
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#0a0f1c]">
        <div className="w-16 h-16 border-4 border-t-cyan-400 border-cyan-900 rounded-full animate-spin neon-glow"></div>
        <p className="animate-pulse text-cyan-500 text-lg mt-4 font-tech tracking-widest uppercase">
          Loading Projects...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-12 bg-[#0a0f1c] min-h-screen relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto w-full px-4 relative z-10 font-tech">
        <h2 className="text-3xl xl:text-4xl font-bold text-center mb-10 text-cyan-50 uppercase tracking-[0.2em] neon-text-glow">
          <FaTerminal className="inline-block mr-4 text-cyan-500 mb-1" />
          My <span className="text-cyan-400">Projects</span>
        </h2>

        <div className="flex flex-col xl:flex-row gap-6 w-full max-w-6xl mx-auto h-auto xl:h-[65vh] min-h-[500px]">
          {/* Left Panel: Command Palette (Project List) */}
          <div className="w-full xl:w-2/5 flex flex-col glass-panel rounded-xl border border-cyan-800/50 overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.05)] bg-[#0A101C]/80 backdrop-blur-md">
            <div className="bg-cyan-950/40 px-6 py-4 border-b border-cyan-800/50 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              <span className="ml-2 text-cyan-200/50 text-xs font-primary tracking-widest uppercase">
                Select a Project
              </span>
            </div>

            <div className="p-4 flex-grow overflow-y-auto scroll-smooth overscroll-contain custom-scrollbar flex flex-col gap-3">
              {allRepos.map((repo) => (
                <button
                  key={repo.id}
                  onClick={() => setSelectedRepo(repo)}
                  className={`w-full text-left px-5 py-4 rounded-lg transition-all duration-300 border flex flex-col group
                     ${
                       selectedRepo?.id === repo.id
                         ? "bg-cyan-500/10 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] scale-[1.02]"
                         : "bg-black/20 border-cyan-900/40 hover:border-cyan-500/50 hover:bg-cyan-950/20"
                     }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span
                      className={`text-sm xl:text-base tracking-widest uppercase font-bold truncate pr-4 ${selectedRepo?.id === repo.id ? "text-cyan-300 font-extrabold" : "text-cyan-100/70 group-hover:text-cyan-200"}`}
                    >
                      {projectsMap[repo.name] || repo.name}
                    </span>
                    {selectedRepo?.id === repo.id && (
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)] flex-shrink-0"></div>
                    )}
                  </div>
                  <span className="text-[10px] text-cyan-500/50 tracking-widest uppercase mt-2 opacity-80">
                    Language: {repo.language || "Unknown"}
                  </span>
                </button>
              ))}
              {allRepos.length === 0 && (
                <p className="text-cyan-500/30 text-center py-8 text-sm tracking-widest uppercase">
                  Loading...
                </p>
              )}
            </div>
          </div>

          {/* Right Panel: Terminal Output */}
          <div className="w-full xl:w-3/5 flex flex-col glass-panel rounded-xl border border-cyan-800/50 overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.05)] bg-[#050B14]/95 backdrop-blur-xl">
            <div className="bg-[#0A101C] px-6 py-4 border-b border-cyan-900/30 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
            </div>

            <div className="p-6 xl:p-8 h-full min-h-[400px] relative overflow-hidden flex flex-col">
              {/* Terminal Scanline overlay */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]"></div>

              {selectedRepo ? (
                <TerminalOutput repo={selectedRepo} />
              ) : (
                <div className="font-primary text-cyan-400/50 whitespace-pre-wrap text-sm sm:text-base relative z-10">
                  {">"} Please select a project from the left...
                  <span className="inline-block w-2 h-4 bg-cyan-400/50 animate-pulse ml-1 align-middle"></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.5);
        }
      `}</style>
    </motion.div>
  );
};

export default Work;
