import React from 'react'

import HeroHeading from './hero_heading'
import HeroCanvas from '@/components/three/canvas/hero_camvas/HeroCanvas'

import './index.scss'

export default function Hero() {
  return (
    <section id='hero_section'>
      <HeroHeading />
      <HeroCanvas />
    </section>
  )
}
