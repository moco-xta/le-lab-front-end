import React from 'react'
import { RapierRigidBody, RigidBody, RigidBodyProps } from '@react-three/rapier'

export const RigidBodyWrapper = ({
  name,
  registerRigidBody,
  children,
  ...rest
}: RigidBodyProps & {
  registerRigidBody: (name: string, rigidBody: RapierRigidBody) => void
}) => {
  return (
    <RigidBody
      name={name}
      ref={(rb: RapierRigidBody | null) => registerRigidBody(name!, rb!)}
      colliders='hull'
      restitution={0.2}
      {...rest}
    >
      {children}
    </RigidBody>
  )
}
