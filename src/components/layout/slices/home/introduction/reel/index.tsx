import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './index.scss'

const Reel = () => {
  const svgRef = useRef<SVGSVGElement>(null!)
  const sectionRef = useRef<HTMLDivElement>(null!)
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
  }, [])

  return (
    <section
      ref={sectionRef}
      id='reel-section'
    >
      <svg
        ref={svgRef}
        id='reel-svg'
        viewBox='0 0 100 100'
        preserveAspectRatio='none'
      >
        <rect
          width='100'
          height='100'
          fill='#FF0000'
          opacity='1'
        />
      </svg>

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
    </section>
  )
}

export default Reel
