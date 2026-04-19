export const projectsMap: Record<string, string> = {
  "ag-portfolio": "Personal Portfolio",
  "stocklens-app": "StockLens",
  "nextjs-blog-website": "Woven Words",
  "nextjs-movie-website": "CinePulse",
  "nextjs-sleep-tracker-website": "Sleep Tracker",
  "nextjs-ai-image-editor": "AI Image Editor",
  "Persona-Picks": "Persona Picks",
};

export const projectsDescriptionsMap: Record<string, string> = {
  "Persona-Picks":
    "A recommendation system using personality traits to suggest products, movies, and books.",
  "ag-portfolio":
    "A responsive portfolio website built with Next.js and Tailwind CSS.",
  "stocklens-app":
    "A stock market analysis platform that leverages advanced AI to provide users with deep insights into stock market trends, helping them make informed investment decisions.",
  "nextjs-blog-website":
    "A literary blog web app that serves as a quiet, introspective corner of the internet dedicated to sharing original poems, prose, personal reflections, and fragments of thought.",
  "nextjs-movie-website":
    "A responsive and dynamic web application designed to provide a comprehensive database of movies, TV shows, and anime.",
  "nextjs-sleep-tracker-website":
    "A modern web application dedicated to helping you monitor and understand your sleep habits.",
  "nextjs-ai-image-editor":
    "A modern web application dedicated to helping you transform your images with cutting-edge AI technology.",
};

export const projectsTagsMap: Record<string, string[]> = {
  "Persona-Picks": ["Python", "Machine Learning", "Psychological Profiling"],
  "ag-portfolio": ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  "stocklens-app": ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  "nextjs-blog-website": ["React.js", "Next.js", "Tailwind CSS", "Clerk"],
  "nextjs-movie-website": ["Next.js", "Tailwind CSS", "Clerk", "AI"],
  "nextjs-sleep-tracker-website": [
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Clerk",
  ],
  "nextjs-ai-image-editor": [
    "TypeScript",
    "Next.js",
    "Polar",
    "ImageKit",
    "BetterAuth",
    "AI",
  ],
};

const projects = Object.keys(projectsMap);
export default projects;
