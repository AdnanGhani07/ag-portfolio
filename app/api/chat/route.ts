import { NextResponse } from "next/server";
import projects, {
  projectsDescriptionsMap,
  projectsTagsMap,
  projectsMap,
} from "@/lib/data/projects";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured in the environment." },
        { status: 500 },
      );
    }

    const rawResumeContext = `
ADNAN GHANI
agadnanrocks07@gmail.com | +91-9504708989 | LinkedIn | Github | Portfolio

SUMMARY
Results-driven Full Stack Developer skilled in React.js, Next.js, and TypeScript. Experienced in building responsive, full-stack web applications with intuitive user interfaces. Eager to leverage technical expertise and problem-solving skills to deliver high-performance digital experiences.

EXPERIENCE
Software Intern - AariyaTech, Remote Dec 2025 - Present
• Engineered an AI-Driven CV Optimization System using Next.js, TypeScript, and Google GenAI. Developed custom parsing logic to compute ATS scores and eliminate LLM data hallucinations, increasing data extraction accuracy by 15%.
• Architected a Tiered Appointment Booking Flow by developing a stateful, multi-step scheduling sequence. Integrated frontend timezone handling with real-time backend slot validation, reducing booking conflicts by 20%.
• Built and Streamlined Dynamic UI Interfaces utilizing React Hook Form, Tailwind CSS, and Radix UI. Resolved deep TypeScript bottlenecks and eliminated data inconsistencies, improving form submission reliability across 5+ complex data-entry workflows.

Summer Intern - Tata Steel Ltd., Jharkhand Aug 2023 - Oct 2023
• Developed a fraudulent image detection system by implementing and evaluating Custom FaceNet and ResNet-50 Convolutional Neural Networks.
• Optimized model training pipelines across real and fake face datasets using Adam optimization, learning rate scheduling, and binary cross-entropy loss.
• Interpreted model predictions by utilizing Saliency Maps and GradCAM++ to visualize and analyze the neural network’s critical decision-making regions.

PROJECTS
CinePulse - A Movie, TV Show & Anime Guide May 2025 - Jul 2025
• Developed a responsive, full-stack entertainment database to streamline the discovery of movies, TV shows, and anime.
• Engineered the user-facing frontend and server-side API routing, reducing data retrieval time by 20% through optimized component rendering and state management.
• Designed an intuitive UI/UX featuring multi-parameter search and filtering, improving content discoverability across 3 distinct entertainment categories.

Woven Words - A Full-Stack Literary Blog May 2025 - Jul 2025
• Developed a full-stack literary blog dedicated to sharing original poems, prose, and personal reflections.
• Engineered a responsive reading interface using Next.js, implementing server-side rendering to achieve fast page load times for seamless content delivery.
• Built an interactive user engagement system that supports seamless commenting and sharing functionalities, fostering community interaction across multiple post categories.

SleepTracker - A Personal Sleep Analytics Web App Apr 2025 - Jun 2025
• Built a server-side rendered web application utilizing Next.js to monitor and analyze personal sleep habits, supporting continuous daily data logging.
• Implemented seamless user authentication using Clerk, ensuring secure session management and strict data privacy for individual user profiles.
• Developed interactive data visualization features mapping up to 30+ days of sleep duration and quality metrics, enabling users to easily identify long-term health trends.

SKILLS SUMMARY
Languages: Java, JavaScript, TypeScript, HTML, CSS, SQL
Frameworks & Libraries: React.js, Next.js, Node.js, Spring Boot
Databases: MongoDB, Neon, Supabase, Firebase
Tools & Technologies: Git, Postman, Docker, RESTful APIs, Clerk, Power BI

EDUCATION
Vellore Institute of Technology › September 2021 - May 2025
Bachelor of Technology in Electronics and Computer Engineering (CGPA: 9.15) Chennai, India
Tarapore School Agrico A May 2018 - Jun 2020
Indian School Certificate (ISC board : 80.75%) Jamshedpur, India
`;

    const projectContext = projects
      .map((p) => {
        return `Project: ${projectsMap[p]}\nDescription: ${projectsDescriptionsMap[p]}\nStack: ${projectsTagsMap[p]?.join(", ") || "N/A"}`;
      })
      .join("\n\n");

    const systemPrompt = `[SYSTEM INSTRUCTION: You are an AI assistant of Adnan Ghani, a highly skilled Full Stack Developer. Always respond in complete sentences. Your role is exclusively to help recruiters learn about Adnan's capability, tech stack, and portfolio. Be conversational, witty and professional. Ensure your response is at least 2 sentences long.

Here is Adnan's Resume / Base Context:
${rawResumeContext}

Here is Adnan's Project Portfolio Data:
${projectContext}
]\n\nUser: `;

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: systemPrompt + message }],
        },
      ],
    };

    let response;
    let retries = 0;
    const maxRetries = 2;

    while (retries <= maxRetries) {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );

      if (response.status === 429 || response.status === 503) {
        // High demand or rate limit - wait and retry
        retries++;
        if (retries <= maxRetries) {
          await new Promise((r) => setTimeout(r, 1000 * retries));
          continue;
        }
      }
      break;
    }

    if (!response) throw new Error("Cloud not reach Gemini API");

    const data = await response.json();

    if (!response.ok) {
      // If it's still high demand after retries, return a friendlier message
      if (
        response.status === 429 ||
        response.status === 503 ||
        data.error?.message?.includes("demand")
      ) {
        return NextResponse.json({
          reply:
            "I'm currently receiving a lot of messages! Please give me a second to catch my breath and try asking again. 😅",
        });
      }
      throw new Error(data.error?.message || "Failed to fetch from Gemini API");
    }

    const aiMessage =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response received.";

    return NextResponse.json({ reply: aiMessage });
  } catch (error: any) {
    console.error("AI Chat Error:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}
