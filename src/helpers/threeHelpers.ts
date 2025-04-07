import { ThreeEvent } from '@react-three/fiber'

export function getUvMousePositionOnMesh(event: ThreeEvent<PointerEvent>) {
  const pointCoordinates = event.point
  return {
    x: 100 * pointCoordinates.x,
    y: 100 * pointCoordinates.y,
  }
}
