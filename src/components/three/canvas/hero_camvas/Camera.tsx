import React, { useRef } from 'react'
import * as THREE from 'three'
import { PerspectiveCamera } from '@react-three/drei'

import { cameraDefaultValues } from '@/data/three/canvas/hero_canvas/cameraData'

export function Camera({ terminalType }: { terminalType: 'isDesktop' | 'isMobile' }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!)

  return (
    <PerspectiveCamera
      ref={cameraRef}
      {...cameraDefaultValues({ terminalType }).camera}
    />
  )
}
