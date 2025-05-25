import Socials from "./Socials";

const Footer = () => {
    return (
      <footer className="bg-primary text-cyan-500 py-8 mt-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-4">
          <p className="text-sm text-cyan-500">
            &copy; {new Date().getFullYear()} Adnan Ghani.
          </p>
          <div className="flex gap-6">
            {/* Reuse your Socials component, but smaller */}
            <Socials
              containerStyles="flex gap-4"
              iconStyles="w-7 h-7 border border-cyan-500 rounded-full flex justify-center items-center text-cyan-500 text-sm hover:bg-cyan-500 hover:text-primary transition-all duration-300"
            />
          </div>
          <p className="text-sm text-cyan-500">
            Designed &amp; Built by Adnan Ghani
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  