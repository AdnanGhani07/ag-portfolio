"use client";

import { FaHtml5, FaCss3, FaJs, FaReact, FaNode, FaGraduationCap, FaCalendarAlt, FaStar } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs } from "react-icons/si";
import { FaJava, FaPython } from "react-icons/fa";
import { SiClerk, SiSpring, SiMongodb, SiPrisma, SiDrizzle } from "react-icons/si";

//about
const about = {
  title: "About me",
  description:
    "Passionate about the art of coding and backed by years of hands-on experience, I am a software developer skilled in Java, JavaScript, and full-stack technologies. My expertise spans building scalable web applications using React.js, Next.js, and Spring Boot, as well as integrating seamless user experiences with robust backend logic.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Adnan Ghani",
    },
    {
      fieldName: "Phone",
      fieldValue: "+91-9504708989",
    },
    {
      fieldName: "Nationality",
      fieldValue: "Indian",
    },
    {
      fieldName: "Email",
      fieldValue: "agadnanrocks07@gmail.com",
    },
    {
      fieldName: "Languages",
      fieldValue: "English, Hindi",
    },
  ],
};

//education
const education = {
  icon: "/assets/resume/cap.svg",
  title: "My education",
  items: [
    {
      institution: "Tarapore School",
      degree: "ICSE",
      duration: "2006-2018",
    },
    {
      institution: "Tarapore School",
      degree: "ISC",
      duration: "2018-2020",
    },
    {
      institution: "VIT Chennai",
      degree: "B.Tech in Electronics and Computer Engineering",
      duration: "2021-2025",
    },
  ],
};

//skills
export const skills = {
  title: "My skills",
  skillList: [
    {
      icon: <FaHtml5 />,
      name: "HTML 5",
    },
    {
      icon: <FaCss3 />,
      name: "CSS 3",
    },
    {
      icon: <FaJs />,
      name: "Javascript",
    },
    {
      icon: <FaReact />,
      name: "React.js",
    },
    {
      icon: <FaNode />,
      name: "Node.js",
    },
    {
      icon: <SiTailwindcss />,
      name: "Tailwind CSS",
    },
    {
      icon: <SiNextdotjs />,
      name: "Next.js",
    },
    {
      icon: <FaJava />,
      name: "Java",
    },
    {
      icon: <FaPython />,
      name: "Python",
    },
    {
      icon: <SiClerk />,
      name: "Clerk",
    },
    {
      icon: <SiSpring />,
      name: "Spring Boot",
    },
    {
      icon: <SiMongodb />,
      name: "MongoDB",
    },
    {
      icon: <SiPrisma />,
      name: "Prisma",
    },
    {
      icon: <SiDrizzle />,
      name: "Drizzle",
    }
  ],
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen py-12 bg-gradient-to-br from-[#0a0f1c] via-[#111827] to-[#0f172a]"
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            My <span className="text-cyan-400">Resume</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Explore my educational background, technical skills, and professional journey
          </p>
        </motion.div>

        <Tabs defaultValue="education" className="flex flex-col xl:flex-row gap-8">
          {/* Enhanced Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <TabsList className="flex flex-col w-full max-w-[300px] mx-auto xl:mx-0 gap-4 bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
              <TabsTrigger 
                value="education" 
                className="w-full justify-start gap-3 px-6 py-4 text-left data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300"
              >
                <FaGraduationCap className="text-xl" />
                Education
              </TabsTrigger>
              <TabsTrigger 
                value="skills" 
                className="w-full justify-start gap-3 px-6 py-4 text-left data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300"
              >
                <FaStar className="text-xl" />
                Skills
              </TabsTrigger>
              <TabsTrigger 
                value="about" 
                className="w-full justify-start gap-3 px-6 py-4 text-left data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300"
              >
                <FaCalendarAlt className="text-xl" />
                About me
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex-1"
          >
            {/* Education Tab */}
            <TabsContent value="education" className="w-full">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <FaGraduationCap className="text-cyan-400" />
                  {education.title}
                </h3>
                <div className="space-y-6">
                  {education.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <span className="text-cyan-400 font-semibold text-lg">{item.duration}</span>
                        <span className="text-white/60 text-sm">{item.institution}</span>
                      </div>
                      <h4 className="text-white text-xl font-bold">{item.degree}</h4>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="w-full">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
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
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group"
                    >
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-full h-32 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl flex flex-col justify-center items-center gap-3 border border-white/10 hover:border-cyan-400/50 transition-all duration-300">
                            <div className="text-4xl text-white/80 group-hover:text-cyan-400 transition-all duration-300 group-hover:scale-110">
                              {skill.icon}
                            </div>
                            <span className="text-xs text-white/60 group-hover:text-cyan-300 transition-colors text-center px-2">
                              {skill.name}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-semibold">{skill.name}</p>
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
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <h3 className="text-3xl font-bold text-white mb-8">{about.title}</h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-white/80 text-lg leading-relaxed mb-8 max-w-4xl"
                >
                  {about.description}
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {about.info.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-cyan-400 font-semibold min-w-[80px]">
                          {item.fieldName}:
                        </span>
                        <span className="text-white text-lg">{item.fieldValue}</span>
                      </div>
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