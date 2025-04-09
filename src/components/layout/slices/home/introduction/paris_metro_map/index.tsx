import React from 'react'

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

  return (
    <div id='paris_metro_map'>
      {parisMetroLinesData.map((line: IMetroLineData) => (
        <div
          key={line.id}
          id='paris_metro_map'
        >
          <AnimatedPath
            id={line.id}
            path={line.d}
            stroke={line.color}
            strokeWidth={2}
          />
        </div>
      ))}
    </div>
  )
}
