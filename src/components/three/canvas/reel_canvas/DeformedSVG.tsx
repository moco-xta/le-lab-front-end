import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
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

// Fragment Shader - Handles coloring
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
    uColor: { value: new THREE.Color(0.2, 0.5, 0.8) }
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
          const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 0.1,
            bevelEnabled: false,
            steps: 1
          })
          
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
            side: THREE.DoubleSide
          })
          
          const mesh = new THREE.Mesh(geometry, material)
          group.add(mesh)
        })
      })
      
      // Scale and position the group
      group.scale.set(0.01, 0.01, 0.01)
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

/* const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
varying vec2 vUv;
uniform vec3 uColor;
uniform float uTime;

void main() {
  // Animate color for visibility (remove this in production)
  vec3 animatedColor = uColor * (0.8 + 0.2 * sin(uTime));
  gl_FragColor = vec4(animatedColor, 1.0);
}
` */

/* export default function FilledSVG({ svgUrl }: { svgUrl: string }) {
  const groupRef = useRef<THREE.Group>(null!)
  const { camera } = useThree()
  const uniforms = useRef({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(0.2, 0.5, 0.8) }
  })

  useEffect(() => {
    const loader = new SVGLoader()
    loader.load(svgUrl, (data) => {
      const group = new THREE.Group()
      const shapes: THREE.Shape[] = []

      // First pass: Collect all shapes and their fill colors
      data.paths.forEach((path) => {
        const pathShapes = SVGLoader.createShapes(path)
        pathShapes.forEach((shape) => {
          shapes.push(shape)
        })
      })

      // Create a single geometry from all shapes
      const mergedGeometry = new THREE.BufferGeometry()
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: uniforms.current,
        side: THREE.DoubleSide
      })

      // Create a shape geometry for each path with proper fill
      shapes.forEach((shape) => {
        const geometry = new THREE.ShapeGeometry(shape)
        const mesh = new THREE.Mesh(geometry, material)
        group.add(mesh)
      })

      // Center and scale the group
      const box = new THREE.Box3().setFromObject(group)
      const center = new THREE.Vector3()
      box.getCenter(center)
      group.position.sub(center)
      
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y)
      const scale = 5 / maxDim
      group.scale.set(scale, scale, scale)

      if (groupRef.current) {
        // Clear previous children
        while (groupRef.current.children.length) {
          groupRef.current.remove(groupRef.current.children[0])
        }
        groupRef.current.add(group)
      }

      // Position camera
      camera.position.z = 10
      camera.lookAt(0, 0, 0)
    }, undefined, (error) => {
      console.error('Error loading SVG:', error)
    })
  }, [svgUrl, camera])

  useFrame(({ clock }) => {
    uniforms.current.uTime.value = clock.getElapsedTime()
  })

  return <group ref={groupRef} />
} */