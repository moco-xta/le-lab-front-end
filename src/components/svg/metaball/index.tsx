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

  useGSAP(() => {
    timelineRef.current
      .to(
        '#menu-button-metaball-1',
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
        '#menu-button-metaball-1',
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
        '#menu-button-metaball-2',
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
        '#menu-button-metaball-3',
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
        '#menu-button-metaball-3',
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
        '#menu-button-ball-1',
        {
          cx: 40,
          duration: 0.25,
          ease: 'power1.out',
          delay: 0.1,
        },
        0,
      )
      .to(
        '#menu-button-ball-1',
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
        '#menu-button-ball-2',
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
          id='menu-button-metaball-1'
          cx='15'
          cy='50'
          r={r}
        />
        <circle
          id='menu-button-ball-1'
          cx='40'
          cy='10'
          r={r}
        />
        <circle
          id='menu-button-metaball-2'
          cx='40'
          cy='70'
          r={r}
        />
        <circle
          id='menu-button-ball-2'
          cx='40'
          cy='40'
          r={r}
        />
        <circle
          id='menu-button-metaball-3'
          cx='65'
          cy='50'
          r={r}
        />
      </svg>
    </span>
  )
}
