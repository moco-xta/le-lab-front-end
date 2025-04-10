import { forwardRef, JSX } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import type { IGLTFResult } from '@/types/three/types'

import { default as glbConstants } from '@/constants/assets/glbConstants.json'

import { heliumBalloonMaterial } from '../../materials'

const MHeliumBalloon = forwardRef<THREE.Mesh, JSX.IntrinsicElements['mesh']>((props, ref) => {
  const { nodes } = useGLTF(glbConstants.HOME.HERO.M_HELIUM_BALLOON) as unknown as IGLTFResult

  return (
    <mesh
      ref={ref}
      geometry={nodes.MHeliumBalloon.geometry}
      material={heliumBalloonMaterial}
      {...props}
    />
  )
})

MHeliumBalloon.displayName = 'MHeliumBalloon'

useGLTF.preload(glbConstants.HOME.HERO.M_HELIUM_BALLOON)

export default MHeliumBalloon
