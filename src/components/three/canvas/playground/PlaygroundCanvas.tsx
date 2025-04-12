import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

import PlaygroundScene from './PlaygroundScene'

import { canvasDefaultValues } from '@/data/playground/three/canvasData'
import { cameraDefaultValues } from '@/data/playground/three/cameraData'

export default function PlaygroundCanvas() {
  return (
    <Canvas {...canvasDefaultValues}>
      <PerspectiveCamera {...cameraDefaultValues.camera} />
      <OrbitControls />
      <Suspense fallback={null}>
        <PlaygroundScene />
      </Suspense>
    </Canvas>
  )
}
