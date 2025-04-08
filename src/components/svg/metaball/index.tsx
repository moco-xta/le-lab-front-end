import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import { RootState } from '@/redux/store'

import './index.scss'

const r = 10

export default function Metaball() {
  const { menu } = useSelector((state: RootState) => state.appState)

  const timelineRef = useRef<GSAPTimeline>(gsap.timeline({ paused: true }))
  const metaball1Ref = useRef<SVGCircleElement>(null)
  const metaball2Ref = useRef<SVGCircleElement>(null)
  const metaball3Ref = useRef<SVGCircleElement>(null)

  useGSAP(() => {
    timelineRef.current
      .to(
        metaball1Ref.current,
        {
          cx: 40,
          cy: 40,
          duration: 0.25,
          ease: 'power1.out',
          delay: 0.1,
        },
        0,
      )
      .to(
        metaball1Ref.current,
        {
          cx: 20,
          cy: 20,
          duration: 0.25,
          ease: 'power1.out',
          delay: 0.1,
        },
        0.25,
      )
      .to(
        metaball2Ref.current,
        {
          cx: 40,
          cy: 40,
          duration: 0.25,
          ease: 'power1.out',
          delay: 0.1,
        },
        0,
      )
      .to(
        metaball3Ref.current,
        {
          cx: 40,
          cy: 40,
          duration: 0.25,
          ease: 'power1.out',
          delay: 0.1,
        },
        0,
      )
      .to(
        metaball3Ref.current,
        {
          cx: 60,
          cy: 60,
          duration: 0.25,
          ease: 'power1.out',
          delay: 0.1,
        },
        0.25,
      )
      .to(
        '#menu-button-circle-1',
        {
          cx: 40,
          cy: 40,
          duration: 0.25,
          ease: 'power1.out',
          delay: 0.1,
        },
        0,
      )
      .to(
        '#menu-button-circle-1',
        {
          cx: 60,
          cy: 20,
          duration: 0.25,
          ease: 'power1.out',
          delay: 0.1,
        },
        0.25,
      )
      .to(
        '#menu-button-circle-2',
        {
          cx: 20,
          cy: 60,
          duration: 0.25,
          ease: 'power1.out',
          delay: 0.1,
        },
        0.25,
      )
  })

  useEffect(() => {
    if (menu.isOpen) {
      timelineRef.current.play()
    } else {
      timelineRef.current.reverse()
    }
  }, [menu.isOpen])

  return (
    <span id='menu-button-metaball'>
      <svg
        viewBox='0 0 80 80'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          ref={metaball1Ref}
          id='menu-button-metaball-1'
          className='menu-button-metaball'
          cx='15'
          cy='50'
          r={r}
        />
        <circle
          id='menu-button-circle-1'
          cx='40'
          cy='10'
          r={r}
        />
        <circle
          ref={metaball2Ref}
          id='menu-button-metaball-2'
          className='menu-button-metaball'
          cx='40'
          cy='70'
          r={r}
        />
        <circle
          id='menu-button-circle-2'
          cx='40'
          cy='40'
          r={r}
        />
        <circle
          ref={metaball3Ref}
          id='menu-button-metaball-3'
          className='menu-button-metaball'
          cx='65'
          cy='50'
          r={r}
        />
      </svg>
    </span>
  )
}

