import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { scaleSvgPath } from '@/helpers/svgHelpers'

export type TPathAnimation = {
  id: number
  path: string
  stroke?: string
  strokeWidth?: number
}

export default function AnimatedPath({ id, path, stroke, strokeWidth }: TPathAnimation) {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!pathRef.current) return

    const pathElement = pathRef.current
    const length = pathElement.getTotalLength()

    gsap.set(pathElement, {
      strokeDasharray: length,
      strokeDashoffset: length,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#introduction-section',
        start: 'top 75%',
        end: 'bottom 75%',
        scrub: true,
        // markers: true,
      },
    })

    tl.to(pathElement, {
      strokeDashoffset: 0,
      opacity: 1,
      duration: 2,
      ease: 'power1.out',
      // ease: 'none',
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <path
      ref={pathRef}
      d={scaleSvgPath(path, 0.145)}
      fill='none'
      stroke={stroke}
      opacity={0}
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      // transform="scale(0.3 0.3)"
    />
  )
}
