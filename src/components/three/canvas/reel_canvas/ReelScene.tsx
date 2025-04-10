import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import gsap from 'gsap'

import { default as glbConstants } from '@/constants/assets/glbConstants.json'
import { default as videosConstants } from '@/constants/assets/videosConstants.json'

function addModel(
  scene: THREE.Scene,
  mixerRef: React.MutableRefObject<THREE.AnimationMixer | null>,
  timelineRef: React.MutableRefObject<gsap.core.Timeline | null>,
) {
  const loader = new GLTFLoader()

  const video = document.createElement('video')
  video.src = videosConstants.REEL
  video.loop = true
  video.muted = true
  video.playsInline = true
  video.crossOrigin = 'anonymous'

  const videoTexture = new THREE.VideoTexture(video)
  videoTexture.minFilter = THREE.LinearFilter
  videoTexture.magFilter = THREE.LinearFilter
  videoTexture.format = THREE.RGBAFormat

  const material = new THREE.MeshBasicMaterial({
    map: videoTexture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1,
    depthTest: true,
    depthWrite: true,
    alphaTest: 0.5,
  })

  video.play()

  loader.load(glbConstants.HOME.INTRODUCTION.REEL_PLANE, function (gltf) {
    const model = gltf.scenes[0].children[0]
    if (model instanceof THREE.Mesh) {
      model.material = material
      console.log(model)
      scene.add(model)

      mixerRef.current = new THREE.AnimationMixer(model)
      const actions = {
        action1: mixerRef.current.clipAction(gltf.animations[0]),
        action2: mixerRef.current.clipAction(gltf.animations[1]),
      }

      actions.action1.play().paused = false
      actions.action2.play().paused = false

      console.log(document.querySelector('#reel_canvas'))

      timelineRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: '#introduction_section',
          start: 'top top',
          end: 'bottom 90%',
          // ease: 'power2.out',
          scrub: 1,
          // markers: true,
          onUpdate: (self) => {
            if (mixerRef.current) {
              const duration = gltf.animations[1].duration
              if (self.progress < 1) {
                mixerRef.current.setTime(duration * self.progress)
              }
            }
          },
        },
      })
    }
  })
}

export default function ReelScene() {
  const { scene } = useThree()
  const mixerRef = useRef<THREE.AnimationMixer | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (!isLoaded) {
      addModel(scene, mixerRef, timelineRef)
      setIsLoaded(true)

      return () => {
        if (timelineRef.current) {
          timelineRef.current.kill()
        }
        if (mixerRef.current) {
          mixerRef.current.stopAllAction()
        }
      }
    }
    return () => {}
  }, [scene, isLoaded])

  return null
}
