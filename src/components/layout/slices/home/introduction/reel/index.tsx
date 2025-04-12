import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ReelCanvas from '@/components/three/canvas/reel_canvas/ReelCanvas'

import { default as videosConstants } from '@/constants/assets/videosConstants.json'

import './index.scss'

const Reel = ({ sectionRef }: { sectionRef: React.RefObject<HTMLDivElement> }) => {
  const svgRef = useRef<SVGSVGElement>(null!)
  const initialContainerRef = useRef<HTMLDivElement>(null!)
  const targetContainerRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const svg = svgRef.current
    const section = sectionRef.current
    const initialContainer = initialContainerRef.current
    const targetContainer = targetContainerRef.current

    if (!svg || !initialContainer || !targetContainer || !section) return

    const initAnimation = () => {
      const sectionBCR = section.getBoundingClientRect()
      const initialContainerBCR = initialContainer.getBoundingClientRect()
      const targetContainerBCR = targetContainer.getBoundingClientRect()

      const startX = initialContainerBCR.left
      const startY = initialContainerBCR.top - sectionBCR.top
      const endX = targetContainerBCR.left
      const endY = targetContainerBCR.top - sectionBCR.top

      gsap.set(svg, {
        top: startY,
        left: startX,
        width: initialContainerBCR.width,
        height: initialContainerBCR.height,
        opacity: 1,
        display: 'block',
      })

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        markers: true,
        onUpdate: (self) => {
          const progress = self.progress

          const currentX = startX + (endX - startX) * progress
          const currentY = startY + (endY - startY) * progress

          const currentWidth =
            initialContainerBCR.width +
            (targetContainerBCR.width - initialContainerBCR.width) * progress
          const currentHeight =
            initialContainerBCR.height +
            (targetContainerBCR.height - initialContainerBCR.height) * progress

          gsap.to(svg, {
            top: currentY,
            left: currentX,
            width: currentWidth,
            height: currentHeight,
            duration: 0.1,
            overwrite: true,
          })
        },
      })
    }

    const onResize = () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      initAnimation()
    }

    window.addEventListener('resize', onResize)
    const timeout = setTimeout(initAnimation, 100)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', onResize)
      ScrollTrigger.getAll().forEach((t) => t.kill())
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
              objectFit: 'contain',
              objectPosition: 'center',
              display: 'block',
            }}
          >
            <source
              src={videosConstants.REEL}
              type='video/mp4'
            />
          </video>
        </foreignObject>
      </svg> */}

      <ReelCanvas />

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
        Second Container
      </div>
    </>
  )
}

export default Reel
