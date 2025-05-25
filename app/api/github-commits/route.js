import { NextResponse } from "next/server";

export async function GET() {
  try {
    const username = "AdnanGhani07";
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    // Step 1: Fetch all repos
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    const repos = await reposRes.json();

    let totalCommits = 0;

    // Step 2: For each repo, get commit count from default branch
    for (const repo of repos) {
      const commitRes = await fetch(
        `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1&sha=${repo.default_branch}`,
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
          },
        }
      );

      const linkHeader = commitRes.headers.get("Link");
      if (linkHeader) {
        const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
        const count = match ? parseInt(match[1]) : 0;
        totalCommits += count;
      } else {
        // Fallback if no Link header (less than 1 page of commits)
        const commits = await commitRes.json();
        totalCommits += commits.length || 0;
      }
    }

    return NextResponse.json({ totalCommits });
  } catch (error) {
    console.error("Error fetching GitHub commits:", error);
    return NextResponse.json({ totalCommits: 0 });
  }
}
