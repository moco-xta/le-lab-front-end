import React from 'react'

import ParisMetroMap from './paris_metro_map'
import Content from './content'

import './index.scss'

export default function Introduction() {
  return (
    <section id='introduction-section'>
      <Content />
      <ParisMetroMap />
    </section>
  )
}