/* function metaball(
  radius1: number,
  radius2: number,
  center1: [number, number],
  center2: [number, number],
  handleSize = 2.4,
  v = 0.5
): string {
  const HALF_PI = Math.PI / 2
  const d = dist(center1, center2)
  const maxDist = radius1 + radius2 * 2.5
  let u1: number, u2: number

  if (radius1 === 0 || radius2 === 0 || d > maxDist || d <= Math.abs(radius1 - radius2)) {
    return ''
  }

  if (d < radius1 + radius2) {
    u1 = Math.acos(
      (radius1 * radius1 + d * d - radius2 * radius2) / (2 * radius1 * d)
    )
    u2 = Math.acos(
      (radius2 * radius2 + d * d - radius1 * radius1) / (2 * radius2 * d)
    )
  } else {
    u1 = 0
    u2 = 0
  }

  const angleBetweenCenters = angle(center2, center1)
  const maxSpread = Math.acos((radius1 - radius2) / d)

  const angle1 = angleBetweenCenters + u1 + (maxSpread - u1) * v
  const angle2 = angleBetweenCenters - u1 - (maxSpread - u1) * v
  const angle3 = angleBetweenCenters + Math.PI - u2 - (Math.PI - u2 - maxSpread) * v
  const angle4 = angleBetweenCenters - Math.PI + u2 + (Math.PI - u2 - maxSpread) * v

  const p1 = getVector(center1, angle1, radius1)
  const p2 = getVector(center1, angle2, radius1)
  const p3 = getVector(center2, angle3, radius2)
  const p4 = getVector(center2, angle4, radius2)

  const totalRadius = radius1 + radius2
  const d2Base = Math.min(v * handleSize, dist(p1, p3) / totalRadius)
  const d2 = d2Base * Math.min(1, d * 2 / (radius1 + radius2))

  const r1 = radius1 * d2
  const r2 = radius2 * d2

  const h1 = getVector(p1, angle1 - HALF_PI, r1)
  const h2 = getVector(p2, angle2 + HALF_PI, r1)
  const h3 = getVector(p3, angle3 + HALF_PI, r2)
  const h4 = getVector(p4, angle4 - HALF_PI, r2)

  return metaballToPath(
    p1, p2, p3, p4,
    h1, h2, h3, h4,
    d > radius1,
    radius2
  )
}

function metaballToPath(
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  p4: [number, number],
  h1: [number, number],
  h2: [number, number],
  h3: [number, number],
  h4: [number, number],
  escaped: boolean,
  r: number
): string {
  return [
    'M', p1,
    'C', h1, h3, p3,
    'A', r, r, 0, escaped ? 1 : 0, 0, p4,
    'C', h4, h2, p2,
  ].join(' ')
}

function dist([x1, y1]: [number, number], [x2, y2]: [number, number]): number {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}

function angle([x1, y1]: [number, number], [x2, y2]: [number, number]): number {
  return Math.atan2(y1 - y2, x1 - x2)
}

function getVector([cx, cy]: [number, number], a: number, r: number): [number, number] {
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
}

export default function Metaball() {
  const circle1Ref = useRef<SVGCircleElement>(null)
  const circle2Ref = useRef<SVGCircleElement>(null)
  const connectorRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const animateMetaball = () => {
      const circle1 = circle1Ref.current
      const circle2 = circle2Ref.current
      const connector = connectorRef.current
      
      if (!circle1 || !circle2 || !connector) return

      const radius1 = 24
      const radius2 = 16
      const center1 = { x: 30, y: 30 }
      const center2 = { x: 60, y: 60 }

      const updatePath = () => {
        const path = metaball(
          radius1,
          radius2,
          [center1.x, center1.y],
          [center2.x, center2.y]
        )
        if (path) connector.setAttribute('d', path)
      }

      // Animate with GSAP
      gsap.to(center2, {
        x: 30,
        y: 30,
        duration: 0.5,
        ease: 'power1.out',
        onUpdate: updatePath
      })

      gsap.to(center2, {
        x: 60,
        y: 60,
        duration: 0.5,
        delay: 0.5,
        ease: 'power1.out',
        onUpdate: updatePath
      })
    }

    animateMetaball()
  }, [])

  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      className="menu-button-metaball"
    >
      <path
        ref={connectorRef}
        fill="currentColor"
      />
      <circle
        ref={circle1Ref}
        cx="30"
        cy="30"
        r="24"
        fill="currentColor"
      />
      <circle
        ref={circle2Ref}
        cx="60"
        cy="60"
        r="16"
        fill="currentColor"
      />
    </svg>
  )
} */
