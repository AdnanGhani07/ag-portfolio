"use client";

import { useEffect, useState } from "react";
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaNode,
  FaGraduationCap,
  FaCalendarAlt,
  FaStar,
  FaJava,
  FaPython,
  FaBriefcase,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiClerk,
  SiSpring,
  SiMongodb,
  SiTypescript,
  SiDocker,
  SiGithubactions,
  SiPostman,
  SiGooglecloud,
  SiPostgresql,
  SiSupabase,
  SiFirebase,
  SiStripe,
} from "react-icons/si";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

// Experience Data
const experience = {
  icon: <FaBriefcase className="text-cyan-400" />,
  title: "Work Experience",
  items: [
    {
      company: "AariyaTech",
      role: "Full Stack Developer I",
      duration: "Mar 2026 - Present",
      location: "Remote",
      highlights: [
        "Spearheaded a 6-member engineering team (4 interns, 2 developers) to build and deploy production-ready AI agents using Python and Google ADK. Orchestrated deployment on Google Cloud Run and integrated agentic workflows into a Next.js Web App (JSO), establishing a scalable AI platform.",
        "Implemented an End-to-End Stripe Subscription Architecture integrating custom checkout sessions with real-time backend state validation. Engineered secure webhook handlers for instant user access provisioning upon successful payment, ensuring automated fulfillment accuracy.",
        "Engineered a Centralized License Management Dashboard leveraging Next.js, TypeScript, and optimized server-side rendering. Built secure workflows for automated key generation, real-time validation tracking, and one-click access revocation, decreasing provisioning-related support inquiries by 30%.",
      ],
      technologies: ["Next.js", "TypeScript", "Python", "Google ADK", "Google Cloud Run", "Stripe", "Docker"],
    },
    {
      company: "AariyaTech",
      role: "Software Intern",
      duration: "Dec 2025 - Mar 2026",
      location: "Remote",
      highlights: [
        "Engineered an AI-Driven CV Optimization System using Next.js, TypeScript, and Google GenAI. Developed custom parsing logic to compute ATS scores and eliminate LLM data hallucinations, increasing data extraction accuracy by 15%.",
        "Architected a Tiered Appointment Booking Flow by developing a stateful, multi-step scheduling sequence. Integrated frontend timezone handling with real-time backend slot validation, reducing booking conflicts by 20%.",
        "Built and Streamlined Dynamic UI Interfaces utilizing React Hook Form, Tailwind CSS, and Radix UI. Resolved deep TypeScript bottlenecks and eliminated data inconsistencies, improving form submission reliability across 5+ complex data-entry workflows.",
        "Implemented an automated weekly database and code repository backup system utilizing GitHub Actions, ensuring data integrity and streamlining CI/CD pipelines.",
      ],
      technologies: ["Next.js", "TypeScript", "Google GenAI", "React Hook Form", "Tailwind CSS", "GitHub Actions"],
    },
  ],
};

// Education Data
const education = {
  icon: <FaGraduationCap className="text-cyan-400" />,
  title: "My Education",
  items: [
    {
      institution: "Vellore Institute of Technology",
      degree: "B.Tech in Electronics and Computer Engineering",
      score: "CGPA: 9.15",
      location: "Chennai, India",
      duration: "2021 - 2025",
    },
    {
      institution: "Tarapore School Agrico",
      degree: "Indian School Certificate (ISC)",
      score: "Score: 80.75%",
      location: "Jamshedpur, India",
      duration: "2018 - 2020",
    },
  ],
};

// Skills Data
export const skills = {
  title: "My Skills",
  skillList: [
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <FaJs />, name: "JavaScript" },
    { icon: <FaReact />, name: "React.js" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <FaNode />, name: "Node.js" },
    { icon: <FaPython />, name: "Python" },
    { icon: <FaJava />, name: "Java" },
    { icon: <SiSpring />, name: "Spring Boot" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiSupabase />, name: "Supabase" },
    { icon: <SiPostgresql />, name: "PostgreSQL / Neon" },
    { icon: <SiFirebase />, name: "Firebase" },
    { icon: <SiGooglecloud />, name: "Google Cloud Run" },
    { icon: <SiDocker />, name: "Docker" },
    { icon: <SiGithubactions />, name: "GitHub Actions" },
    { icon: <SiPostman />, name: "Postman" },
    { icon: <SiClerk />, name: "Clerk" },
    { icon: <SiStripe />, name: "Stripe" },
    { icon: <FaHtml5 />, name: "HTML 5" },
    { icon: <FaCss3 />, name: "CSS 3" },
  ],
};

