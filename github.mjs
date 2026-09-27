export async function fetchContributions(token, username) {
  const query = `query($login:String!) {
    user(login:$login) {
      contributionsCollection {
        contributionCalendar {
          weeks { contributionDays { contributionCount date } }
        }
      }
    }
  }`;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      authorization: `bearer ${token}`,
      'content-type': 'application/json',
      'user-agent': 'github-contribution-spaceship'
    },
    body: JSON.stringify({ query, variables: { login: username } })
  });

  if (!response.ok) throw new Error(`GitHub respondeu ${response.status}`);
  const payload = await response.json();
  if (payload.errors?.length) throw new Error(payload.errors.map(e => e.message).join('; '));
  if (!payload.data?.user) throw new Error(`Usuário não encontrado: ${username}`);

  const weeks = payload.data.user.contributionsCollection.contributionCalendar.weeks;
  const cells = weeks.flatMap((week, x) => week.contributionDays.map((day, y) => ({ x, y, count: day.contributionCount })));
  const max = Math.max(1, ...cells.map(cell => cell.count));
  return { weeks, cells, max, username };
}
