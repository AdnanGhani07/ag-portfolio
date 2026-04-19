import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

//components
import Socials from "@/components/Socials";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import ParticleNetwork from "@/components/ParticleNetwork";

const Home = () => {
  return (
    <section className="h-full relative overflow-hidden">
      <ParticleNetwork />
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto h-full px-4 relative z-10">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/*text*/}
          <div className="text-center xl:text-left order-2 xl:order-none z-10 relative">
            <span className="text-xl text-cyan-400 font-tech uppercase tracking-widest neon-text-glow font-bold">
              Full Stack Developer
            </span>
            <h1 className="h1 mt-2 mb-6 font-tech">
              Hello I'm <br />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 neon-text-glow">
                Adnan Ghani
              </span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/70 leading-relaxed font-light text-lg">
              I am proficient in various programming languages and technologies.
            </p>
            {/*btn and socials*/}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <a href="/AG-Resumex.pdf" download>
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2 border-cyan-500/50 text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500 hover:text-[#0a0f1c] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all duration-300 font-tech tracking-wider rounded-none"
                >
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </Button>
              </a>

              <div className="mb-8 xl:mb-0">
                <Socials
                  containerStyles="flex gap-6 relative z-20"
                  iconStyles="w-10 h-10 border border-cyan-500/30 rounded-none flex justify-center items-center text-cyan-400 text-base glass-panel hover:bg-cyan-500 hover:text-[#0a0f1c] hover:shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all duration-300"
                />
              </div>
            </div>
          </div>
          {/*photo*/}
          <div className="order-1 xl:order-none mb-8 xl:mb-0 relative mt-8 xl:mt-0">
            <div className="absolute inset-0 bg-cyan-500/10 blur-[80px] rounded-full z-0 pointer-events-none"></div>
            <div className="relative z-10 glass-panel rounded-full p-2 neon-glow border border-cyan-500/30">
              <Photo />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 mt-6 xl:mt-12 relative z-20 pb-12">
        <div className="glass-panel rounded-xl mx-auto max-w-5xl shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden backdrop-blur-2xl bg-[#0F172A]/60 border border-cyan-500/20">
          {/* Decorative neon top bar */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80"></div>
          <div className="py-6 px-4">
            <Stats />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
