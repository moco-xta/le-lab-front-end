import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { SVGLoader } from 'three/examples/jsm/Addons.js'

const vertexShader = `
  uniform float uTime;
  uniform float uIntensity;
  
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normal;
    
    // Create wave deformation
    float wave = sin(position.x * 5.0 + uTime * 2.0) * uIntensity;
    
    vec3 newPosition = position;
    newPosition.z += wave;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  
  uniform float uTime;
  uniform vec3 uColor;

  void main() {
    // Add some lighting based on normals
    float lighting = dot(vNormal, vec3(0.0, 0.0, 1.0)) * 0.5 + 0.5;
    
    // Create pulsating effect
    float pulse = sin(uTime) * 0.1 + 0.9;
    
    gl_FragColor = vec4(uColor * lighting * pulse, 1.0);
  }
`

export default function DeformedSVG({ svgUrl }: { svgUrl: string }) {
  const meshRef = useRef<THREE.Group>(null!)
  const uniforms = useRef({
    uTime: { value: 0 },
    uIntensity: { value: 0.3 },
    uColor: { value: new THREE.Color(0.2, 0.5, 0.8) },
  })

  // Load and parse SVG
  useEffect(() => {
    const loader = new SVGLoader()
    loader.load(svgUrl, (data) => {
      const paths = data.paths
      const group = new THREE.Group()

      paths.forEach((path) => {
        const shapes = SVGLoader.createShapes(path)

        shapes.forEach((shape) => {
          // Extrude the SVG shape
          /* const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 1,
            bevelEnabled: false,
            steps: 1
          }) */
          const geometry = new THREE.ShapeGeometry(shape)
          geometry.rotateX(Math.PI)

          // Center the geometry
          geometry.center()

          // Store original positions for animation
          const positionAttribute = geometry.attributes.position
          const originalPositions = positionAttribute.array.slice()
          geometry.setAttribute('originalPosition', new THREE.BufferAttribute(originalPositions, 3))

          const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: uniforms.current,
            side: THREE.DoubleSide,
          })

          const mesh = new THREE.Mesh(geometry, material)
          group.add(mesh)
        })
      })

      // Scale and position the group
      group.scale.set(0.1, 0.1, 0.1)
      group.position.set(0, 0, 0)

      if (meshRef.current) {
        meshRef.current.add(group)
      }
    })
  }, [svgUrl])

  // Animation loop
  useFrame(({ clock }) => {
    uniforms.current.uTime.value = clock.getElapsedTime()
  })

  return <group ref={meshRef} />
}
