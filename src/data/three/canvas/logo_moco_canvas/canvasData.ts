import type { ICanvasData } from '@/types/three/types'

export const canvasDefaultValues: ICanvasData = {
  id: 'logo_moco_canvas',
  style: {
    width: '20vw',
    minWidth: '90px',
    maxWidth: '150px',
    height: '20vw',
    minHeight: '90px',
    maxHeight: '150px',
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
