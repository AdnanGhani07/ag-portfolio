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
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiClerk,
  SiSpring,
  SiMongodb,
  SiPrisma,
  SiDrizzle,
} from "react-icons/si";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

// Data
const about = {
  title: "About me",
  description:
    "Passionate about the art of coding and backed by years of hands-on experience, I am a software developer skilled in Java, JavaScript, and full-stack technologies. My expertise spans building scalable web applications using React.js, Next.js, and Spring Boot.",
  info: [
    { fieldName: "Name", fieldValue: "Adnan Ghani" },
    { fieldName: "Phone", fieldValue: "+91-9504708989" },
    { fieldName: "Nationality", fieldValue: "Indian" },
    { fieldName: "Email", fieldValue: "agadnanrocks07@gmail.com" },
    { fieldName: "Languages", fieldValue: "English, Hindi" },
  ],
};

const education = {
  icon: <FaGraduationCap className="text-cyan-400" />,
  title: "My Education",
  items: [
    { institution: "Tarapore School", degree: "ICSE", duration: "2006-2018" },
    { institution: "Tarapore School", degree: "ISC", duration: "2018-2020" },
    {
      institution: "VIT Chennai",
      degree: "B.Tech in Electronics and Computer Engineering",
      duration: "2021-2025",
    },
  ],
};

export const skills = {
  title: "My Skills",
  skillList: [
    { icon: <FaHtml5 />, name: "HTML 5" },
    { icon: <FaCss3 />, name: "CSS 3" },
    { icon: <FaJs />, name: "Javascript" },
    { icon: <FaReact />, name: "React.js" },
    { icon: <FaNode />, name: "Node.js" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <FaJava />, name: "Java" },
    { icon: <FaPython />, name: "Python" },
    { icon: <SiClerk />, name: "Clerk" },
    { icon: <SiSpring />, name: "Spring Boot" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiPrisma />, name: "Prisma" },
    { icon: <SiDrizzle />, name: "Drizzle" },
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
            Education / Skills / About
          </p>
        </motion.div>

        <Tabs
          defaultValue="education"
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
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
                        <span className="text-cyan-400 font-tech uppercase tracking-widest text-sm">
                          {item.duration}
                        </span>
                        <span className="text-cyan-200/60 text-xs uppercase tracking-widest">
                          {item.institution}
                        </span>
                      </div>
                      <h4 className="text-white text-xl font-bold">
                        {item.degree}
                      </h4>
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
                      transition={{ delay: 0.05 * index, duration: 0.4 }}
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
                      <span className="text-cyan-500/80 uppercase font-tech tracking-widest text-xs min-w-[120px]">
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
