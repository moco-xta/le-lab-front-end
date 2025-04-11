'use client'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.scss'

gsap.registerPlugin(ScrollTrigger)

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
      // Get positions relative to document
      const initialContainerPos = initialContainer.getBoundingClientRect()
      const targetContainerPos = targetContainer.getBoundingClientRect()
      const scrollY = window.scrollY

      // Convert to absolute document coordinates
      const startX = initialContainerPos.left
      const startY = initialContainerPos.top + scrollY
      const endX = targetContainerPos.left
      const endY = targetContainerPos.top + scrollY

      // Set initial SVG position (absolutely positioned)
      gsap.set(svg, {
        position: 'absolute',
        top: startY,
        left: startX,
        width: initialContainerPos.width,
        height: initialContainerPos.height,
        opacity: 1,
        display: 'block',
      })

      // Create the animation timeline
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        markers: true,
        onUpdate: (self) => {
          const progress = self.progress
          const currentScrollY = window.scrollY

          // Calculate current position (absolute document coordinates)
          const currentX = startX + (endX - startX) * progress
          const currentY = startY + (endY - startY) * progress - currentScrollY

          // Calculate current size
          const currentWidth =
            initialContainerPos.width +
            (targetContainerPos.width - initialContainerPos.width) * progress
          const currentHeight =
            initialContainerPos.height +
            (targetContainerPos.height - initialContainerPos.height) * progress

          // Apply transformations
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

    // Handle resize and initial load
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
      className='section'
    >
      <svg
        ref={svgRef}
        className='transferSvg'
        viewBox='0 0 100 100'
        preserveAspectRatio='none'
        // style={{ display: 'none' }}
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
        id='initial'
        className='benchmark'
      >
        First Container
      </div>
      <div
        ref={targetContainerRef}
        id='final'
        className='benchmark'
      >
        Second Container
      </div>
    </section>
  )
}

export default Reel
