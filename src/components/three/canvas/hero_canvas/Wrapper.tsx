import React from 'react'
import { Plane } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

import { getDegreeEuler } from '@/helpers/threeHelpers'

import { mocoHeliumData } from '@/data/three/canvas/hero_canvas/mocoHeliumData'

import { wrapperMaterial } from '../../materials'

export type TWrapper = {
  terminalType: 'isDesktop' | 'isMobile'
}

export default function Wrapper({ terminalType }: TWrapper) {
  return (
    <group>
      <RigidBody type='fixed'>
        <Plane
          args={[
            mocoHeliumData.wrapper.args[terminalType].width,
            mocoHeliumData.wrapper.args[terminalType].depth,
          ]}
          position={[0, mocoHeliumData.wrapper.args[terminalType].height / 2, 0]}
          rotation={getDegreeEuler({ x: 90 })}
          material={wrapperMaterial}
          onUpdate={(self) => self.layers.set(1)}
        />
      </RigidBody>
      <RigidBody type='fixed'>
        <Plane
          args={[
            mocoHeliumData.wrapper.args[terminalType].width,
            mocoHeliumData.wrapper.args[terminalType].depth,
          ]}
          position={[0, -mocoHeliumData.wrapper.args[terminalType].height / 2, 0]}
          rotation={getDegreeEuler({ x: 90 })}
          material={wrapperMaterial}
          onUpdate={(self) => self.layers.set(1)}
        />
      </RigidBody>
      <RigidBody type='fixed'>
        <Plane
          args={[
            mocoHeliumData.wrapper.args[terminalType].width,
            mocoHeliumData.wrapper.args[terminalType].height,
          ]}
          position={[0, 0, -mocoHeliumData.wrapper.args[terminalType].depth / 2]}
          material={wrapperMaterial}
          onUpdate={(self) => self.layers.set(1)}
        />
      </RigidBody>
      <RigidBody type='fixed'>
        <Plane
          args={[
            mocoHeliumData.wrapper.args[terminalType].width,
            mocoHeliumData.wrapper.args[terminalType].height,
          ]}
          position={[0, 0, mocoHeliumData.wrapper.args[terminalType].depth / 2]}
          material={wrapperMaterial}
          onUpdate={(self) => self.layers.set(1)}
        />
      </RigidBody>
      <RigidBody type='fixed'>
        <Plane
          args={[
            mocoHeliumData.wrapper.args[terminalType].depth,
            mocoHeliumData.wrapper.args[terminalType].height,
          ]}
          position={[-mocoHeliumData.wrapper.args[terminalType].width / 2, 0, 0]}
          rotation={getDegreeEuler({ y: 90 })}
          material={wrapperMaterial}
          onUpdate={(self) => self.layers.set(1)}
        />
      </RigidBody>
      <RigidBody type='fixed'>
        <Plane
          args={[
            mocoHeliumData.wrapper.args[terminalType].depth,
            mocoHeliumData.wrapper.args[terminalType].height,
          ]}
          position={[mocoHeliumData.wrapper.args[terminalType].width / 2, 0, 0]}
          rotation={getDegreeEuler({ y: -90 })}
          material={wrapperMaterial}
          onUpdate={(self) => self.layers.set(1)}
        />
      </RigidBody>
    </group>
  )
}
