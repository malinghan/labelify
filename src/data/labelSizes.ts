import type { LabelSize } from '../types'

export interface LabelSizePreset {
  id: string
  name: string
  size: LabelSize
}

export const LABEL_SIZE_PRESETS: LabelSizePreset[] = [
  { id: 'amazon-fnsku',        name: '亚马逊 FNSKU (57×32mm)',      size: { widthMm: 57,  heightMm: 32  } },
  { id: 'amazon-transparent',  name: '亚马逊透明计划 (25×25mm)',    size: { widthMm: 25,  heightMm: 25  } },
  { id: 'amazon-box',          name: '亚马逊箱标 (105×74mm)',       size: { widthMm: 105, heightMm: 74  } },
  { id: 'ebay-standard',       name: 'eBay 标准 (100×150mm)',       size: { widthMm: 100, heightMm: 150 } },
  { id: 'aliexpress-shopee',   name: '速卖通/Shopee (100×100mm)',   size: { widthMm: 100, heightMm: 100 } },
  { id: 'a4',                  name: 'A4 全页 (210×297mm)',         size: { widthMm: 210, heightMm: 297 } },
  { id: 'custom',              name: '自定义',                      size: { widthMm: 100, heightMm: 150 } },
]
