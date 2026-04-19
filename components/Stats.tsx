"use client";

import CountUp from "react-countup";
import { useEffect, useState } from "react";
import projects from "../lib/data/projects"; 
import { skills } from "../app/resume/page"; 
import { FolderKanban, Cpu, GitBranch } from "lucide-react";

const Stats = () => {
  const [stats, setStats] = useState([
    {
      num: projects.length,
      text: "Projects",
      icon: FolderKanban,
    },
    {
      num: skills.skillList.length,
      text: "Tools Mastered",
      icon: Cpu,
    },
    {
      num: 0, // Starts at 0, counts up after fetch
      text: "Code Commits",
      icon: GitBranch,
    },
  ]);

  useEffect(() => {
    async function fetchCommits() {
      try {
        const res = await fetch("/api/github-commits");
        if (!res.ok) throw new Error("API Route Failed");
        const data = await res.json();

        setStats((prevStats) =>
          prevStats.map((item) =>
            item.text === "Code Commits"
              ? { ...item, num: data.totalCommits }
              : item
          )
        );
      } catch (error) {
        console.error("Failed to fetch commit count, using fallback", error);
        setStats((prevStats) =>
          prevStats.map((item) =>
            item.text === "Code Commits"
              ? { ...item, num: 342 } // Fallback static count
              : item
          )
        );
      }
    }

    fetchCommits();
  }, []);

  return (
    <section className="pt-2 pb-2">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full" role="list">
          {stats.map((item, index) => {
             const IconComponent = item.icon;
             return (
              <div
                className="relative bg-[#0a0f1c]/80 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 overflow-hidden group hover:border-cyan-400/50 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.05)] hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] flex flex-col items-center sm:items-start text-center sm:text-left"
                key={index}
                role="listitem"
              >
                {/* Neon bottom sweep effect */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>

                <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
                  {/* Clean glowing icon module */}
                  <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-cyan-950/40 border border-cyan-500/30 group-hover:bg-cyan-900/60 group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" strokeWidth={2} />
                  </div>
                  
                  {/* Digital metrics */}
                  <div className="flex flex-col justify-center">
                    <CountUp
                      end={item.num}
                      duration={3}
                      delay={0.2}
                      className="text-4xl xl:text-5xl font-black font-tech text-white leading-tight"
                      aria-label={`${item.num} ${item.text}`}
                    />
                    <p
                      className="text-xs tracking-[0.2em] uppercase font-tech text-cyan-300/80 mt-1"
                      title={item.text}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>

                {/* Subtle glass reflection */}
                <div className="absolute -inset-x-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[45deg] group-hover:animate-[shimmer_1.5s_ease-in-out]"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
