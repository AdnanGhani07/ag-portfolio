import { NextResponse } from "next/server";
import knowledgeBase from "@/lib/data/knowledgeBase";
import { getGeminiTools } from "@/lib/data/tools";

interface ConversationMessage {
  role: "user" | "ai" | "system";
  content: string;
}

export async function POST(req: Request) {
  try {
    const { message, history } = (await req.json()) as {
      message: string;
      history?: ConversationMessage[];
    };

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

    // ── Build structured knowledge context ──────────────
    const knowledgeContext = knowledgeBase
      .map(
        (chunk) =>
          `[${chunk.category.toUpperCase()}] ${chunk.title}\n${chunk.content}`,
      )
      .join("\n\n---\n\n");

    // ── System prompt ──────────────────────────────────
    const systemPrompt = `You are the AI Assistant of Adnan Ghani, a Full Stack Developer. You are embedded in his personal portfolio website.

ROLE & BEHAVIOR:
- You help recruiters, hiring managers, and visitors learn about Adnan's skills, experience, projects, and background.
- Be conversational, professional, and concise. Use a friendly but knowledgeable tone.
- Always respond in complete sentences, at least 2 sentences long.
- ONLY answer questions based on the knowledge base below. If you don't have information about something, say so politely.
- When listing projects or skills, format them clearly.
- NEVER use Markdown formatting in your responses. No bold (**), no italic (*), no headers (#), no bullet points (- or *). Use plain text only. For lists, use simple numbered items or commas.

SITE CONTROL CAPABILITIES:
You have tools that can control the portfolio website. Use them when appropriate:
- navigate_to_section: When the user wants to view a specific page (home, resume, work, contact).
- toggle_theme: When the user wants to switch between night mode and day mode.
- toggle_matrix: When the user wants to see or hide the Matrix digital rain effect.
- launch_snake: When the user asks to play a game or see easter eggs.
- download_resume: When the user wants Adnan's resume/CV.
- show_projects_by_tech: When the user asks about projects using a specific technology.

When using a tool, ALSO include a short conversational message explaining what you're doing.

KNOWLEDGE BASE:
${knowledgeContext}`;

    // ── Build conversation history for Gemini ──────────
    const conversationContents: Array<{
      role: string;
      parts: Array<{ text: string }>;
    }> = [];

    // Add conversation history (last 10 messages, excluding system)
    if (history && history.length > 0) {
      const relevantHistory = history
        .filter((msg) => msg.role === "user" || msg.role === "ai")
        .slice(-10);

      for (const msg of relevantHistory) {
        conversationContents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        });
      }
    }

    // Add the current user message
    conversationContents.push({
      role: "user",
      parts: [{ text: message }],
    });

    // ── Gemini API request ─────────────────────────────
    const requestBody = {
      system_instruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: conversationContents,
      tools: getGeminiTools(),
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
        retries++;
        if (retries <= maxRetries) {
          await new Promise((r) => setTimeout(r, 1000 * retries));
          continue;
        }
      }
      break;
    }

    if (!response) throw new Error("Could not reach Gemini API");

    const data = await response.json();

    if (!response.ok) {
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
      console.error("Gemini API Error:", JSON.stringify(data.error));
      throw new Error(data.error?.message || "Failed to fetch from Gemini API");
    }

    // ── Parse response: text or function call ──────────
    const candidate = data.candidates?.[0];
    const parts = candidate?.content?.parts || [];

    let replyText = "";
    let action = null;

    for (const part of parts) {
      if (part.text) {
        replyText += part.text;
      }
      if (part.functionCall) {
        action = {
          tool: part.functionCall.name,
          args: part.functionCall.args || {},
        };
      }
    }

    // If we only got a function call with no text, add a default message
    if (action && !replyText.trim()) {
      const toolMessages: Record<string, string> = {
        navigate_to_section: `Taking you to the ${action.args.section || "requested"} section now!`,
        toggle_theme: `Switching to ${action.args.theme === "night" ? "cyberpunk night" : "default day"} mode!`,
        toggle_matrix: action.args.enabled
          ? "Activating the Matrix digital rain effect!"
          : "Deactivating the Matrix effect.",
        launch_snake: "Launching the Snake game! Have fun! 🐍",
        download_resume: "Here comes Adnan's resume — downloading now!",
        show_projects_by_tech: `Let me find projects using ${action.args.tech || "that technology"}...`,
      };
      replyText = toolMessages[action.tool] || "Executing your request now!";
    }

    return NextResponse.json({
      reply:
        replyText ||
        "I'm not sure how to respond to that. Try asking about Adnan's skills, projects, or experience!",
      ...(action && { action }),
    });
  } catch (error: any) {
    console.error("AI Chat Error:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}