// About Data
const about = {
  title: "About me",
  description:
    "Results-driven Full Stack Developer skilled in React.js, Next.js, and TypeScript. Experienced in building responsive, full-stack web applications with intuitive user interfaces, agentic AI workflows, and cloud-native scalable backends.",
  info: [
    { fieldName: "Name", fieldValue: "Adnan Ghani" },
    { fieldName: "Email", fieldValue: "agadnanrocks07@gmail.com" },
    { fieldName: "Phone", fieldValue: "+91-9504708989" },
    { fieldName: "Experience", fieldValue: "Full Stack Developer I" },
    { fieldName: "Nationality", fieldValue: "Indian" },
    { fieldName: "Languages", fieldValue: "English, Hindi" },
  ],
};

const Resume = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#0a0f1c]">
        <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin neon-glow"></div>
        <p className="animate-pulse text-cyan-400/80 text-lg mt-4 font-tech tracking-widest uppercase">
          Initializing...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen py-12 relative overflow-hidden"
    >
      {/* HUD Background Grid Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold font-tech text-cyan-50 mb-4 uppercase tracking-[0.2em] neon-text-glow">
            My <span className="text-cyan-400">Resume</span>
          </h1>
          <p className="text-cyan-200/60 text-sm max-w-2xl mx-auto uppercase tracking-widest">
            Experience / Education / Skills / About
          </p>
        </motion.div>

        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-8"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="xl:w-[350px]"
          >
            <TabsList className="flex flex-col w-full h-auto gap-4 bg-transparent border-l-2 border-cyan-500/20 p-0 pl-4 rounded-none">
              <TabsTrigger
                value="experience"
                className="w-full justify-start gap-3 px-6 py-4 text-left glass-panel border border-cyan-500/10 text-cyan-200 uppercase tracking-widest font-tech data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 data-[state=active]:border-cyan-400/50 data-[state=active]:shadow-[inset_0_0_20px_rgba(6,182,212,0.3)] transition-all"
              >
                <FaBriefcase className="text-xl" />
                Experience
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="w-full justify-start gap-3 px-6 py-4 text-left glass-panel border border-cyan-500/10 text-cyan-200 uppercase tracking-widest font-tech data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 data-[state=active]:border-cyan-400/50 data-[state=active]:shadow-[inset_0_0_20px_rgba(6,182,212,0.3)] transition-all"
              >
                <FaGraduationCap className="text-xl" />
                Education
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="w-full justify-start gap-3 px-6 py-4 text-left glass-panel border border-cyan-500/10 text-cyan-200 uppercase tracking-widest font-tech data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 data-[state=active]:border-cyan-400/50 data-[state=active]:shadow-[inset_0_0_20px_rgba(6,182,212,0.3)] transition-all"
              >
                <FaStar className="text-xl" />
                Skills
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className="w-full justify-start gap-3 px-6 py-4 text-left glass-panel border border-cyan-500/10 text-cyan-200 uppercase tracking-widest font-tech data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 data-[state=active]:border-cyan-400/50 data-[state=active]:shadow-[inset_0_0_20px_rgba(6,182,212,0.3)] transition-all"
              >
                <FaCalendarAlt className="text-xl" />
                About me
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex-1"
          >
            {/* Experience Tab */}
            <TabsContent value="experience" className="w-full">
              <div className="glass-panel rounded-2xl p-8 border border-cyan-500/30 relative overflow-hidden backdrop-blur-2xl">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                <h3 className="text-3xl font-bold font-tech text-white mb-8 flex items-center gap-3 uppercase tracking-wider">
                  {experience.icon}
                  {experience.title}
                </h3>
                <div className="space-y-8 border-l w-full border-cyan-500/30 pl-6 ml-2">
                  {experience.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      className="relative p-6 sm:p-8 bg-[#0a0f1c]/80 border border-cyan-900/80 shadow-[inset_0_0_15px_rgba(6,182,212,0.05)] rounded-xl"
                    >
                      <div className="absolute -left-[35px] top-8 w-4 h-4 bg-cyan-500 rounded-full neon-glow border-2 border-[#0a0f1c]"></div>
                      
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                        <div>
                          <h4 className="text-2xl font-bold text-white font-tech tracking-wide">
                            {item.role}
                          </h4>
                          <p className="text-cyan-400 font-tech text-base font-semibold mt-1">
                            @ {item.company}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs font-tech tracking-widest uppercase">
                          <span className="text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-500/30 whitespace-nowrap">
                            {item.duration}
                          </span>
                          <span className="text-white/70 flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 whitespace-nowrap">
                            <FaMapMarkerAlt className="text-cyan-400" />
                            {item.location}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-2 mt-4 text-white/80 text-sm leading-relaxed list-disc list-inside">
                        {item.highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="text-cyan-100/70">
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-cyan-900/40">
                        {item.technologies.map((tech, tIndex) => (
                          <span
                            key={tIndex}
                            className="text-xs font-tech tracking-wider text-cyan-300 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="w-full">
              <div className="glass-panel rounded-2xl p-8 border border-cyan-500/30 relative overflow-hidden backdrop-blur-2xl">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                <h3 className="text-3xl font-bold font-tech text-white mb-8 flex items-center gap-3 uppercase tracking-wider">
                  {education.icon}
                  {education.title}
                </h3>
                <div className="space-y-6 border-l w-full border-cyan-500/30 pl-6 ml-2">
                  {education.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      className="relative p-6 bg-[#0a0f1c]/80 border border-cyan-900 shadow-[inset_0_0_10px_rgba(6,182,212,0.05)] rounded-xl"
                    >
                      <div className="absolute -left-[35px] top-8 w-4 h-4 bg-cyan-500 rounded-full neon-glow border-2 border-[#0a0f1c]"></div>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-2">
                        <div>
                          <h4 className="text-white text-xl font-bold font-tech">
                            {item.degree}
                          </h4>
                          <p className="text-cyan-400 font-tech text-sm mt-0.5">
                            {item.institution}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs font-tech tracking-widest uppercase">
                          <span className="text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30 whitespace-nowrap">
                            {item.duration}
                          </span>
                          <span className="text-cyan-300 font-tech text-xs bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-500/30 whitespace-nowrap">
                            {item.score}
                          </span>
                          <span className="text-white/70 text-xs flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded border border-white/10 whitespace-nowrap">
                            <FaMapMarkerAlt className="text-cyan-400" />
                            {item.location}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="w-full">
              <div className="glass-panel rounded-2xl p-8 border border-cyan-500/30 relative overflow-hidden backdrop-blur-2xl">
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
                <h3 className="text-3xl font-bold font-tech text-white mb-8 flex items-center gap-3 uppercase tracking-wider">
                  <FaStar className="text-cyan-400" />
                  {skills.title}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {skills.skillList.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.03 * index, duration: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                      className="group"
                    >
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-full h-32 bg-[#0a0f1c] bg-opacity-60 backdrop-blur-xl rounded-xl flex flex-col justify-center items-center gap-3 border border-cyan-900 group-hover:border-cyan-400 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                            <div className="text-4xl text-cyan-700 group-hover:text-cyan-400 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                              {skill.icon}
                            </div>
                            <span className="text-xs text-cyan-600/60 uppercase font-tech tracking-widest group-hover:text-cyan-300 transition-colors text-center px-2">
                              {skill.name}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="bg-cyan-950 border-cyan-500 text-cyan-100">
                            <p className="font-semibold uppercase tracking-widest text-xs">
                              {skill.name}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about" className="w-full">
              <div className="glass-panel rounded-2xl p-8 border border-cyan-500/30 relative overflow-hidden backdrop-blur-2xl">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>
                <h3 className="text-3xl font-bold font-tech text-white mb-8 uppercase tracking-wider">
                  {about.title}
                </h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-cyan-100/70 text-base leading-relaxed mb-8 max-w-4xl"
                >
                  {about.description}
                </motion.p>
                <div className="grid grid-cols-1 gap-4">
                  {about.info.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      className="bg-cyan-950/20 backdrop-blur-sm rounded-lg p-5 border-l-4 border-cyan-600 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
                    >
                      <span className="text-cyan-500/80 uppercase font-tech tracking-widest text-xs min-w-[140px]">
                        {item.fieldName}
                      </span>
                      <span className="text-white text-lg font-medium">
                        {item.fieldValue}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
