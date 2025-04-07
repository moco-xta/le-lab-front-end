import type { ICanvasData } from '@/types/three/types'

export const canvasDefaultValues: ICanvasData = {
  id: 'logo_moco_canvas',
  style: {
    // position: 'absolute',
    width: '150px',
    height: '150px',
  },
  dpr: 2,
  shadows: true,
  legacy: false,
  linear: true,
  flat: true,
  gl: {
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: true,
  },
}
