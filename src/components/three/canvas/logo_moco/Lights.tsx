import React from 'react'
import { Environment } from '@react-three/drei'

import { default as imgConstants } from '@/constants/assets/imgConstants.json'

export default function Lights() {
  return (
    <>
      <ambientLight intensity={3} />
      <Environment
        files={imgConstants.ENVIRONMENTS.EXR.STUDIO_09_1K}
        environmentIntensity={3.5}
      />
    </>
  )
}
