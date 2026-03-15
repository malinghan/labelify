export interface WarningItem {
  id: string
  category: string
  title: string
  content: string
}

export const WARNINGS: WarningItem[] = [
  {
    id: 'toy-warning-cn',
    category: '玩具警示',
    title: '玩具警示语（中文）',
    content: '警告：内含小零件，不适合3岁以下儿童，有窒息危险。请在成人监督下使用。',
  },
  {
    id: 'toy-warning-en',
    category: '玩具警示',
    title: '玩具警示语（英文）',
    content: 'WARNING: Contains small parts. Not suitable for children under 3 years. Choking hazard. Adult supervision required.',
  },
  {
    id: 'latex-warning-cn',
    category: '气球警示',
    title: '乳胶气球警示（中文）',
    content: '警告：充气前请成人监督。破损气球请立即丢弃，远离儿童。乳胶气球有窒息危险。',
  },
  {
    id: 'latex-warning-en',
    category: '气球警示',
    title: '乳胶气球警示（英文）',
    content: 'WARNING: Adult supervision required during inflation. Discard broken balloons immediately. Keep away from children. Latex balloons are a choking hazard.',
  },
  {
    id: 'amazon-transparent',
    category: '亚马逊',
    title: '亚马逊透明计划说明',
    content: 'This product is enrolled in Amazon Transparency. Scan the code to verify authenticity.',
  },
  {
    id: 'ce-declaration',
    category: '合规声明',
    title: 'CE 合规声明',
    content: '本产品符合欧盟相关指令要求。\nThis product complies with applicable EU directives.',
  },
  {
    id: 'prop65',
    category: '合规声明',
    title: '加州65号提案警告',
    content: 'WARNING: This product can expose you to chemicals which are known to the State of California to cause cancer and birth defects. For more information go to www.P65Warnings.ca.gov.',
  },
  {
    id: 'battery-non-rechargeable',
    category: '电池警告',
    title: '不可充电电池警告',
    content: '警告：请勿充电、拆解或投入火中。请按当地法规处理废旧电池。\nWARNING: Do not recharge, disassemble, or incinerate. Dispose of used batteries according to local regulations.',
  },
  {
    id: 'battery-rechargeable',
    category: '电池警告',
    title: '可充电电池警告',
    content: '警告：仅使用指定充电器充电。请勿过度充电或短路。\nWARNING: Charge only with specified charger. Do not overcharge or short circuit.',
  },
  {
    id: 'made-in-china',
    category: '原产地',
    title: '原产地声明',
    content: 'Made in China / 中国制造',
  },
  {
    id: 'eu-rep',
    category: '欧盟代理',
    title: '欧盟代理人信息',
    content: 'EU Representative / 欧盟代理人:\n[Company Name]\n[Address], [City], [Country]\n[Email]',
  },
  {
    id: 'uk-rep',
    category: '英国代理',
    title: '英国代理人信息',
    content: 'UK Responsible Person:\n[Company Name]\n[Address], [City], UK\n[Email]',
  },
]

export const WARNING_CATEGORIES = [...new Set(WARNINGS.map(w => w.category))]
