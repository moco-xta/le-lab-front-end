import React, { useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js'
import { default as videosConstants } from '@/constants/assets/videosConstants.json'

const PixiVideoWarp = () => {
  const containerRef = useRef<HTMLDivElement>(null!)
  const videoRef = useRef<HTMLVideoElement>(null)
  const appRef = useRef<PIXI.Application | null>(null)
  const meshRef = useRef<PIXI.Mesh | null>(null)
  const animationFrameRef = useRef<number>(0)
  const textureRef = useRef<PIXI.Texture | null>(null)

  const initPixiApp = async () => {
    if (!containerRef.current) return null

    try {
      const app = new PIXI.Application({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
        backgroundColor: 0x000000,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      })

      containerRef.current.appendChild(app.view)
      return app
    } catch (error) {
      console.error('Error initializing PIXI app:', error)
      return null
    }
  }

  const createShader = (texture: PIXI.Texture) => {
    const vertexSrc = `
      precision mediump float;
      attribute vec2 aVertexPosition;
      attribute vec2 aUv;
      uniform mat3 projectionMatrix;
      uniform mat3 textureMatrix;
      varying vec2 vUv;

      void main() {
        vUv = (textureMatrix * vec3(aUv, 1.0)).xy;
        gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
      }
    `

    const fragmentSrc = `
      precision mediump float;
      varying vec2 vUv;
      uniform sampler2D uSampler;

      void main() {
        gl_FragColor = texture2D(uSampler, vUv);
      }
    `

    return PIXI.Shader.from(vertexSrc, fragmentSrc, {
      uSampler: texture,
    })
  }

  const createMesh = (app: PIXI.Application, video: HTMLVideoElement) => {
    const texture = PIXI.Texture.from(video)
    textureRef.current = texture
    const geometry = createGeometry()
    const shader = createShader(texture)

    const mesh = new PIXI.Mesh(geometry, shader)
    mesh.scale.set(app.screen.width / video.videoWidth, app.screen.height / video.videoHeight)

    app.stage.addChild(mesh)
    return mesh
  }

  // ... (keep the existing createGeometry, subdivideGeometry, and setupAnimation functions unchanged) ...

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = async () => {
      try {
        video.muted = true
        await video.play()

        const app = await initPixiApp()
        if (!app) return

        const mesh = createMesh(app, video)
        meshRef.current = mesh
        setupAnimation(mesh)

        window.addEventListener('resize', handleResize)
      } catch (error) {
        console.error('Error initializing video warp:', error)
      }
    }

    video.addEventListener('loadeddata', handleLoadedData)
    video.src = videosConstants.REEL

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      window.removeEventListener('resize', handleResize)

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      if (appRef.current) {
        appRef.current.destroy(true)
        appRef.current = null
      }

      if (textureRef.current) {
        textureRef.current.destroy(true)
        textureRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100vh', overflow: 'hidden' }}
    >
      <video
        ref={videoRef}
        style={{ display: 'none' }}
        loop
        playsInline
      />
    </div>
  )
}

export default PixiVideoWarp
