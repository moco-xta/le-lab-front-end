import { MutableRefObject, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import { default as glbConstants } from '@/constants/assets/glbConstants.json'

const vertexShader = `
  uniform float uPointSize;

  varying vec2 vUv;

  float PI = 3.1415926538;

  void main() {
    vUv = uv;

    // gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    // gl_PointSize = uPointSize * (1.0 / -mvPosition.z);
    gl_PointSize = uPointSize;
    gl_Position = projectionMatrix * mvPosition;
  }
`
const fragmentShader = `
  uniform float time;
  uniform sampler2D uTexture;

  varying vec2 vUv;

  float PI = 3.1415926538;

  void main() {
    gl_FragColor = vec4(vUv, 1.0, 1.0);

    // vec4 color = texture2D(uTexture, vUv);
    // gl_FragColor = color;
  }
`

function addObjects(
  scene: THREE.Scene,
  meshRef: MutableRefObject<THREE.Mesh>,
  materialRef: MutableRefObject<THREE.ShaderMaterial>,
) {
  // const geometry = new THREE.PlaneGeometry(1, 1, 10, 10)

  /* const plane = new THREE.Mesh(geometry, materialRef.current)
  scene.add(plane) */

  /* const points = new THREE.Points(geometry, materialRef.current)
  scene.add(points) */

  const loader = new GLTFLoader()

  loader.load(glbConstants.LIB.ROUNDED_PLANE, function (gltf) {
    const model = gltf.scenes[0].children[0]
    if (model instanceof THREE.Mesh) {
      model.material = materialRef.current
      meshRef.current = model
      scene.add(model)
    }
  })
}

export default function PlaygroundScene() {
  const { scene } = useThree()

  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(
    new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        uPointSize: { value: 10 },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      wireframe: false,
      depthTest: false,
      depthWrite: false,
      // blending: THREE.AdditiveBlending,
    }),
  )

  useEffect(() => {
    if (!isLoaded) {
      addObjects(scene, meshRef, materialRef)
      setIsLoaded(true)
    }
  }, [scene, isLoaded])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
  })

  return null
}
