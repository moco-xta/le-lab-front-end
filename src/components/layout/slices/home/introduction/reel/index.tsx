import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ReelCanvas from '@/components/three/canvas/reel_canvas/ReelCanvas'

import { default as videosConstants } from '@/constants/assets/videosConstants.json'

import './index.scss'

const Reel = ({ sectionRef }: { sectionRef: React.RefObject<HTMLDivElement> }) => {
  const svgRef = useRef<HTMLDivElement>(null!)
  const initialContainerRef = useRef<HTMLDivElement>(null!)
  const targetContainerRef = useRef<HTMLDivElement>(null!)
  const reelCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // const svg = svgRef.current
    const canvas = reelCanvasRef.current
    const section = sectionRef.current
    const initialContainer = initialContainerRef.current
    const targetContainer = targetContainerRef.current

    if (!canvas || !initialContainer || !targetContainer || !section) return

    const initAnimation = () => {
      const sectionBCR = section.getBoundingClientRect()
      const initialContainerBCR = initialContainer.getBoundingClientRect()
      const targetContainerBCR = targetContainer.getBoundingClientRect()

      const startX = initialContainerBCR.left
      const startY = initialContainerBCR.top - sectionBCR.top
      const endX = targetContainerBCR.left
      const endY = targetContainerBCR.top - sectionBCR.top

      gsap.set(canvas, {
        top: startY,
        left: startX,
        width: initialContainerBCR.width,
        height: initialContainerBCR.height,
        opacity: 1,
        display: 'block',
      })

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        markers: true, // Remove in production!
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to(canvas, {
            top: startY + (endY - startY) * progress,
            left: startX + (endX - startX) * progress,
            width:
              initialContainerBCR.width +
              (targetContainerBCR.width - initialContainerBCR.width) * progress,
            height:
              initialContainerBCR.height +
              (targetContainerBCR.height - initialContainerBCR.height) * progress,
            duration: 0.1,
            overwrite: true,
          })
        },
      })

      return trigger
    }

    let trigger: ScrollTrigger | undefined
    const onResize = () => {
      trigger?.kill()
      trigger = initAnimation()
    }

    window.addEventListener('resize', onResize)
    trigger = initAnimation()

    return () => {
      trigger?.kill()
      window.removeEventListener('resize', onResize)
    }
  }, [sectionRef])

  return (
    <>
      {/* <svg
        ref={svgRef}
        id='reel-svg'
        viewBox='0 0 16 9'
        preserveAspectRatio='xMidYMid meet'
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <foreignObject
          width='100%'
          height='100%'
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              // objectFit: 'contain',
              objectFit: 'fill',
              objectPosition: 'center',
              display: 'block',
            }}
          >
            <source
              src={videosConstants.REEL}
              type='video/webm'
            />
          </video>
        </foreignObject>
      </svg> */}
      
      <ReelCanvas ref={reelCanvasRef} />

      <div
        ref={initialContainerRef}
        id='initial-container'
        className='reel-container'
      >
        First Container
      </div>
      <div
        ref={targetContainerRef}
        id='target-container'
        className='reel-container'
      >
      </div>
    </>
  )
}

export default Reel
