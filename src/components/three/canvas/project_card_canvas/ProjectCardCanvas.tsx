import React from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'

import ProjectCardScene from './ProjectCardScene'

import { canvasDefaultValues } from '@/data/three/canvas/project_card_canvas/canvasData'
import { cameraDefaultValues } from '@/data/three/canvas/project_card_canvas/cameraData'

export default function ProjectCardCanvas({ index, textureUrl }: { index: number, textureUrl: string }) {
  return (
    <Canvas
      id={`last-project-canvas-${index}`}
      {...canvasDefaultValues}
    >
      <PerspectiveCamera
        {...cameraDefaultValues.camera}
        onUpdate={(camera) => {
          camera.updateProjectionMatrix()
          camera.updateMatrixWorld()
        }}
      />
      <ProjectCardScene index={index} textureUrl={textureUrl} />
    </Canvas>
  )
}
