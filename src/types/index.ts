export interface Point {
  x: number
  y: number
}

export interface Viewport {
  x: number
  y: number
  zoom: number
}

export interface LabelSize {
  widthMm: number
  heightMm: number
}

export type ToolType = 'select' | 'text' | 'barcode' | 'image' | 'rect' | 'line'

export type HandlePosition = 'nw' | 'n' | 'ne' | 'w' | 'e' | 'sw' | 's' | 'se'

export type DataBinding = Record<string, string>

export interface BaseElement {
  id: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
  locked: boolean
  visible: boolean
  zIndex: number
}

export interface TextElement extends BaseElement {
  type: 'text'
  content: string
  fontFamily: string
  fontSize: number
  fontWeight: 'normal' | 'bold'
  fontStyle: 'normal' | 'italic'
  color: string
  align: 'left' | 'center' | 'right'
}

export type BarcodeType = 'code128' | 'code39' | 'ean13' | 'ean8' | 'upca' | 'qrcode'

export type BarcodePlatform = 'custom' | 'amazon-fnsku' | 'amazon-transparent' | 'ebay' | 'aliexpress'

export interface BarcodeElement extends BaseElement {
  type: 'barcode'
  barcodeType: BarcodeType
  data: string
  showText: boolean
  platform: BarcodePlatform
}

export interface ImageElement extends BaseElement {
  type: 'image'
  src: string
  objectFit: 'fill' | 'contain' | 'cover'
}

export interface RectElement extends BaseElement {
  type: 'rect'
  fillColor: string
  strokeColor: string
  strokeWidth: number
}

export interface LineElement extends BaseElement {
  type: 'line'
  strokeColor: string
  strokeWidth: number
}

export type LabelElement = TextElement | BarcodeElement | ImageElement | RectElement | LineElement

export interface SelectionState {
  selectedIds: string[]
  hoveredId: string | null
  isDragging: boolean
  dragStart: Point | null
  resizingHandle: HandlePosition | null
  clipboard: LabelElement[]
}

export interface HistoryEntry {
  elements: LabelElement[]
}
