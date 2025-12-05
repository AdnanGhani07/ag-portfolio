"use client";

import CountUp from "react-countup";
import { useEffect, useState } from "react";
import projects from "../lib/data/projects"; // adjust path if needed
import { skills } from "../app/resume/page"; // adjust path and export of skills

const Stats = () => {
  const [stats, setStats] = useState([
    {
      num: projects.length,
      text: "Projects",
    },
    {
      num: skills.skillList.length,
      text: "Tools Mastered",
    },
    {
      num: 0,
      text: "Code Commits",
    },
  ]);

  useEffect(() => {
    async function fetchCommits() {
      try {
        const res = await fetch("/api/github-commits");
        const data = await res.json();

        setStats((prevStats) =>
          prevStats.map((item) =>
            item.text === "Code Commits"
              ? { ...item, num: data.totalCommits }
              : item
          )
        );
      } catch (error) {
        console.error("Failed to fetch commit count", error);
      }
    }

    fetchCommits();
  }, []);

  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 w-full" role="list">
          {stats.map((item, index) => (
            <div
              className="flex items-center gap-3 sm:gap-4 min-w-0 justify-center sm:justify-start"
              key={index}
              role="listitem"
            >
              <CountUp
                end={item.num}
                duration={5}
                delay={0.2}
                className="text-3xl sm:text-4xl xl:text-5xl font-extrabold"
                aria-label={`${item.num} ${item.text}`}
              />
              <p
                className={"text-sm sm:text-base leading-snug text-white/80 truncate [text-wrap:balance] max-w-[8.5rem] sm:max-w-[10rem]"}
                title={item.text}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
