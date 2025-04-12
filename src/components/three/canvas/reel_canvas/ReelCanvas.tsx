import React, { forwardRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Box, OrbitControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei'

import DeformedSVG from './DeformedSVG'
import { SvgVideoMesh } from './SvgVideoMesh'

import { canvasDefaultValues } from '@/data/three/canvas/reel_canvas/canvasData'

import { default as imgConstants } from '@/constants/assets/imgConstants.json'
import { default as videosConstants } from '@/constants/assets/videosConstants.json'
import ReelScene from './ReelScene'



interface ReelCanvasProps {
  // Add any props your component needs here
}

const ReelCanvas = forwardRef<HTMLCanvasElement, ReelCanvasProps>((props, ref) => {

  return <canvas ref={ref} id='reel-canvas' style={{ backgroundColor: 'red' }} />
  
  /* return (
    <Canvas ref={ref} {...canvasDefaultValues}>
      <OrthographicCamera makeDefault position={[0, 0, 1]} zoom={74} />
      <ambientLight intensity={0.5} />
      <ReelScene />
      <Box /> 
    </Canvas>
  ); */
});

ReelCanvas.displayName = 'ReelCanvas';

export default ReelCanvas;
