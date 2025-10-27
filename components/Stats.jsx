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
        <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {stats.map((item, index) => (
            <div
              className="flex-1 flex gap-4 items-center justify-center xl:justify-start"
              key={index}
            >
              <CountUp
                end={item.num}
                duration={5}
                delay={2}
                className="text-4xl xl:text-6xl font-extrabold"
              />
              <p
                className={`${
                  item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                } leading-snug text-white/80`}
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
