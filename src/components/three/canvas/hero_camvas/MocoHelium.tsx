import React, { MutableRefObject, /* useLayoutEffect, */ useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import type { RapierRigidBody } from '@react-three/rapier'

import CHeliumBalloon from '@/components/three/models/hero/CHeliumBalloon'
import MHeliumBalloon from '@/components/three/models/hero/MHeliumBalloon'
import OHeliumBalloon from '@/components/three/models/hero/OHeliumBalloon'
import Smiley from '@/components/three/models/hero/Smiley'
import { RigidBodyWrapper } from './RigidBodyWrapper'

import { getDegreeEuler } from '@/helpers/threeHelpers'

import { mocoHeliumData } from '@/data/three/canvas/hero_canvas/mocoHeliumData'

function MouseImpulseHandler({
  rigidBodies,
}: {
  rigidBodies: MutableRefObject<Map<string, RapierRigidBody>>
}) {
  const { camera, pointer, scene } = useThree()
  const [impulseApplied, setImpulseApplied] = useState(false)

  const windStrength = 0.0005

  useFrame(() => {
    const raycaster = new THREE.Raycaster()
    raycaster.layers.set(0)
    raycaster.setFromCamera(pointer, camera)

    // Find intersecting objects
    const intersects = raycaster.intersectObjects(scene.children, true)

    if (intersects.length > 0) {
      const object = intersects[0].object.parent!

      // Check if the object has a name corresponding to a RigidBody
      if (object.name && rigidBodies.current.has(object.name)) {
        const rigidBody = rigidBodies.current.get(object.name)
        // console.log('rigidBody', rigidBody)

        // Apply impulse when the mouse moves
        if (rigidBody && !impulseApplied) {
          const impulseStrength = 0.5 // Adjust the strength of the impulse
          const impulseDirection = {
            x: pointer.x * impulseStrength,
            y: -pointer.y * impulseStrength,
            z: 0,
          }
          rigidBody.applyImpulse(impulseDirection, true)
          setImpulseApplied(true)
        }
      }
    } else {
      setImpulseApplied(false)
    }

    const randomWindDirection = [
      Math.sin(performance.now() * 0.001),
      Math.cos(performance.now() * 0.0005),
      Math.cos(performance.now() * 0.0015),
    ]
    const force = {
      x: randomWindDirection[0] * windStrength,
      y: randomWindDirection[1] * windStrength,
      z: randomWindDirection[2] * windStrength,
    }

    rigidBodies.current.forEach((rigidBody /* , name */) => {
      rigidBody.applyImpulse(force, true)
    })
  })

  return null
}

export default function MocoHelium({ terminalType }: { terminalType: 'isDesktop' | 'isMobile' }) {
  const rigidBodies = useRef(new Map<string, RapierRigidBody>())

  const registerRigidBody = (name: string, rigidBody: RapierRigidBody) => {
    rigidBodies.current.set(name, rigidBody)
  }

  return (
    <>
      <group>
        <RigidBodyWrapper
          name={'m_helium_balloons'}
          position={
            new THREE.Vector3(
              mocoHeliumData.balloons.position.m[terminalType].x,
              mocoHeliumData.balloons.position.m[terminalType].y,
              mocoHeliumData.balloons.position.m[terminalType].z,
            )
          }
          registerRigidBody={registerRigidBody}
        >
          <MHeliumBalloon rotation={getDegreeEuler({ y: mocoHeliumData.balloons.rotation.y })} />
        </RigidBodyWrapper>
        <RigidBodyWrapper
          name={'o1_helium_balloons'}
          position={
            new THREE.Vector3(
              mocoHeliumData.balloons.position.o1[terminalType].x,
              mocoHeliumData.balloons.position.o1[terminalType].y,
              mocoHeliumData.balloons.position.o1[terminalType].z,
            )
          }
          registerRigidBody={registerRigidBody}
        >
          <OHeliumBalloon rotation={getDegreeEuler({ y: mocoHeliumData.balloons.rotation.y })} />
        </RigidBodyWrapper>
        <RigidBodyWrapper
          name={'c_helium_balloons'}
          position={
            new THREE.Vector3(
              mocoHeliumData.balloons.position.c[terminalType].x,
              mocoHeliumData.balloons.position.c[terminalType].y,
              mocoHeliumData.balloons.position.c[terminalType].z,
            )
          }
          registerRigidBody={registerRigidBody}
        >
          <CHeliumBalloon rotation={getDegreeEuler({ y: mocoHeliumData.balloons.rotation.y })} />
        </RigidBodyWrapper>
        <RigidBodyWrapper
          name={'o2_helium_balloons'}
          position={
            new THREE.Vector3(
              mocoHeliumData.balloons.position.o2[terminalType].x,
              mocoHeliumData.balloons.position.o2[terminalType].y,
              mocoHeliumData.balloons.position.o2[terminalType].z,
            )
          }
          registerRigidBody={registerRigidBody}
        >
          <OHeliumBalloon />
          <Smiley />
        </RigidBodyWrapper>
      </group>
      <MouseImpulseHandler rigidBodies={rigidBodies} />
    </>
  )
}
