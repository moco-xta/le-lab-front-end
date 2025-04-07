import React, { forwardRef } from 'react'
import * as THREE from 'three'
import { type ThreeEvent } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

import type { IGLTFResult } from '@/types/three/types'

import { default as glbConstants } from '@/constants/assets/glbConstants.json'

interface ILogoMoco extends Partial<THREE.Group> {
  material: THREE.Material
  onClick?: (event: ThreeEvent<PointerEvent>) => void
  onPointerMove?: (event: ThreeEvent<PointerEvent>) => void
  onPointerOut?: () => void
}

const LogoMoco = forwardRef<THREE.Group, ILogoMoco>(({ material, ...rest }, ref) => {
  const { nodes } = useGLTF(glbConstants.LOGOS.LOGO_MOCO) as unknown as IGLTFResult

  return (
    <group
      ref={ref}
      {...rest}
      dispose={null}
    >
      <mesh
        geometry={nodes.LogoMoco.geometry}
        material={material}
        onPointerMove={rest.onPointerMove}
        onPointerOut={rest.onPointerOut}
        receiveShadow
        castShadow
      />
    </group>
  )
})

LogoMoco.displayName = 'LogoMoco'

useGLTF.preload(glbConstants.LOGOS.LOGO_MOCO)

export default LogoMoco
