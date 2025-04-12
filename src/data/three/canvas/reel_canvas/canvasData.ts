import type { ICanvasData } from '@/types/three/types'

export const canvasDefaultValues: ICanvasData = {
  id: 'reel-canvas',
  style: {
    gridRow: '4 / -1',
    gridColumn: '1 / -1',
    width: '100%',
    aspectRatio: '16 / 9',
  },
  dpr: 2,
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
