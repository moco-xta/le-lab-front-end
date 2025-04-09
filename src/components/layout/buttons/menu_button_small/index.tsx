import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import { AppDispatch, RootState } from '@/redux/store'
import { toggleMenu } from '@/redux/slices/appStateSlice'

import MenuButtonDots from '@/components/svg/menu_button_dots'

import './index.scss'

export default function MenuButtonSmall() {
  const dispatch = useDispatch<AppDispatch>()

  const { menu } = useSelector((state: RootState) => state.appState)

  const timelineRef = useRef<GSAPTimeline>(gsap.timeline({ paused: true }))

  const handleOnClick = () => {
    dispatch(toggleMenu())
  }

  useGSAP(() => {
    timelineRef.current
      .to(
        '#menu-button-content',
        {
          translateX: 0,
          duration: 0,
        },
        0,
      )
      .to(
        '.route',
        {
          onStart: () => {
            console.log('TEST_2')
          },
          translateY: '-18px',
          duration: 0.15,
          ease: 'power1.out',
          stagger: {
            each: 0.025,
          },
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
    <button
      id='menu-button-small'
      onClick={handleOnClick}
    >
      <MenuButtonDots />
    </button>
  )
}
