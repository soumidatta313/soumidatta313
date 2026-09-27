export function createSpaceship() {
  return `<g class="ship" transform="translate(-38 -28) scale(1.55)">
    <ellipse cx="25" cy="23" rx="23" ry="10" fill="#cbd5e1" stroke="#ffffff" stroke-width="1.5"/>
    <path d="M10 20 C13 7 37 7 40 20 C32 25 18 25 10 20 Z" fill="#a78bfa" stroke="#f5f3ff" stroke-width="1.5"/>
    <ellipse cx="25" cy="18" rx="8" ry="5" fill="#312e81" stroke="#ddd6fe" stroke-width="1"/>
    <circle cx="22" cy="17" r="1.2" fill="#ffffff"/>
    <circle cx="27" cy="17" r="1.2" fill="#ffffff"/>
    <path d="M5 25 Q25 34 45 25" fill="none" stroke="#f0abfc" stroke-width="2"/>
    <path class="flame" d="M13 28 C11 34 13 39 17 42 C18 36 19 32 19 29 Z" fill="#22d3ee"/>
    <path class="flame" d="M25 30 C24 37 26 41 29 43 C31 37 30 33 29 29 Z" fill="#c084fc"/>
    <path class="flame" d="M37 28 C39 34 37 39 34 42 C33 36 32 32 32 29 Z" fill="#22d3ee"/>
  </g>`;
}
