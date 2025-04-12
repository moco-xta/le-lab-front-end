import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { SVGLoader, SVGResultPaths } from 'three/examples/jsm/Addons.js'

import { default as imgConstants } from '@/constants/assets/imgConstants.json'

// SVG Path to 3D Geometry Converter
export const SvgVideoMesh = ({ svgPath, videoSrc }: { svgPath: string; videoSrc: string }) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [video] = useState(() => {
    const video = document.createElement('video')
    video.src = videoSrc
    video.crossOrigin = 'anonymous'
    video.loop = true
    video.muted = true
    video.play()
    return video
  })

  useEffect(() => {
    const loader = new SVGLoader()
    /* const paths: SVGResultPaths[] = []
    loader.load(imgConstants.SVG.REEL, function (data) {
      paths.push(...data.paths)
    }) */
    const shapes = loader.parse(svgPath).paths.flatMap((path) =>
      path.toShapes(true).map(
        (shape) =>
          new THREE.ExtrudeGeometry(shape, {
            depth: 10,
            bevelEnabled: false,
            steps: 1,
          }),
      ),
    )
    console.log('shapes', shapes)
    /* console.log('paths', paths) */

    if (meshRef.current) {
      console.log('meshRef.current', meshRef.current)
      const material = new THREE.MeshStandardMaterial({
        map: new THREE.VideoTexture(video),
        side: THREE.DoubleSide,
        roughness: 0.3,
        metalness: 0.7,
      })

      // Custom UV mapping
      /* shapes.forEach((geometry) => {
        const uvAttribute = geometry.attributes.uv
        for (let i = 0; i < uvAttribute.count; i++) {
          uvAttribute.setXY(
            i,
            Math.random() * 0.8 + 0.1, // Random UVs (replace with your mapping logic)
            Math.random() * 0.8 + 0.1,
          )
        }
      }) */

      /* meshRef.current.geometry = shapes[0]
      meshRef.current.material = material */
    }
  }, [svgPath, video])

  /* useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  }) */

  return <mesh ref={meshRef} />
}
