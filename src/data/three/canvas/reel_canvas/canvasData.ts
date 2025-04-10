import { CanvasProps } from '@react-three/fiber'

export const canvasDefaultValues: Partial<CanvasProps> = {
  id: 'reel_canvas',
  style: {
    zIndex: 2,
    position: 'absolute',
    bottom: '0vh',
    width: '100%',
    height: '165vh',
    // backgroundColor: '#0000FF88',
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
