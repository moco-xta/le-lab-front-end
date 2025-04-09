import React from 'react'

import HeroHeading from './hero_heading'
import HeroCanvas from '@/components/three/canvas/hero_camvas/HeroCanvas'
import ScrollToExplore from './ScrollToExplore'

import './index.scss'

export default function Hero() {
  return (
    <section id='hero-section'>
      <HeroHeading />
      <HeroCanvas />
      <ScrollToExplore />
    </section>
  )
}
