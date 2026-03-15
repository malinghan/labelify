export interface SymbolItem {
  id: string
  name: string
  svg: string
}

export const SYMBOLS: SymbolItem[] = [
  {
    id: 'ce',
    name: 'CE 标志',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="72" font-size="72" font-family="Arial" font-weight="bold" text-anchor="middle" fill="black">CE</text></svg>`,
  },
  {
    id: 'fcc',
    name: 'FCC 标志',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="68" font-size="52" font-family="Arial" font-weight="bold" text-anchor="middle" fill="black">FCC</text></svg>`,
  },
  {
    id: 'rohs',
    name: 'RoHS 标志',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="5" y="20" width="90" height="60" rx="8" fill="none" stroke="black" stroke-width="4"/><text x="50" y="62" font-size="36" font-family="Arial" font-weight="bold" text-anchor="middle" fill="black">RoHS</text></svg>`,
  },
  {
    id: 'weee',
    name: 'WEEE 标志',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 10 L80 80 H20 Z" fill="none" stroke="black" stroke-width="5"/><line x1="50" y1="30" x2="50" y2="60" stroke="black" stroke-width="5"/><circle cx="50" cy="70" r="4" fill="black"/><line x1="30" y1="88" x2="70" y2="88" stroke="black" stroke-width="4"/></svg>`,
  },
  {
    id: 'eu-rep',
    name: 'EU Rep 标志',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke="#003399" stroke-width="4"/><text x="50" y="46" font-size="22" font-family="Arial" font-weight="bold" text-anchor="middle" fill="#003399">EU</text><text x="50" y="68" font-size="16" font-family="Arial" text-anchor="middle" fill="#003399">REP</text></svg>`,
  },
  {
    id: 'uk-rep',
    name: 'UK Rep 标志',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="6" y="6" width="88" height="88" rx="4" fill="none" stroke="#012169" stroke-width="4"/><text x="50" y="46" font-size="22" font-family="Arial" font-weight="bold" text-anchor="middle" fill="#012169">UK</text><text x="50" y="68" font-size="16" font-family="Arial" text-anchor="middle" fill="#012169">REP</text></svg>`,
  },
  {
    id: 'recycle',
    name: '回收标志',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 8 L62 30 H38 Z" fill="black"/><path d="M50 8 L62 30 H38 Z" fill="black" transform="rotate(120 50 50)"/><path d="M50 8 L62 30 H38 Z" fill="black" transform="rotate(240 50 50)"/><circle cx="50" cy="50" r="14" fill="white"/><circle cx="50" cy="50" r="10" fill="black"/></svg>`,
  },
  {
    id: 'fragile',
    name: '易碎品标志',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" rx="4" fill="none" stroke="black" stroke-width="3"/><path d="M50 20 L60 40 L80 42 L65 57 L68 78 L50 68 L32 78 L35 57 L20 42 L40 40 Z" fill="none" stroke="black" stroke-width="3"/></svg>`,
  },
  {
    id: 'keep-dry',
    name: '防潮标志',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 15 Q65 40 65 55 A15 15 0 0 1 35 55 Q35 40 50 15Z" fill="none" stroke="black" stroke-width="4"/><line x1="20" y1="80" x2="80" y2="80" stroke="black" stroke-width="3"/><line x1="15" y1="88" x2="85" y2="88" stroke="black" stroke-width="3"/></svg>`,
  },
  {
    id: 'this-side-up',
    name: '向上标志',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="8" y="8" width="84" height="84" rx="4" fill="none" stroke="black" stroke-width="3"/><path d="M50 20 L70 50 H55 V80 H45 V50 H30 Z" fill="black"/></svg>`,
  },
  {
    id: 'amazon-prime',
    name: 'Amazon Prime',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40"><text x="50" y="28" font-size="22" font-family="Arial" font-weight="bold" text-anchor="middle" fill="#FF9900">prime</text></svg>`,
  },
]
