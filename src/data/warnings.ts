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
    id: 'plastic-bag-cn',
    category: '包装警示',
    title: '塑料袋窒息警告（中文）',
    content: '警告：为避免窒息危险，请将此塑料袋远离婴儿和儿童。不要在婴儿床、床、推车或游戏围栏中使用此袋。此袋不是玩具。',
  },
  {
    id: 'plastic-bag-en',
    category: '包装警示',
    title: '塑料袋窒息警告（英文）',
    content: 'WARNING: TO AVOID DANGER OF SUFFOCATION, KEEP THIS PLASTIC BAG AWAY FROM BABIES AND CHILDREN. DO NOT USE THIS BAG IN CRIBS, BEDS, CARRIAGES, OR PLAY PENS. THIS BAG IS NOT A TOY.',
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
    id: 'ukca-declaration',
    category: '合规声明',
    title: 'UKCA 合规声明',
    content: '本产品符合英国相关法规要求。\nThis product complies with applicable UK regulations.',
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
    id: 'flammable-liquid-cn',
    category: 'GHS危害',
    title: '易燃液体（中文）',
    content: '易燃液体\n高度易燃',
  },
  {
    id: 'flammable-liquid-en',
    category: 'GHS危害',
    title: 'Flammable Liquid',
    content: 'Flammable liquid\nHighly flammable',
  },
  {
    id: 'corrosive-cn',
    category: 'GHS危害',
    title: '腐蚀性（中文）',
    content: '腐蚀性\n可能腐蚀金属，造成严重皮肤灼伤和眼损伤',
  },
  {
    id: 'corrosive-en',
    category: 'GHS危害',
    title: 'Corrosive',
    content: 'Corrosive\nMay be corrosive to metals. Causes severe skin burns and eye damage.',
  },
  {
    id: 'ghs-hazard-statement',
    category: 'GHS危害',
    title: '危害说明模板',
    content: 'Hazard Statement/危害说明\n[具体危害内容]\n\nPreventive measure/预防措施\n[预防措施内容]',
  },
  {
    id: 'french-triple-rep',
    category: '代理人信息',
    title: '欧英土三代理人模板',
    content: '欧代名称\n欧代地址\n欧代邮箱\n\n土代名称\t\t英代名称\n土代地址\t\t英代地址\n土代邮箱\t\t英代邮箱',
  },
  {
    id: 'tur-rep',
    category: '代理人信息',
    title: '土耳其代理人信息',
    content: 'Turkiye Responsible Person / 土耳其代理人:\n[Company Name]\n[Address], [City], Turkiye\n[Email]',
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
  {
    id: 'net-content-g',
    category: '规格容量',
    title: '净含量 (g)',
    content: '{{netWeight}}g',
  },
  {
    id: 'net-content-ml-g',
    category: '规格容量',
    title: '容量/净含量',
    content: '{{volume}}ml/{{weight}}g',
  },
  {
    id: 'packaging-recycling-fr',
    category: '环保说明',
    title: '法国包装回收说明',
    content: 'ÉLÉMENTS D\'EMBALLAGE À SÉPARER ET À DÉPOSER DANS LE BAC DE TRI\nTri selectif des dechets',
  },
  {
    id: 'ingredients-template',
    category: '成分说明',
    title: '成分表模板',
    content: 'Ingredients / 成分:\n[成分1]\n[成分2]\n[成分3]',
  },
  {
    id: 'usage-instructions',
    category: '使用说明',
    title: '使用说明模板',
    content: 'Instructions for use / 使用说明:\n1. \n2. \n3. ',
  },
  {
    id: 'manufacturer-info',
    category: '厂商信息',
    title: '制造商信息模板',
    content: 'Manufacturer/Üretici: 制造商名称\nAddress/Adres: 制造商地址\nManufacturer E-mail: 制造商邮箱\n\nProduct name: 产品名称\nDate of production: 生产日期\nBatch Number/Parti Numarası: 生产批号',
  },
]

export const WARNING_CATEGORIES = [...new Set(WARNINGS.map(w => w.category))]
