import React, { useRef } from 'react'

import Grid from '@/components/layout/lib/grid'
import Content from './content'
import Reel from './reel'
import ParisMetroMap from './paris_metro_map'

import './index.scss'

export default function Introduction() {
  const introductionSectionRef = useRef<HTMLDivElement>(null!)
  /* return <Reel /> */

  return (
    <section
      id='introduction-section'
      ref={introductionSectionRef}
    >
      <Content />
      <Reel sectionRef={introductionSectionRef} />
      {/* <ParisMetroMap /> */}
    </section>
  )

  /* return (
    <main>
      <section style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1>Scroll down to see the SVG transfer</h1>
      </section>
      
      <Reel />
      
      <section style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1>Scroll back up to see it return</h1>
      </section>
    </main>
  ); */
}
