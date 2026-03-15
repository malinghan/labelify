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
  // 认证标志新增
  {
    id: 'ukca',
    name: 'UKCA 标志',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="70" font-size="60" font-family="Arial" font-weight="bold" text-anchor="middle" fill="black">UKCA</text></svg>`,
  },
  {
    id: 'fda',
    name: 'FDA 标志',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="8" y="25" width="84" height="50" rx="8" fill="none" stroke="black" stroke-width="4"/><text x="50" y="62" font-size="36" font-family="Arial" font-weight="bold" text-anchor="middle" fill="black">FDA</text></svg>`,
  },
  // 代理人 REP 矩形标识
  {
    id: 'ec-rep-box',
    name: 'EC REP 矩形',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60"><rect x="2" y="2" width="54" height="56" fill="none" stroke="black" stroke-width="3"/><text x="29" y="38" font-size="32" font-family="Arial" font-weight="bold" text-anchor="middle" fill="black">EC</text></svg>`,
  },
  {
    id: 'tur-rep-box',
    name: 'TUR REP 矩形',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60"><rect x="2" y="2" width="54" height="56" fill="none" stroke="black" stroke-width="3"/><text x="29" y="38" font-size="28" font-family="Arial" font-weight="bold" text-anchor="middle" fill="black">TUR</text></svg>`,
  },
  {
    id: 'uk-rep-box',
    name: 'UK REP 矩形',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60"><rect x="2" y="2" width="54" height="56" fill="none" stroke="black" stroke-width="3"/><text x="29" y="38" font-size="32" font-family="Arial" font-weight="bold" text-anchor="middle" fill="black">UK</text></svg>`,
  },
  // GHS 危害象形图
  {
    id: 'ghs02-flame',
    name: 'GHS 火焰 (易燃)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="5" y="5" width="90" height="90" fill="none" stroke="#dd0000" stroke-width="3" rx="8"/><path d="M50 20 L70 50 L50 80 L30 50 Z" fill="#dd0000"/><path d="M50 28 L62 50 L50 72 L38 50 Z" fill="#ffffff"/></svg>`,
  },
  {
    id: 'ghs07-exclamation',
    name: 'GHS 感叹号 (刺激)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="5" y="5" width="90" height="90" fill="none" stroke="#dd0000" stroke-width="3" rx="8"/><rect x="45" y="30" width="10" height="35" rx="3" fill="#dd0000"/><circle cx="50" cy="75" r="6" fill="#dd0000"/></svg>`,
  },
  {
    id: 'ghs01-explosion',
    name: 'GHS 爆炸',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="5" y="5" width="90" height="90" fill="none" stroke="#dd0000" stroke-width="3" rx="8"/><path d="M50 20 L58 45 L80 50 L58 55 L50 80 L42 55 L20 50 L42 45 Z" fill="#dd0000"/></svg>`,
  },
  {
    id: 'ghs05-corrosion',
    name: 'GHS 腐蚀',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="5" y="5" width="90" height="90" fill="none" stroke="#dd0000" stroke-width="3" rx="8"/><path d="M25 30 L65 30 L45 50 L65 70 L25 70" fill="none" stroke="#dd0000" stroke-width="8"/></svg>`,
  },
  {
    id: 'ghs06-skull',
    name: 'GHS 骷髅 (有毒)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="5" y="5" width="90" height="90" fill="none" stroke="#dd0000" stroke-width="3" rx="8"/><ellipse cx="50" cy="45" rx="22" ry="20" fill="#dd0000"/><circle cx="38" cy="38" r="4" fill="white"/><circle cx="62" cy="38" r="4" fill="white"/><path d="M40 58 L60 58" stroke="white" stroke-width="3"/><path d="M35 65 L42 72 L58 72 L65 65" fill="none" stroke="white" stroke-width="3"/></svg>`,
  },
  {
    id: 'ghs08-health',
    name: 'GHS 健康危害',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="5" y="5" width="90" height="90" fill="none" stroke="#dd0000" stroke-width="3" rx="8"/><path d="M30 30 Q50 20 70 30 Q60 50 70 70 Q50 60 30 70 Q40 50 30 30 Z" fill="#dd0000"/><circle cx="50" cy="45" r="8" fill="white"/><circle cx="50" cy="45" r="4" fill="#dd0000"/></svg>`,
  },
  {
    id: 'ghs09-environment',
    name: 'GHS 环境危害',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="5" y="5" width="90" height="90" fill="none" stroke="#dd0000" stroke-width="3" rx="8"/><path d="M20 70 Q35 40 50 70 Q65 40 80 70" fill="none" stroke="#dd0000" stroke-width="6"/><ellipse cx="50" cy="45" rx="15" ry="8" fill="#dd0000"/></svg>`,
  },
  // 包装回收标识
  {
    id: 'french-triman',
    name: '法国 Triman',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="40" r="30" fill="none" stroke="black" stroke-width="6"/><path d="M20 85 L50 35 L80 85" fill="none" stroke="black" stroke-width="8"/></svg>`,
  },
  {
    id: 'spain-recicla',
    name: '西班牙回收',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="45" font-size="18" font-family="Arial" font-weight="bold" text-anchor="middle" fill="black">RECICLA</text><text x="50" y="60" font-size="14" font-family="Arial" text-anchor="middle" fill="black">Al Amarillo</text></svg>`,
  },
]
