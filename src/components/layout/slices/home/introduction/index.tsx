import React from 'react'

import ParisMetroMap from './paris_metro_map'
import Content from './content'
import ReelCanvas from '@/components/three/canvas/reel_canvas/ReelCanvas'

import './index.scss'

export default function Introduction() {
  return (
    <section id='introduction-section'>
      <Content />
      <ReelCanvas />
      <ParisMetroMap />
    </section>
  )
}
