import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import gsap from 'gsap'

import useIsSmallScreen from '@/hooks/useIsSmallScreen'

import vertexShader from '../../shaders/project_card/vertexShader.glsl'
import fragmentShader from '../../shaders/project_card/fragmentShader.glsl'

import { isOdd } from '@/helpers/mathHelpers'

import { default as glbConstants } from '@/constants/assets/glbConstants.json'
import { useScrollSpeed } from '@/hooks/useScrollSpeed'

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

export default function ProjectCardScene({
  index,
  textureUrl,
}: {
  index: number
  textureUrl: string
}) {
  const { scene, camera } = useThree()

  const isSmallScreen = useIsSmallScreen('--breakpoint_S')
  const speedRef = useScrollSpeed()

  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const raycaster = useRef(new THREE.Raycaster())
  const pointer = useRef(new THREE.Vector2())
  const blurRef = useRef({ value: 0 })

  useEffect(() => {
    if (!isLoaded) {
      addModel(index, textureUrl, scene, isSmallScreen)
      setIsLoaded(true)
    }
  }, [scene, isLoaded, index, textureUrl, isSmallScreen])

  useEffect(() => {
    const onPointerMove = (event: MouseEvent) => {
      const canvas = document.getElementById(`project-card-canvas-${index}`)
      if (canvas) {
        const rect = canvas.getBoundingClientRect()
        pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        pointer.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      }
    }

    window.addEventListener('pointermove', onPointerMove)
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [index])

  useEffect(() => {
    const triggerElement = document.querySelector(`#project-card-${index}`)

    const checkModel = () => {
      const model = scene.getObjectByName(`last_project_mesh_${index}`)
      if (model && model instanceof THREE.Mesh) {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: 'top 85%',
            end: 'bottom 60%',
            scrub: 1,
            // markers: true,
          },
        })
        timeline
          .to(
            model.position,
            {
              x: !isSmallScreen ? (isOdd(index) ? -0.1 : 0.1) : 0,
            },
            0,
          )
          .to(
            model.rotation,
            {
              x: THREE.MathUtils.degToRad(0),
              y: THREE.MathUtils.degToRad(0),
              z: THREE.MathUtils.degToRad(0),
            },
            0,
          )
          .to(
            model.scale,
            {
              x: 1.05,
              y: 1.05,
              z: 1.05,
            },
            0,
          )
          .to(model.material.uniforms.uZoom, {
            value: 1.1,
          }),
          -0.1
      } else {
        setTimeout(checkModel, 100)
      }
    }

    checkModel()
  }, [scene, index, isSmallScreen])

  useEffect(() => {
    let startTime: number | null = null

    const animateBlur = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const duration = 250

      const progress = Math.min(elapsed / duration, 1)

      blurRef.current.value = Math.sin(progress * Math.PI) * 5

      if (progress < 1) {
        requestAnimationFrame(animateBlur)
      }
    }

    const animationFrameId = requestAnimationFrame(animateBlur)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isHovered])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    scene.traverse((object) => {
      if (object instanceof THREE.Mesh && object.material instanceof THREE.ShaderMaterial) {
        object.material.uniforms.time.value = time
        object.material.uniforms.uScrollSpeed.value = speedRef.current
        object.material.uniforms.uIsMobile.value = isSmallScreen
        object.material.uniforms.uBlur.value = blurRef.current.value
      }
    })

    raycaster.current.setFromCamera(pointer.current, camera)
    const model = scene.getObjectByName(`last_project_mesh_${index}`)
    if (model) {
      const intersects = raycaster.current.intersectObject(model, true)

      if (intersects.length > 0) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }
  })

  return null
}
