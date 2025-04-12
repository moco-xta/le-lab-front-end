import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Box } from '@react-three/drei'

import DeformedSVG from './DeformedSVG'

import { canvasDefaultValues } from '@/data/three/canvas/reel_canvas/canvasData'

import { default as imgConstants } from '@/constants/assets/imgConstants.json'
import { default as videosConstants } from '@/constants/assets/videosConstants.json'

export default function ReelCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }} {...canvasDefaultValues}>
      <ambientLight intensity={0.5} />
      {/* <pointLight position={[10, 10, 10]} intensity={1} /> */}
      {/* <Box /> */}
      <DeformedSVG svgUrl={imgConstants.SVG.REEL_DEFORM} /* videoUrl={videosConstants.REEL} */ />
    </Canvas>
  )
}
