import { useEffect, useState } from "react"
import * as THREE from 'three'
import { useThree } from "@react-three/fiber"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import useIsSmallScreen from "@/hooks/useIsSmallScreen"

import vertexShader from '../../shaders/project_card/vertexShader.glsl'
import fragmentShader from '../../shaders/project_card/fragmentShader.glsl'

import { isOdd } from "@/helpers/mathHelpers"

import { default as glbConstants } from '@/constants/assets/glbConstants.json'

function addModel(index: number, textureUrl: string, scene: THREE.Scene, isSmallScreen: boolean) {
  const loader = new GLTFLoader()

  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load(textureUrl)

  const material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1,
    depthTest: true,
    depthWrite: true,
    alphaTest: 0.5,
    uniforms: {
      time: { value: 0 },
      uIsOdd: { value: isOdd(index) ? 1.0 : -1.0 },
      uTexture: { value: texture },
      uZoom: { value: 1.0 },
      uScrollSpeed: { value: 0.0 },
      uScrollDirection: { value: 1 },
      uBlur: { value: 0.0 },
      uIsMobile: { value: isSmallScreen },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  })
  material.needsUpdate = true

  loader.load(glbConstants.LIB.ROUNDED_PLANE, function (gltf) {
    const model = gltf.scenes[0].children[0]
    if (model instanceof THREE.Mesh) {
      model.name = `last_project_mesh_${index}`
      model.raycast = THREE.Mesh.prototype.raycast
      model.material = material

      model.geometry.computeBoundingBox()
      const size = new THREE.Vector3()
      model.geometry.boundingBox?.getSize(size)

      const targetSize = 1
      const scale = targetSize / Math.max(size.x, size.y, size.z)
      model.scale.set(scale, scale, scale)

      if (!isSmallScreen) model.position.set(isOdd(index) ? -0.6 : 0.6, 0, 0)
      model.rotation.set(
        THREE.MathUtils.degToRad(-5),
        THREE.MathUtils.degToRad(!isSmallScreen ? (isOdd(index) ? -5 : 5) : 0),
        THREE.MathUtils.degToRad(!isSmallScreen ? (isOdd(index) ? -5 : 5) : 0),
      )

      model.geometry.computeBoundingBox()
      model.geometry.computeBoundingSphere()

      model.updateMatrix()
      model.updateMatrixWorld(true)

      scene.add(model)
    }
  })
}

export default function ProjectCardScene({ index, textureUrl }: { index: number, textureUrl: string }) {
  const { scene, camera } = useThree()
  
  const isSmallScreen = useIsSmallScreen('--breakpoint_S')

  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (!isLoaded) {
      addModel(index, textureUrl, scene, isSmallScreen)
      setIsLoaded(true)
    }
  }, [scene, isLoaded, index, textureUrl, isSmallScreen])

  return null
}
