'use client'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.scss'

gsap.registerPlugin(ScrollTrigger)

const Reel = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const benchmark1Ref = useRef<HTMLDivElement>(null)
  const benchmark2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    const benchmark1 = benchmark1Ref.current
    const benchmark2 = benchmark2Ref.current

    if (!svg || !benchmark1 || !benchmark2) return

    const initAnimation = () => {
      const b1Rect = benchmark1.getBoundingClientRect()
      const b2Rect = benchmark2.getBoundingClientRect()

      // Make SVG visible and position it initially
      gsap.set(svg, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: b1Rect.width,
        height: b1Rect.height,
        x: b1Rect.left,
        y: b1Rect.top,
        opacity: 1,
        display: 'block',
        transformOrigin: '0 0',
      })

      ScrollTrigger.create({
        trigger: benchmark1,
        start: 'top top',
        // end: () => `bottom+=${b2Rect.height} center`,
        end: 'bottom 20%',
        scrub: 1,
        markers: true,
        onUpdate: (self) => {
          const progress = self.progress
          const currentX = b1Rect.left + (b2Rect.left - b1Rect.left) * progress
          const currentY = b1Rect.top + (b2Rect.top - b1Rect.top) * progress

          gsap.to(svg, {
            x: currentX,
            y: currentY,
            width: b1Rect.width + (b2Rect.width - b1Rect.width) * progress,
            height: b1Rect.height + (b2Rect.height - b1Rect.height) * progress,
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
    <section className='section'>
      <svg
        ref={svgRef}
        className='transferSvg'
        viewBox='0 0 100 100'
        preserveAspectRatio='none'
        style={{ display: 'none' }}
      >
        <rect
          width='100'
          height='100'
          fill='#FF0000'
          opacity='1'
        />
      </svg>

      <div
        ref={benchmark1Ref}
        id='initial'
        className='benchmark'
      >
        First Benchmark
      </div>
      <div
        ref={benchmark2Ref}
        id='final'
        className='benchmark'
      >
        Second Benchmark
      </div>
    </section>
  )
}

export default Reel
