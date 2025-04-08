import * as THREE from 'three'

export type TCameraDefaultValuesSignature = {
  terminalType: 'isDesktop' | 'isMobile'
}

export function cameraDefaultValues({ terminalType }: TCameraDefaultValuesSignature) {
  return {
    camera: {
      makeDefault: true,
      position:
        terminalType === 'isDesktop'
          ? new THREE.Vector3(-0.1, 0, 1.75)
          : new THREE.Vector3(0.075, 0, 2.5),
      fov: 50,
      near: 0.01,
      far: 10,
    },
  }
}
