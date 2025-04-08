import React from 'react'
import {
  EffectComposer,
  Bloom,
  ToneMapping,
  DepthOfField,
  Vignette,
} from '@react-three/postprocessing'
import { BlendFunction, KernelSize, Resolution } from 'postprocessing'

import { postProcessingData } from '@/data/three/canvas/hero_canvas/postProcessingData'

export type TPostProcessing = {
  terminalType: 'isDesktop' | 'isMobile'
}

export default function PostProcessing({ terminalType }: TPostProcessing) {
  return (
    <EffectComposer>
      <DepthOfField {...postProcessingData.depthOfField[terminalType]} />
      <Bloom
        {...postProcessingData.bloom}
        kernelSize={KernelSize.LARGE}
        resolutionX={Resolution.AUTO_SIZE}
        resolutionY={Resolution.AUTO_SIZE}
      />
      <ToneMapping
        {...postProcessingData.toneMapping}
        blendFunction={BlendFunction.NORMAL}
      />
      <Vignette
        {...postProcessingData.vignette}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  )
}
