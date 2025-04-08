import type { ICanvasData } from '@/types/three/types'

export const canvasDefaultValues: ICanvasData = {
  id: 'hero_canvas',
  dpr: 1.5,
  legacy: false,
  linear: true,
  flat: true,
  shadows: true,
  gl: {
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: true,
  },
}
