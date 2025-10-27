"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import projects from "@/lib/data/projects";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const Work = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Attach refs after DOM is ready and when Swiper instance is present
  useEffect(() => {
    if (
      swiperInstance &&
      prevRef.current &&
      nextRef.current &&
      typeof window !== "undefined"
    ) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance, isReady]); // make sure this happens after ready

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
      className="py-12 bg-gradient-to-br from-[#10161d] via-[#132531] to-[#081a2a]"
    >
      <div className="container mx-auto w-full px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-cyan-400">
          My Projects
        </h2>

        {/* Fixed height container for consistent sizing */}
        <div className="relative mb-16">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={40}
            slidesPerView={1}
            onSwiper={setSwiperInstance}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className="pb-16"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-xl p-8 
                             h-[500px] xl:h-[400px] 
                             flex flex-col xl:flex-row items-center gap-8
                             overflow-hidden"
                >
                  {/* Project info section */}
                  <div className="w-full xl:w-1/2 h-full flex flex-col justify-center space-y-4">
                    <h2 className="text-lg text-cyan-400 uppercase font-semibold tracking-wider">
                      {project.num} — {project.category}
                    </h2>
                    <h3 className="text-2xl xl:text-3xl font-extrabold text-white line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-white/80 text-sm xl:text-base line-clamp-3 flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="bg-cyan-400/10 text-cyan-300 px-2 py-1 rounded-full text-xs font-bold uppercase hover:bg-cyan-400/30 transition"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-auto">
                      {project.git && (
                        <Link
                          href={project.git}
                          target="_blank"
                          rel="noopener"
                          className="bg-cyan-400/30 text-cyan-100 px-3 py-2 rounded font-mono text-sm hover:bg-cyan-400/50 hover:underline transition"
                        >
                          <FaGithub />
                        </Link>
                      )}
                      {project.demo && (
                        <Link
                          href={project.demo}
                          target="_blank"
                          rel="noopener"
                          className="bg-cyan-400/30 text-cyan-300 px-3 py-2 rounded font-mono text-sm hover:bg-white/40 hover:underline transition"
                        >
                          <FaExternalLinkAlt />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation arrows outside the Swiper */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="bg-cyan-400/30 text-cyan-100 px-3 py-2 rounded font-mono text-sm hover:bg-cyan-400/50 hover:underline transition"
              ref={prevRef}
            >
              Prev
            </button>
            <button
              className="bg-cyan-400/30 text-cyan-100 px-3 py-2 rounded font-mono text-sm hover:bg-cyan-400/50 hover:underline transition"
              ref={nextRef}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Work;
