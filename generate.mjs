import fs from 'node:fs/promises';
import { fetchContributions } from './github.mjs';
import { WIDTH, HEIGHT, LEFT, createBackgroundStars, createContributionStars, createLegend } from './stars.mjs';
import { createAnimationCSS } from './animation.mjs';
import { createSpaceship } from './spaceship.mjs';

const token = process.env.GITHUB_TOKEN;
const username = process.env.GITHUB_USER;
const output = process.env.OUTPUT || 'github-contribution-spaceship.svg';
const theme = process.env.THEME || 'light';

if (!token || !username) throw new Error('Defina GITHUB_TOKEN e GITHUB_USER.');

const { weeks, cells, max } = await fetchContributions(token, username);
const { contributionStars, path } = createContributionStars({ weeks, cells, max });
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="title desc">
  <title id="title">Contribuições de ${username} em uma viagem espacial</title>
  <desc id="desc">Um disco voador atravessa uma grade de contribuições cercada por estrelas.</desc>
  <style>${createAnimationCSS(theme, path)}</style>
  <defs>
    <linearGradient id="space-gradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="55%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#312e81"/>
    </linearGradient>
  </defs>
  <rect class="space-background" width="100%" height="100%" rx="18"/>
  <g aria-hidden="true">${createBackgroundStars()}</g>
  <text class="label" x="45" y="55">${username} · missão de contribuições</text>
  <text class="subtle" x="45" y="100">Cada estrela representa uma contribuição. Tamanho e cor indicam o nível de atividade.</text>
  <polyline class="route" points="${path}"/>
  <g>${contributionStars}</g>
  ${createSpaceship()}
  ${createLegend()}
  <text class="subtle" x="${WIDTH - 280}" y="438">últimas 52 semanas</text>
</svg>`;

await fs.mkdir('dist', { recursive: true });
await fs.writeFile(`dist/${output}`, svg);
console.log(`Gerado dist/${output}`);
