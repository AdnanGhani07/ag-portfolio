export async function GET(req) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    return new Response("GitHub token not found", { status: 500 });
  }

  // Step 1: Get user ID
  const userQuery = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          viewer {
            login
            id
          }
        }
      `,
    }),
  });

  const userData = await userQuery.json();
  const userId = userData.data.viewer.id;

  // Step 2: Get commit count
  const commitQuery = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          viewer {
            repositories(first: 100, isFork: false) {
              nodes {
                defaultBranchRef {
                  target {
                    ... on Commit {
                      history(author: { id: "${userId}" }) {
                        totalCount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
    }),
  });

  const repoData = await commitQuery.json();

  const repos = repoData.data.viewer.repositories.nodes;

  const totalCommits = repos.reduce((sum, repo) => {
    const count = repo.defaultBranchRef?.target?.history?.totalCount || 0;
    return sum + count;
  }, 0);

  return Response.json({ totalCommits });
}
