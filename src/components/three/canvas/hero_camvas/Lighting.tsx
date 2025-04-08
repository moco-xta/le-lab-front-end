import React from 'react'
import { Environment } from '@react-three/drei'

import { default as imgConstants } from '@/constants/assets/imgConstants.json'

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={3.5} />
      <Environment
        files={imgConstants.ENVIRONMENTS.HDR.PEPPERMINT_POWERPLANT_2_1K}
        environmentIntensity={2}
      />
    </>
  )
}
