"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

import projects from "@/lib/data/projects"; // Ensure you created this file

const Work = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1500); // Delay for animation sync

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
      <div className="container mx-auto w-full px-4">
        <h2 className="text-4xl font-bold text-center mb-12  text-cyan-400">
          My Projects
        </h2>
        <Swiper
          modules={[Navigation]}
          spaceBetween={40}
          slidesPerView={1}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col xl:flex-row items-center gap-8">
                <div className="w-full xl:w-1/2 space-y-4">
                  <h2 className="text-2xl text-cyan-400">
                    {project.num} — {project.category}
                  </h2>
                  <h3 className="text-3xl font-bold">{project.title}</h3>
                  <p className="text-white/70">{project.description}</p>
                  <p className="text-sm text-white/50 font-mono">
                    Tech: {project.tech.join(", ")}
                  </p>
                </div>
                <div className="w-full max-w-[600px] h-auto aspect-[3/2] bg-transparent rounded-xl flex items-center justify-center overflow-hidden">
                  <Image
                    src={project.image}
                    width={600}
                    height={400}
                    alt={project.title}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-center gap-10 mt-6">
          <button
            ref={prevRef}
            className="text-cyan-400 hover:text-white text-xl font-semibold transition"
          >
            ← Prev
          </button>
          <button
            ref={nextRef}
            className="text-cyan-400 hover:text-white text-xl font-semibold transition"
          >
            Next →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Work;
