"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

import projects from "@/lib/data/projects"; // Ensure you created this file

const Work = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500); // Delay for animation sync

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="animate-pulse text-white/60 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-12"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12  text-cyan-400">My Projects</h2>
        <Swiper spaceBetween={30} slidesPerView={1}>
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col xl:flex-row items-center gap-8">
                <div className="w-full xl:w-1/2 space-y-4">
                  <h2 className="text-2xl text-cyan-400">{project.num} — {project.category}</h2>
                  <h3 className="text-3xl font-bold">{project.title}</h3>
                  <p className="text-white/70">{project.description}</p>
                  <p className="text-sm text-white/50 font-mono">
                    Tech: {project.tech.join(", ")}
                  </p>
                </div>
                <div className="w-full xl:w-1/2">
                  <Image
                    src={project.image}
                    width={600}
                    height={400}
                    alt={project.title}
                    className="rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="text-center mt-8 text-cyan-400">
          Swipe For More
        </div>
      </div>
    </motion.div>
  );
};

export default Work;
