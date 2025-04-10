import * as THREE from 'three'
import { ThreeEvent } from '@react-three/fiber'

import type { ICoordinatesData } from '@/types/three/types'

export function setCameraZPosition(
  meshWidth: number,
  windowWidth: number,
  windowHeight: number,
  fov: number, // Vertical FOV in degrees
): number {
  const fovRadians = (fov * Math.PI) / 180
  const aspectRatio = windowWidth / windowHeight

  return meshWidth / (2 * Math.tan(fovRadians / 2) * aspectRatio)
}

export function getUvMousePositionOnMesh(event: ThreeEvent<PointerEvent>) {
  const pointCoordinates = event.point
  return {
    x: 100 * pointCoordinates.x,
    y: 100 * pointCoordinates.y,
  }
}

export function getDegreeEuler(rotationData: ICoordinatesData) {
  return new THREE.Euler(
    rotationData.x ? THREE.MathUtils.degToRad(rotationData.x) : 0,
    rotationData.y ? THREE.MathUtils.degToRad(rotationData.y) : 0,
    rotationData.z ? THREE.MathUtils.degToRad(rotationData.z) : 0,
    'XYZ',
  )
}
