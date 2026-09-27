export function createAnimationCSS(theme, path) {
  const stroke = theme === 'dark' ? '#30363d' : '#d0d7de';
  return `
    :root { color-scheme: ${theme}; }
    .label, .subtle { fill: #ffffff; stroke: #0d1117; stroke-width: 2px; paint-order: stroke; stroke-linejoin: round; }
    .label { font: 700 34px system-ui, sans-serif; }
    .subtle { font: 20px system-ui, sans-serif; }
    .space-background { fill: url(#space-gradient); }
    .contribution-star { stroke: ${stroke}; stroke-width: .35; opacity: .92; }
    .level-0 { fill: #172554; opacity: .5; } .level-1 { fill: #1d4ed8; }
    .level-2 { fill: #7c3aed; } .level-3 { fill: #c026d3; } .level-4 { fill: #f0abfc; }
    .route-star { transform-box: fill-box; transform-origin: center; animation: pulse-star 18s linear infinite var(--pulse-delay); }
    .star { fill: #ffffff; opacity: .8; animation: twinkle 2.4s ease-in-out infinite alternate; }
    .route { fill: none; stroke: #58a6ff; stroke-width: 2; stroke-dasharray: 6 7; opacity: .55; }
    .ship { offset-path: path('M ${path}'); offset-distance: 0%; animation: fly 18s linear infinite; transform-box: fill-box; transform-origin: center; }
    .flame { animation: flame .24s ease-in-out infinite alternate; transform-origin: 0 10px; }
    @keyframes fly { to { offset-distance: 100%; } }
    @keyframes twinkle { from { opacity: .25; } to { opacity: 1; } }
    @keyframes pulse-star { 0%, 4%, 100% { transform: scale(1); filter: brightness(1); } 5%, 8% { transform: scale(1.75); filter: brightness(2.2) drop-shadow(0 0 7px #fde68a); } 12% { transform: scale(1); filter: brightness(1); } }
    @keyframes flame { from { transform: scaleX(.65); opacity: .6; } to { transform: scaleX(1.15); opacity: 1; } }
    @media (prefers-reduced-motion: reduce) { .ship { animation: none; offset-distance: 100%; } .star, .flame, .route-star { animation: none; } }
  `;
}
