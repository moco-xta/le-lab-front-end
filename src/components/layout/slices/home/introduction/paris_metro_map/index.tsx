import React, { useEffect, useMemo, useRef } from 'react'

import type { IMetroLineData } from '@/types/data/types'

import useGetScreenSize from '@/hooks/useGetScreenSize'

import AnimatedPath from '@/components/layout/lib/animated_path/AnimatedPath'

import { parisMetroLinesData } from '@/data/layout/home/introduction/parisMetroLinesData'

import './index.scss'

export default function ParisMetroMap() {
  const screenSize = useGetScreenSize([
    '--breakpoint_XS',
    '--breakpoint_S',
    '--breakpoint_M',
    '--breakpoint_L',
  ])

  const svgRef = useRef<SVGSVGElement>(null)

  const strokeWidths = useMemo(() => {
    return {
      XS: 1.25,
      S: 1.5,
      M: 1.25,
      L: 1.25,
    }
  }, [])

  useEffect(() => {
    console.log(strokeWidths[screenSize as keyof typeof strokeWidths])
  }, [screenSize, strokeWidths])

  return (
    <div id='paris-metro-map'>
      <svg
        ref={svgRef}
        viewBox='0 0 100 100'
        preserveAspectRatio='xMidYMid meet'
      >
        {parisMetroLinesData.map((line: IMetroLineData) => (
          <AnimatedPath
            key={line.id}
            id={line.id}
            path={line.d}
            stroke={line.color}
            strokeWidth={strokeWidths[screenSize as keyof typeof strokeWidths]}
          />
        ))}
      </svg>
    </div>
  )
}
