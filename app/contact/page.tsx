"use client";

import { MailIcon, Terminal } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-24 bg-[#0a0f1c] min-h-[80vh] flex items-center justify-center relative overflow-hidden" 
      id="contact"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="glass-panel p-8 md:p-12 rounded-2xl border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.1)] relative overflow-hidden">
          {/* Decorative neon top bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-cyan-950/50 border-2 border-cyan-500/50 flex items-center justify-center neon-glow">
              <Terminal className="text-cyan-400 w-8 h-8" />
            </div>
          </div>

          <h2 className="text-4xl font-bold font-tech mb-4 text-center text-white tracking-widest uppercase">
            Let's <span className="text-cyan-400">Connect</span>
          </h2>
          <p className="text-center font-light text-cyan-100/70 mb-12 text-lg max-w-xl mx-auto">
            I'm currently open to new opportunities. Whether you have a question or just want to say hi — I'll try my best to get back to you!
          </p>

          <div className="flex justify-center relative">
            {/* Animated ping effect */}
            <div className="absolute inset-0 bg-cyan-500 rounded-lg blur-md opacity-20 animate-pulse"></div>
            
            <a
              href="mailto:agadnanrocks07@gmail.com"
              className="relative flex items-center gap-4 px-8 py-4 bg-[#0F172A] border border-cyan-500/50 rounded-lg text-cyan-400 hover:bg-cyan-500 hover:text-[#0a0f1c] hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <MailIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-tech tracking-wider uppercase font-semibold text-lg">Send me an email</span>
            </a>
          </div>
          
          {/* Decorative terminal lines */}
          <div className="mt-12 pt-6 border-t border-cyan-500/10 text-center">
            <p className="text-cyan-500/40 font-tech text-xs tracking-widest uppercase">Looking forward to hearing from you.</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
