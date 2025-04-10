import { forwardRef, JSX } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import type { IGLTFResult } from '@/types/three/types'

import { default as glbConstants } from '@/constants/assets/glbConstants.json'

const Smiley = forwardRef<THREE.Mesh, JSX.IntrinsicElements['mesh']>((props, ref) => {
  const { nodes, materials } = useGLTF(glbConstants.HOME.HERO.SMILEY) as unknown as IGLTFResult

  return (
    <mesh
      ref={ref}
      geometry={nodes.Smiley.geometry}
      material={materials['smiley']}
      {...props}
    />
  )
})

Smiley.displayName = 'Smiley'

useGLTF.preload(glbConstants.HOME.HERO.SMILEY)

export default Smiley
