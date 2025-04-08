import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import { RootState } from '@/redux/store'

import './index.scss'

export default function MenuButtonDots() {
  const { menu } = useSelector((state: RootState) => state.appState)

  const timelineRef = useRef<GSAPTimeline>(gsap.timeline({ paused: true }))

  useGSAP(() => {
    timelineRef.current.to(
      '#menu-button-dots',
      {
        rotate: '90deg',
        duration: 0.25,
        ease: 'power1.out',
        delay: 0.1,
      },
      0,
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
    <div id='menu-button-dots'>
      <svg
        viewBox='0 0 40 80'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          id='menu-button-dot-1'
          cx='20'
          cy='15'
          r={15}
        />
        <circle
          id='menu-button-dot-2'
          cx='20'
          cy='65'
          r={15}
        />
      </svg>
    </div>
  )
}
