import React, { Suspense, useRef } from 'react'
import { useRouter } from 'next/navigation'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'

import useHoverModelAnimation from '@/hooks/three/useHoverModelAnimation'

import Lights from './Lights'
import LogoMoco from '../../models/logos/LogoMoco'

import { canvasDefaultValues } from '@/data/logo_moco/three/canvasData'
import { cameraDefaultValues } from '@/data/logo_moco/three/cameraData'
import { logoMocoData } from '@/data/logo_moco/three/logoMocoData'

export default function LogoMocoCanvas({ logoMocoMaterial }: { logoMocoMaterial: THREE.Material }) {
  const router = useRouter()

  const logoMocoRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null!) // TODO: MouseEvent.mozPressure is deprecated. Use PointerEvent.pressure instead.

  const handleOnClick = () => {
    router.push('/')
  }

  const { handleOnPointerMove, handleOnPointerLeave } = useHoverModelAnimation({
    ref: logoMocoRef,
    animationData: logoMocoData.hoverModelAnimationData,
  })

  return (
    <Canvas {...canvasDefaultValues}>
      <PerspectiveCamera {...cameraDefaultValues.camera} />
      <Lights />
      <Suspense fallback={null}>
        <LogoMoco
          ref={logoMocoRef}
          position={new THREE.Vector3(0, 0.7, 0)}
          material={logoMocoMaterial}
          onPointerMove={handleOnPointerMove}
          onPointerOut={handleOnPointerLeave}
          onClick={handleOnClick}
        />
      </Suspense>
    </Canvas>
  )
}
