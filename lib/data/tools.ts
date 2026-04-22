/**
 * Gemini Function Calling tool definitions.
 * These define the "actions" the AI can take on the portfolio site.
 */

export const toolDefinitions = [
  {
    name: "navigate_to_section",
    description:
      "Navigate to a specific section of the portfolio website. Use this when the user wants to see a specific page or section like the resume, work/projects, or contact page.",
    parameters: {
      type: "object",
      properties: {
        section: {
          type: "string",
          enum: ["home", "resume", "work", "contact"],
          description: "The section or page to navigate to.",
        },
      },
      required: ["section"],
    },
  },
  {
    name: "toggle_theme",
    description:
      "Switch between night (cyberpunk) and day modes on the portfolio. Use this when the user asks to change the visual theme, enable dark/night mode, or see the cyberpunk aesthetic.",
    parameters: {
      type: "object",
      properties: {
        theme: {
          type: "string",
          enum: ["night", "day"],
          description: "The theme to switch to. 'night' activates the cyberpunk neon aesthetic, 'day' restores the default theme.",
        },
      },
      required: ["theme"],
    },
  },
  {
    name: "toggle_matrix",
    description:
      "Toggle the Matrix digital rain effect on or off. Use this when the user asks about Matrix, digital rain, hacking effect, or wants a visual demonstration.",
    parameters: {
      type: "object",
      properties: {
        enabled: {
          type: "boolean",
          description: "Whether to enable (true) or disable (false) the Matrix rain effect.",
        },
      },
      required: ["enabled"],
    },
  },
  {
    name: "launch_snake",
    description:
      "Launch the hidden Snake mini-game easter egg. Use this when the user asks to play a game, wants to see easter eggs, or mentions the snake game.",
    parameters: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "download_resume",
    description:
      "Trigger a download of Adnan's resume/CV PDF. Use this when the user asks to download, get, or see the resume/CV document.",
    parameters: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "show_projects_by_tech",
    description:
      "List Adnan's projects that use a specific technology or framework. Use this when the user asks about projects built with a particular tech stack like React, Next.js, Python, AI, etc.",
    parameters: {
      type: "object",
      properties: {
        tech: {
          type: "string",
          description: "The technology or framework to filter projects by (e.g., 'React', 'Next.js', 'Python', 'AI').",
        },
      },
      required: ["tech"],
    },
  },
];

/**
 * Convert tool definitions to Gemini API format.
 */
export function getGeminiTools() {
  return [
    {
      functionDeclarations: toolDefinitions,
    },
  ];
}
