import { RefObject, useEffect, useRef, useState } from 'react'
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
  camera: THREE.Camera,
  size: { width: number; height: number },
  materialRef: RefObject<THREE.ShaderMaterial>,
) {
  const loader = new GLTFLoader()

  loader.load(glbConstants.LIB.ROUNDED_PLANE, function (gltf) {
    const model = gltf.scenes[0].children[0]
    if (model instanceof THREE.Mesh) {
      const box = new THREE.Box3().setFromObject(model)
      const modelSize = new THREE.Vector3()
      box.getSize(modelSize)

      const canvasAspect = size.width / size.height
      const modelAspect = modelSize.x / modelSize.y

      let scale: number
      
      if (camera instanceof THREE.OrthographicCamera) {
        // For orthographic camera
        const visibleHeight = 2 // Camera covers -1 to 1 (2 units)
        const visibleWidth = visibleHeight * canvasAspect
        
        // Determine which dimension to scale by
        if (modelAspect > canvasAspect) {
          // Model is wider than canvas - scale by width
          scale = visibleWidth / modelSize.x
        } else {
          // Model is taller than canvas - scale by height
          scale = visibleHeight / modelSize.y
        }
        model.scale.set(scale, scale, scale)
        const center = box.getCenter(new THREE.Vector3())
        model.position.sub(center.multiplyScalar(scale))
        
        // Update camera
        camera.left = -visibleWidth / 2
        camera.right = visibleWidth / 2
        camera.top = visibleHeight / 2
        camera.bottom = -visibleHeight / 2
        camera.updateProjectionMatrix()
      }
      
      if (camera instanceof THREE.PerspectiveCamera) {
        const distance = camera.position.z
        const fov = camera.fov * (Math.PI / 180)
        const visibleHeight = 2 * Math.tan(fov / 2) * distance
        const visibleWidth = visibleHeight * canvasAspect
        
        if (modelAspect > canvasAspect) {
          scale = visibleWidth / modelSize.x
        } else {
          scale = visibleHeight / modelSize.y
        }
        model.scale.set(scale, scale, scale)
        const center = box.getCenter(new THREE.Vector3())
        model.position.sub(center.multiplyScalar(scale))
      }
      model.material = materialRef.current
      scene.add(model)
    }
  })
}

export default function ReelScene() {
  const { camera, scene, size } = useThree()

  const [isLoaded, setIsLoaded] = useState<boolean>(false)

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
      depthTest: true,
      depthWrite: true,
      // blending: THREE.AdditiveBlending,
    }),
  )

  useEffect(() => {
    if (!isLoaded) {
      addObjects(scene, camera, size, materialRef)
      setIsLoaded(true)
    }
  }, [scene, isLoaded, camera, size])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
  })

  return null
}
