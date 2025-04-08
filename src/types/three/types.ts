import * as THREE from 'three'
import { FloatProps } from '@react-three/drei'
import { CanvasProps } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'

export interface IGLTFResult extends GLTF {
  nodes: Record<string, THREE.Mesh>
  materials: Record<string, THREE.MeshStandardMaterial>
}

export interface ICanvasData extends Partial<CanvasProps> {}

export interface ICameraDefaultValues {
  rigidBody?: {
    position: THREE.Vector3
  }
  camera: IPerspectiveCameraData
  float?: FloatProps
}

export interface IPerspectiveCameraData {
  makeDefault: boolean
  position?: THREE.Vector3
  rotation?: THREE.Euler
  fov?: number
  near?: number
  far?: number
}

export interface ICoordinatesData {
  x?: number
  y?: number
  z?: number
}
