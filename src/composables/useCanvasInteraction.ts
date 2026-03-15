import type { Ref } from 'vue'
import { useCanvasStore } from '../store/canvas'
import { useElementStore } from '../store/element'
import { useSelectionStore } from '../store/selection'
import { useToolbarStore } from '../store/toolbar'
import { useElementFactory } from './useElementFactory'
import { screenToWorld, zoomAt } from '../canvas/transform'
import { hitTest, hitTestHandle } from '../canvas/hitTest'
import { computeResize } from '../canvas/resize'
import type { Point, HandlePosition, LabelElement } from '../types'

type InteractionState =
  | 'idle'
  | 'panning'
  | 'selecting'
  | 'moving'
  | 'resizing'
  | 'placing'

export function useCanvasInteraction(
  canvasRef: Ref<HTMLCanvasElement | null>,
  selectionBox: Ref<{ x1: number; y1: number; x2: number; y2: number } | null>,
) {
  const canvasStore = useCanvasStore()
  const elementStore = useElementStore()
  const selectionStore = useSelectionStore()
  const toolbarStore = useToolbarStore()
  const { createElement } = useElementFactory()

  let state: InteractionState = 'idle'
  let lastPointer: Point = { x: 0, y: 0 }
  let dragStartWorld: Point = { x: 0, y: 0 }
  let activeHandle: HandlePosition | null = null
  let movingElementSnapshots: Record<string, { x: number; y: number }> = {}
  let resizingElementSnapshot: LabelElement | null = null

  function getWorldPoint(e: PointerEvent): Point {
    const canvas = canvasRef.value!
    const rect = canvas.getBoundingClientRect()
    const screen = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    return screenToWorld(screen, canvasStore.viewport)
  }

  function onPointerDown(e: PointerEvent) {
    const canvas = canvasRef.value!
    canvas.setPointerCapture(e.pointerId)
    const world = getWorldPoint(e)
    lastPointer = { x: e.clientX, y: e.clientY }
    dragStartWorld = world

    // Middle mouse or space+drag → pan
    if (e.button === 1) {
      state = 'panning'
      return
    }

    const tool = toolbarStore.activeTool

    if (tool !== 'select') {
      // Placing new element
      state = 'placing'
      return
    }

    // Check handle hit on selected elements
    const selectedEls = elementStore.elements.filter(el =>
      selectionStore.selectedIds.includes(el.id),
    )
    for (const el of selectedEls) {
      const handle = hitTestHandle(world, el, canvasStore.viewport.zoom)
      if (handle) {
        activeHandle = handle
        resizingElementSnapshot = JSON.parse(JSON.stringify(el))
        state = 'resizing'
        return
      }
    }

    // Hit test elements
    const hitId = hitTest(world, elementStore.elements)

    if (hitId) {
      if (e.shiftKey) {
        selectionStore.toggleSelect(hitId)
      } else if (!selectionStore.selectedIds.includes(hitId)) {
        selectionStore.select(hitId)
      }
      // Snapshot positions for move
      movingElementSnapshots = {}
      for (const id of selectionStore.selectedIds) {
        const el = elementStore.elements.find(e => e.id === id)
        if (el) movingElementSnapshots[id] = { x: el.x, y: el.y }
      }
      state = 'moving'
    } else {
      // Start selection box
      if (!e.shiftKey) selectionStore.clearSelection()
      selectionBox.value = { x1: world.x, y1: world.y, x2: world.x, y2: world.y }
      state = 'selecting'
    }
  }

  function onPointerMove(e: PointerEvent) {
    const world = getWorldPoint(e)
    const dx = e.clientX - lastPointer.x
    const dy = e.clientY - lastPointer.y
    lastPointer = { x: e.clientX, y: e.clientY }

    if (state === 'panning') {
      canvasStore.setViewport({
        x: canvasStore.viewport.x + dx,
        y: canvasStore.viewport.y + dy,
      })
      return
    }

    if (state === 'selecting' && selectionBox.value) {
      selectionBox.value = { ...selectionBox.value, x2: world.x, y2: world.y }
      return
    }

    if (state === 'moving') {
      const ddx = world.x - dragStartWorld.x
      const ddy = world.y - dragStartWorld.y
      const patches: Record<string, Partial<LabelElement>> = {}
      for (const [id, snap] of Object.entries(movingElementSnapshots)) {
        patches[id] = { x: snap.x + ddx, y: snap.y + ddy }
      }
      // Direct update without snapshot (snapshot on pointerdown)
      for (const [id, patch] of Object.entries(patches)) {
        const idx = elementStore.elements.findIndex(e => e.id === id)
        if (idx !== -1) {
          elementStore.elements[idx] = { ...elementStore.elements[idx], ...patch } as LabelElement
        }
      }
      return
    }

    if (state === 'resizing' && activeHandle && resizingElementSnapshot) {
      const ddx = world.x - dragStartWorld.x
      const ddy = world.y - dragStartWorld.y
      const result = computeResize(resizingElementSnapshot, activeHandle, { dx: ddx, dy: ddy })
      const idx = elementStore.elements.findIndex(e => e.id === resizingElementSnapshot!.id)
      if (idx !== -1) {
        elementStore.elements[idx] = { ...elementStore.elements[idx], ...result } as LabelElement
      }
      return
    }

    if (state === 'idle') {
      // Hover detection
      const hitId = hitTest(world, elementStore.elements)
      selectionStore.setHovered(hitId)
    }
  }

  function onPointerUp(e: PointerEvent) {
    const world = getWorldPoint(e)

    if (state === 'placing') {
      const tool = toolbarStore.activeTool
      if (tool !== 'select') {
        const el = createElement(tool, world.x, world.y)
        elementStore.add(el)
        selectionStore.select(el.id)
      }
      toolbarStore.setTool('select')
      state = 'idle'
      return
    }

    if (state === 'selecting' && selectionBox.value) {
      const { x1, y1, x2, y2 } = selectionBox.value
      const minX = Math.min(x1, x2)
      const maxX = Math.max(x1, x2)
      const minY = Math.min(y1, y2)
      const maxY = Math.max(y1, y2)
      const inBox = elementStore.elements
        .filter(el => el.visible && el.x < maxX && el.x + el.width > minX && el.y < maxY && el.y + el.height > minY)
        .map(el => el.id)
      if (e.shiftKey) {
        selectionStore.selectMany([...new Set([...selectionStore.selectedIds, ...inBox])])
      } else {
        selectionStore.selectMany(inBox)
      }
      selectionBox.value = null
    }

    state = 'idle'
    activeHandle = null
    resizingElementSnapshot = null
  }

  function onWheel(e: WheelEvent) {
    e.preventDefault()
    const canvas = canvasRef.value!
    const rect = canvas.getBoundingClientRect()
    const screen = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    const newViewport = zoomAt(canvasStore.viewport, screen, -e.deltaY)
    canvasStore.setViewport(newViewport)
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.code === 'Space' && state === 'idle') {
      const canvas = canvasRef.value
      if (canvas) canvas.style.cursor = 'grab'
    }
  }

  function mount() {
    const canvas = canvasRef.value
    if (!canvas) return
    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('wheel', onWheel, { passive: false })
  }

  function unmount() {
    const canvas = canvasRef.value
    if (!canvas) return
    canvas.removeEventListener('pointerdown', onPointerDown)
    canvas.removeEventListener('pointermove', onPointerMove)
    canvas.removeEventListener('pointerup', onPointerUp)
    canvas.removeEventListener('wheel', onWheel)
  }

  return { mount, unmount }
}
