export const postProcessingData = {
  depthOfField: {
    isDesktop: {
      focusDistance: 0.025,
      focalLength: 0.45,
      bokehScale: 1.5,
    },
    isMobile: {
      focusDistance: 0.15,
      focalLength: 0.3,
      bokehScale: 2.5,
    },
  },
  bloom: {
    intensity: 1.5,
    luminanceThreshold: 0.9,
    luminanceSmoothing: 0.0125,
    mipmapBlur: true,
  },
  toneMapping: {
    adaptive: true,
    resolution: 2048,
    middleGrey: 0.5,
    maxLuminance: 40.0,
    averageLuminance: 2.0,
    adaptationRate: 1.0,
  },
  vignette: {
    offset: 0.5,
    darkness: 0.5,
    eskil: false,
  },
}
