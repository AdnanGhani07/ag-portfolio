import { MailIcon } from "lucide-react"; // or use FiMail from react-icons

const Contact = () => {
  return (
    <section className="py-16 bg-primary text-cyan-500" id="contact">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-4 text-center">Get in Touch</h2>
        <p className="text-center text-cyan-500/70 mb-8">
          I'm currently open to new opportunities. Whether you have a question or just want to say hi — I'll try my best to get back to you!
        </p>

        {/* Email button */}
        <div className="flex justify-center mb-8">
          <a
            href="mailto:agadnanrocks07@gmail.com"
            className="flex items-center gap-2 px-6 py-3 border border-cyan-500 rounded-lg text-cyan-500 hover:bg-cyan-500 hover:text-primary transition-all duration-300"
          >
            <MailIcon className="w-5 h-5" />
            <span>Email Me</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
