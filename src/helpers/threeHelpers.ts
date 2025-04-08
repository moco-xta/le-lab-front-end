import * as THREE from 'three'
import { ThreeEvent } from '@react-three/fiber'

import type { ICoordinatesData } from '@/types/three/types'

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
