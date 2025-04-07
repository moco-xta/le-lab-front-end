import * as THREE from 'three'

export const getMatteMaterial = (color: string) => {
  return new THREE.MeshPhysicalMaterial({
    color: color,
    roughness: 0.9,
    metalness: 0,
    sheen: 0.2,
  })
}
