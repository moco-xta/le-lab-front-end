import * as THREE from 'three'

import type { ICameraDefaultValues } from '@/types/three/types'

export const cameraDefaultValues: ICameraDefaultValues = {
  camera: {
    makeDefault: true,
    position: new THREE.Vector3(0, 0, 22),
    fov: 11,
    near: 0.1,
    far: 33,
  },
}
