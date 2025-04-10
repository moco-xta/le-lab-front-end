import React, { useState, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'

import { useWindowSize } from '@/hooks/useWindowSize'

import ReelScene from './ReelScene'

import { setCameraZPosition } from '@/helpers/threeHelpers'

import { canvasDefaultValues } from '@/data/three/canvas/reel_canvas/canvasData'

export default function ReelCanvas() {
  const { windowSize } = useWindowSize()
  const [cameraZ, setCameraZ] = useState(
    setCameraZPosition(3.2, windowSize.width, windowSize.height, 45) * 2,
  )

  useEffect(() => {
    setCameraZ(setCameraZPosition(3.2, windowSize.width, windowSize.height, 45) * 2)
  }, [windowSize.width, windowSize.height])

  return (
    <Canvas {...canvasDefaultValues}>
      <PerspectiveCamera
        makeDefault
        position={new THREE.Vector3(0, 0, cameraZ)}
        fov={45}
        near={0.1}
        far={10}
      />
      <ambientLight intensity={5} />
      <ReelScene />
    </Canvas>
  )
}
