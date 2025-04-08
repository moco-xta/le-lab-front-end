import * as THREE from 'three'

export const getMatteMaterial = (color: string) => {
  return new THREE.MeshPhysicalMaterial({
    color: color,
    roughness: 0.9,
    metalness: 0,
    sheen: 0.2,
  })
}

export const heliumBalloonMaterial = new THREE.MeshPhysicalMaterial({
  color: '#888888',
  metalness: 1,
  roughness: 0.075,
  reflectivity: 10,
})

export const wrapperMaterial = new THREE.MeshStandardMaterial({
  transparent: true,
  opacity: 0,
})
