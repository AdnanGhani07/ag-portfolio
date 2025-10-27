// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const username = "AdnanGhani07";
//     const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

//     const reposRes = await fetch(
//       `https://api.github.com/users/${username}/repos?per_page=100`,
//       {
//         headers: {
//           Authorization: `Bearer ${GITHUB_TOKEN}`,
//         },
//       }
//     );

//     const repos = await reposRes.json();

//     let totalCommits = 0;

//     for (const repo of repos) {
//       // First, try to use pagination last page count (fast for large repos)
//       const commitsRes = await fetch(
//         `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1&sha=${repo.default_branch}`,
//         {
//           headers: {
//             Authorization: `Bearer ${GITHUB_TOKEN}`,
//           },
//         }
//       );

//       const linkHeader = commitsRes.headers.get("Link");

//       if (linkHeader) {
//         // Extract last page number, which indicates total commits
//         const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
//         const count = match ? parseInt(match[1]) : 0;
//         totalCommits += count;
//       } else {
//         // For small repos (no "Link" header), fetch a large page and count directly
//         const allCommitsRes = await fetch(
//           `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=100&sha=${repo.default_branch}`,
//           {
//             headers: {
//               Authorization: `Bearer ${GITHUB_TOKEN}`,
//             },
//           }
//         );
//         const allCommits = await allCommitsRes.json();
//         totalCommits += Array.isArray(allCommits) ? allCommits.length : 0;
//       }
//     }

//     return NextResponse.json({ totalCommits });
//   } catch (error) {
//     console.error("Error fetching GitHub commits:", error);
//     return NextResponse.json({ totalCommits: 0 });
//   }
// }

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const username = "AdnanGhani07"; // Your GitHub username
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Personal Access Token with repo read rights

    // Fetch all repositories (adjust per_page if you have >100 repos)
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      }
    );

    const repos = await reposRes.json();

    let totalCommits = 0;

    for (const repo of repos) {
      // Count commits for each repo (always handles pagination)
      let repoCommits = 0;
      let page = 1;
      const pageSize = 100; // GitHub max per_page

      while (true) {
        const commitRes = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=${pageSize}&page=${page}&sha=${repo.default_branch}`,
          {
            headers: {
              Authorization: `Bearer ${GITHUB_TOKEN}`,
            },
          }
        );
        const commits = await commitRes.json();

        // Error checking
        if (!Array.isArray(commits)) {
          break; // Skip malformed responses
        }

        repoCommits += commits.length;
        if (commits.length < pageSize) {
          // Last page reached
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
