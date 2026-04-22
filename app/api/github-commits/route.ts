import { NextResponse } from "next/server";

interface GitHubRepo {
  name: string;
  default_branch: string;
}

export async function GET() {
  try {
    const username = "AdnanGhani07";
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    // Fetch all repositories
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      },
    );

    const repos: GitHubRepo[] = await reposRes.json();

    let totalCommits = 0;

    for (const repo of repos) {
      let repoCommits = 0;
      let page = 1;
      const pageSize = 100;

      while (true) {
        const commitRes = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=${pageSize}&page=${page}&sha=${repo.default_branch}`,
          {
            headers: {
              Authorization: `Bearer ${GITHUB_TOKEN}`,
            },
          },
        );
        const commits: unknown = await commitRes.json();

        if (!Array.isArray(commits)) {
          break;
        }

        repoCommits += commits.length;
        if (commits.length < pageSize) {
          break;
        }
        page++;
      }

      totalCommits += repoCommits;
    }

    return NextResponse.json({ totalCommits });
  } catch (error) {
    console.error("Error fetching GitHub commits:", error);
    return NextResponse.json({ totalCommits: 0 });
  }
}
