export const WIDTH = 1900;
export const HEIGHT = 460;
export const CELL = 24;
export const GAP = 7;
export const LEFT = 70;
export const TOP = 180;
export const LEVELS = ['#172554', '#1d4ed8', '#7c3aed', '#c026d3', '#f0abfc'];

const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[char]));

export function starPolygon(cx, cy, outer, inner) {
  return Array.from({ length: 10 }, (_, index) => {
    const angle = -Math.PI / 2 + index * Math.PI / 5;
    const radius = index % 2 === 0 ? outer : inner;
    return `${(cx + Math.cos(angle) * radius).toFixed(2)},${(cy + Math.sin(angle) * radius).toFixed(2)}`;
  }).join(' ');
}

export function createBackgroundStars() {
  return Array.from({ length: 90 }, (_, index) => {
    const x = (index * 83 + 119) % WIDTH;
    const y = (index * 137 + 31) % (HEIGHT - 20) + 10;
    const radius = index % 11 === 0 ? 4 : index % 5 === 0 ? 2.8 : 2;
    const delay = (index % 9) * 0.37;
    return `<circle class="star" cx="${x}" cy="${y}" r="${radius}" style="animation-delay:${delay}s"/>`;
  }).join('');
}

export function createContributionStars({ weeks, cells, max }) {
  const level = count => count === 0 ? 0 : Math.min(4, Math.ceil((count / max) * 4));
  const routeCells = weeks.flatMap((week, x) => {
    const days = week.contributionDays.map((day, y) => ({ x, y, count: day.contributionCount }));
    const active = days.filter(day => day.count > 0);
    if (!active.length) return [];
    return [active.sort((a, b) => b.count - a.count || Math.abs(a.y - 3) - Math.abs(b.y - 3))[0]];
  });
  const routeIndex = new Map(routeCells.map((cell, index) => [`${cell.x}:${cell.y}`, index]));
  const contributionStars = cells.map(({ x, y, count }) => {
    const px = LEFT + x * (CELL + GAP);
    const py = TOP + y * (CELL + GAP);
    const cx = px + CELL / 2;
    const cy = py + CELL / 2;
    const currentLevel = level(count);
    const outer = currentLevel === 0 ? 9 : 10 + currentLevel * 1.5;
    const index = routeIndex.get(`${x}:${y}`);
    const routeClass = index === undefined ? '' : ' route-star';
    const delay = index === undefined || routeCells.length < 2 ? 0 : (index / (routeCells.length - 1)) * 18 - 1.2;
    const style = index === undefined ? '' : ` style="--pulse-delay:${delay.toFixed(2)}s"`;
    return `<polygon class="contribution-star level-${currentLevel}${routeClass}" points="${starPolygon(cx, cy, outer, outer * .42)}"${style}><title>${esc(count)} contribuição(ões)</title></polygon>`;
  }).join('');
  const path = routeCells.map(cell => `${LEFT + cell.x * (CELL + GAP) + CELL / 2},${TOP + cell.y * (CELL + GAP) + CELL / 2}`).join(' ');
  return { contributionStars, path };
}

export function createLegend() {
  const stars = LEVELS.map((_, index) => {
    const radius = index === 0 ? 9 : 10 + index * 1.5;
    return `<polygon class="contribution-star level-${index}" points="${starPolygon(LEFT + 160 + index * 38, 430, radius, radius * .42)}"/>`;
  }).join('');
  return `<text class="subtle" x="${LEFT}" y="438">menos atividade</text>${stars}<text class="subtle" x="${LEFT + 315}" y="438">mais atividade</text>`;
}
