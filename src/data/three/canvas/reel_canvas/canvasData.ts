import type { ICanvasData } from '@/types/three/types'

export const canvasDefaultValues: ICanvasData = {
  id: 'reel-canvas',
  style: {
    position: 'absolute',
    opacity: 1,
    width: '100%',
    height: '100%',
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
