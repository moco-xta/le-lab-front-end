import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

import { default as videosConstants } from '@/constants/assets/videosConstants.json'

const vertexShader = `
  uniform float uPointSize;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uPointSize;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  void main() {
    gl_FragColor = texture2D(uTexture, vUv);
  }
`

export default function ReelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const svgOverlay = document.getElementById('svg-overlay')
    if (!svgOverlay) return // Ensure SVG overlay exists

    const svgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    svgRect.setAttribute('x', '50')
    svgRect.setAttribute('y', '50')
    svgRect.setAttribute('width', '100')
    svgRect.setAttribute('height', '50')
    svgRect.setAttribute('fill', 'rgba(255, 0, 0, 0.5)')
    svgOverlay.appendChild(svgRect)

    const svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    svgCircle.setAttribute('cx', '200')
    svgCircle.setAttribute('cy', '100')
    svgCircle.setAttribute('r', '30')
    svgCircle.setAttribute('fill', 'blue')
    svgOverlay.appendChild(svgCircle)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    camera.position.z = 8
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas, // Use the ref directly
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    rendererRef.current = renderer

    const video = document.createElement('video')
    video.src = videosConstants.REEL
    video.loop = true
    video.muted = true
    video.play()

    const videoTexture = new THREE.VideoTexture(video)
    videoTexture.needsUpdate = true

    const geometry = new THREE.PlaneGeometry(16, 9)
    const material = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide })
    const videoMesh = new THREE.Mesh(geometry, material)
    scene.add(videoMesh)

    function deformMesh(time: number) {
      const vertices = videoMesh.geometry.attributes.position.array
      for (let i = 0; i < vertices.length; i += 3) {
        vertices[i + 2] = Math.sin(vertices[i] * 2 + time) * 0.5
      }
      videoMesh.geometry.attributes.position.needsUpdate = true
    }

    function updateSVGOverlay() {
      if (!cameraRef.current || !videoMesh) return

      const corners = [
        new THREE.Vector3(-8, 4.5, 0),
        new THREE.Vector3(8, 4.5, 0),
        new THREE.Vector3(8, -4.5, 0),
        new THREE.Vector3(-8, -4.5, 0),
      ]

      const screenCorners = corners.map((corner) => {
        const vector = corner.clone().project(cameraRef.current!)
        vector.x = ((vector.x + 1) / 2) * window.innerWidth
        vector.y = (-(vector.y - 1) / 2) * window.innerHeight
        return vector
      })

      if (svgRect) {
        svgRect.setAttribute('x', screenCorners[0].x.toString())
        svgRect.setAttribute('y', screenCorners[0].y.toString())
      }
    }

    const animate = () => {
      requestAnimationFrame(animate)

      if (video.readyState >= video.HAVE_ENOUGH_DATA) {
        videoTexture.needsUpdate = true
      }
      deformMesh(performance.now() / 1000)

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
      updateSVGOverlay()
    }

    animate()

    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      if (video) {
        video.pause()
      }
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        id='webgl-canvas'
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        }} // Make background transparent to see SVG
      ></canvas>
      <svg
        id='svg-overlay'
        width='100%'
        height='100%'
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} // Ensure it's on top and doesn't block events
      ></svg>
    </>
  )
}
