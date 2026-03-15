import { defineStore } from 'pinia'
import { ref } from 'vue'

export type PaperSize = 'A4' | 'A5' | 'Letter' | 'custom'
export type PrintOrientation = 'portrait' | 'landscape'

export interface PrintSettings {
  paperSize: PaperSize
  orientation: PrintOrientation
  cols: number
  rows: number
  marginTopMm: number
  marginBottomMm: number
  marginLeftMm: number
  marginRightMm: number
  showCutLines: boolean
}

export const usePrintStore = defineStore('print', () => {
  const settings = ref<PrintSettings>({
    paperSize: 'A4',
    orientation: 'portrait',
    cols: 2,
    rows: 4,
    marginTopMm: 10,
    marginBottomMm: 10,
    marginLeftMm: 10,
    marginRightMm: 10,
    showCutLines: true,
  })

  function update(patch: Partial<PrintSettings>) {
    settings.value = { ...settings.value, ...patch }
  }

  return { settings, update }
})
