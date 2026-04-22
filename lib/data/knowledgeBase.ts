export interface KnowledgeChunk {
  id: string;
  category: "bio" | "skills" | "experience" | "projects" | "education" | "contact";
  title: string;
  content: string;
  tags: string[];
}

const knowledgeBase: KnowledgeChunk[] = [
  // ── Bio ──────────────────────────────────────────────
  {
    id: "bio-summary",
    category: "bio",
    title: "Professional Summary",
    content:
      "Adnan Ghani is a results-driven Full Stack Developer skilled in React.js, Next.js, and TypeScript. He has experience building responsive, full-stack web applications with intuitive user interfaces. He is eager to leverage technical expertise and problem-solving skills to deliver high-performance digital experiences.",
    tags: ["who", "about", "summary", "introduction", "background", "bio"],
  },
  {
    id: "bio-location",
    category: "bio",
    title: "Location & Availability",
    content:
      "Adnan is based in India. He graduated from VIT Chennai in May 2025 with a B.Tech in Electronics and Computer Engineering. He is currently working as a Software Intern at AariyaTech (Remote) and is open to full-time opportunities.",
    tags: ["location", "city", "country", "where", "available", "availability", "remote", "relocate"],
  },

  // ── Skills ───────────────────────────────────────────
  {
    id: "skills-languages",
    category: "skills",
    title: "Programming Languages",
    content:
      "Adnan is proficient in: Java, JavaScript, TypeScript, HTML, CSS, and SQL.",
    tags: ["languages", "programming", "code", "java", "javascript", "typescript", "html", "css", "sql"],
  },
  {
    id: "skills-frameworks",
    category: "skills",
    title: "Frameworks & Libraries",
    content:
      "Adnan works with: React.js, Next.js, Node.js, Spring Boot, Tailwind CSS, Framer Motion, Radix UI, and React Hook Form.",
    tags: ["frameworks", "libraries", "react", "nextjs", "next.js", "node", "spring", "tailwind", "framer", "radix"],
  },
  {
    id: "skills-databases",
    category: "skills",
    title: "Databases",
    content:
      "Adnan has experience with: MongoDB, Neon (PostgreSQL), Supabase, and Firebase.",
    tags: ["database", "databases", "db", "mongodb", "neon", "supabase", "firebase", "postgresql", "sql"],
  },
  {
    id: "skills-tools",
    category: "skills",
    title: "Tools & Technologies",
    content:
      "Adnan uses: Git, Postman, Docker, RESTful APIs, Clerk (authentication), Power BI, and Vercel for deployment.",
    tags: ["tools", "technologies", "git", "docker", "postman", "api", "rest", "clerk", "vercel", "deployment"],
  },
  {
    id: "skills-ai",
    category: "skills",
    title: "AI & Machine Learning",
    content:
      "Adnan has experience with Google GenAI (Gemini), building AI-driven CV optimization systems, implementing CNNs (FaceNet, ResNet-50) for image detection, and using techniques like Saliency Maps and GradCAM++ for model interpretability.",
    tags: ["ai", "machine learning", "ml", "deep learning", "neural", "cnn", "gemini", "genai", "artificial intelligence"],
  },

  // ── Experience ───────────────────────────────────────
  {
    id: "exp-aariyatech",
    category: "experience",
    title: "Software Intern at AariyaTech",
    content:
      "Software Intern at AariyaTech (Remote), Dec 2025 - Present.\n• Engineered an AI-Driven CV Optimization System using Next.js, TypeScript, and Google GenAI. Developed custom parsing logic to compute ATS scores and eliminate LLM data hallucinations, increasing data extraction accuracy by 15%.\n• Architected a Tiered Appointment Booking Flow by developing a stateful, multi-step scheduling sequence. Integrated frontend timezone handling with real-time backend slot validation, reducing booking conflicts by 20%.\n• Built and Streamlined Dynamic UI Interfaces utilizing React Hook Form, Tailwind CSS, and Radix UI. Resolved deep TypeScript bottlenecks and eliminated data inconsistencies, improving form submission reliability across 5+ complex data-entry workflows.",
    tags: ["aariyatech", "intern", "internship", "work", "experience", "job", "current", "cv", "ats", "booking", "remote"],
  },
  {
    id: "exp-tatasteel",
    category: "experience",
    title: "Summer Intern at Tata Steel",
    content:
      "Summer Intern at Tata Steel Ltd., Jharkhand, Aug 2023 - Oct 2023.\n• Developed a fraudulent image detection system by implementing and evaluating Custom FaceNet and ResNet-50 Convolutional Neural Networks.\n• Optimized model training pipelines across real and fake face datasets using Adam optimization, learning rate scheduling, and binary cross-entropy loss.\n• Interpreted model predictions by utilizing Saliency Maps and GradCAM++ to visualize and analyze the neural network's critical decision-making regions.",
    tags: ["tata", "steel", "intern", "internship", "summer", "experience", "job", "cnn", "face", "detection", "ml", "machine learning"],
  },

  // ── Projects ─────────────────────────────────────────
  {
    id: "proj-portfolio",
    category: "projects",
    title: "Personal Portfolio",
    content:
      "ag-portfolio: A responsive, futuristic portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Features include a dynamic weather-based theme system (Cyberpunk Night mode), an AI terminal assistant with Gemini integration, interactive particle networks, a hidden Snake game easter egg, and Matrix rain effects. The site demonstrates advanced frontend engineering with glassmorphism, micro-animations, and editorial design principles.\nLive: https://adnan-ghani.vercel.app\nGitHub: https://github.com/AdnanGhani07/ag-portfolio",
    tags: ["portfolio", "personal", "website", "this", "site", "ag-portfolio"],
  },
  {
    id: "proj-cinepulse",
    category: "projects",
    title: "CinePulse",
    content:
      "CinePulse: A Movie, TV Show & Anime Guide (May 2025 - Jul 2025). A responsive, full-stack entertainment database to streamline discovery of movies, TV shows, and anime. Engineered frontend and server-side API routing, reducing data retrieval time by 20%. Designed intuitive UI/UX with multi-parameter search and filtering across 3 entertainment categories.\nStack: Next.js, Tailwind CSS, Clerk, AI\nGitHub: https://github.com/AdnanGhani07/nextjs-movie-website",
    tags: ["cinepulse", "movie", "tv", "anime", "entertainment", "nextjs-movie-website"],
  },
  {
    id: "proj-wovenwords",
    category: "projects",
    title: "Woven Words",
    content:
      "Woven Words: A Full-Stack Literary Blog (May 2025 - Jul 2025). A platform for sharing original poems, prose, and personal reflections. Built with Next.js using server-side rendering for fast page loads. Features an interactive engagement system with commenting and sharing.\nStack: React.js, Next.js, Tailwind CSS, Clerk\nGitHub: https://github.com/AdnanGhani07/nextjs-blog-website",
    tags: ["woven", "words", "blog", "literary", "writing", "poems", "nextjs-blog-website"],
  },
  {
    id: "proj-sleeptracker",
    category: "projects",
    title: "Sleep Tracker",
    content:
      "SleepTracker: A Personal Sleep Analytics Web App (Apr 2025 - Jun 2025). A server-side rendered web application to monitor and analyze sleep habits with daily logging. Uses Clerk authentication for secure session management. Features interactive data visualization mapping 30+ days of sleep duration and quality metrics.\nStack: TypeScript, Next.js, Tailwind CSS, Clerk\nGitHub: https://github.com/AdnanGhani07/nextjs-sleep-tracker-website",
    tags: ["sleep", "tracker", "health", "analytics", "nextjs-sleep-tracker-website"],
  },
  {
    id: "proj-stocklens",
    category: "projects",
    title: "StockLens",
    content:
      "StockLens: A stock market analysis platform that leverages advanced AI to provide users with deep insights into stock market trends, helping them make informed investment decisions.\nStack: TypeScript, Next.js, Tailwind CSS, Framer Motion\nGitHub: https://github.com/AdnanGhani07/stocklens-app",
    tags: ["stock", "stocklens", "market", "finance", "investment", "ai", "stocklens-app"],
  },
  {
    id: "proj-aiimageeditor",
    category: "projects",
    title: "AI Image Editor",
    content:
      "AI Image Editor: A modern web application to transform images with cutting-edge AI technology.\nStack: TypeScript, Next.js, Polar, ImageKit, BetterAuth, AI\nGitHub: https://github.com/AdnanGhani07/nextjs-ai-image-editor",
    tags: ["image", "editor", "ai", "transform", "imagekit", "nextjs-ai-image-editor"],
  },
  {
    id: "proj-personapicks",
    category: "projects",
    title: "Persona Picks",
    content:
      "Persona Picks: A recommendation system using personality traits to suggest products, movies, and books. Built with Python and machine learning techniques including psychological profiling.\nStack: Python, Machine Learning, Psychological Profiling\nGitHub: https://github.com/AdnanGhani07/Persona-Picks",
    tags: ["persona", "picks", "recommendation", "personality", "python", "ml", "machine learning"],
  },

  // ── Education ────────────────────────────────────────
  {
    id: "edu-vit",
    category: "education",
    title: "B.Tech from VIT Chennai",
    content:
      "Vellore Institute of Technology (VIT), Chennai, India. September 2021 - May 2025. Bachelor of Technology in Electronics and Computer Engineering. CGPA: 9.15 / 10.",
    tags: ["education", "university", "college", "vit", "degree", "btech", "engineering", "cgpa", "gpa"],
  },
  {
    id: "edu-school",
    category: "education",
    title: "ISC from Tarapore School",
    content:
      "Tarapore School Agrico A, Jamshedpur, India. May 2018 - Jun 2020. Indian School Certificate (ISC board). Score: 80.75%.",
    tags: ["school", "isc", "12th", "high school", "tarapore", "jamshedpur"],
  },

  // ── Contact ──────────────────────────────────────────
  {
    id: "contact-info",
    category: "contact",
    title: "Contact Information",
    content:
      "Email: agadnanrocks07@gmail.com\nPhone: +91-9504708989\nLinkedIn: https://linkedin.com/in/adnan-ghani\nGitHub: https://github.com/AdnanGhani07\nPortfolio: https://adnan-ghani.vercel.app",
    tags: ["contact", "email", "phone", "linkedin", "github", "reach", "hire", "connect", "social"],
  },
];

export default knowledgeBase;
