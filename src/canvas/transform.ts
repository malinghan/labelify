import type { Point, Viewport } from '../types'

/** 世界坐标 → 屏幕坐标 */
export function worldToScreen(point: Point, viewport: Viewport): Point {
  return {
    x: point.x * viewport.zoom + viewport.x,
    y: point.y * viewport.zoom + viewport.y,
  }
}

/** 屏幕坐标 → 世界坐标 */
export function screenToWorld(point: Point, viewport: Viewport): Point {
  return {
    x: (point.x - viewport.x) / viewport.zoom,
    y: (point.y - viewport.y) / viewport.zoom,
  }
}

/** 以指定屏幕点为中心缩放 viewport */
export function zoomAt(viewport: Viewport, screenPoint: Point, delta: number): Viewport {
  const MIN_ZOOM = 0.1
  const MAX_ZOOM = 4.0
  const factor = delta > 0 ? 1.1 : 0.9
  const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, viewport.zoom * factor))
  const ratio = newZoom / viewport.zoom
  return {
    zoom: newZoom,
    x: screenPoint.x - (screenPoint.x - viewport.x) * ratio,
    y: screenPoint.y - (screenPoint.y - viewport.y) * ratio,
  }
}
