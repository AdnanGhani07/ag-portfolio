import { NextResponse } from "next/server";

export async function GET() {
  const username = "AdnanGhani07";
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      next: { revalidate: 60 }, // Cache lowered to 1 minute for faster live updates
      headers: {
        "Accept": "application/vnd.github.v3+json",
      }
    });

    if (!res.ok) {
      throw new Error(`GitHub API err: ${res.status}`);
    }

    const repos = await res.json();
    return NextResponse.json({ repos });
  } catch (error) {
    console.error("Failed fetching repositories", error);
    return NextResponse.json({ error: "Failed fetching repositories" }, { status: 500 });
  }
}
