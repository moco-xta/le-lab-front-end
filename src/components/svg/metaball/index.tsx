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

  useEffect(() => {
    console.log('metaball1Ref', metaball1Ref.current)
  }, [metaball1Ref.current])

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
