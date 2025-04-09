import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import { AppDispatch } from '@/redux/store'
import { toggleMenu } from '@/redux/slices/appStateSlice'

import MenuButtonDots from '@/components/svg/menu_button_dots'

import './index.scss'

export default function MenuButtonSmall() {
  const dispatch = useDispatch<AppDispatch>()

  const timelineRef = useRef<GSAPTimeline>(gsap.timeline({ paused: true }))

  const handleOnClick = () => {
    dispatch(toggleMenu())
  }

  useGSAP(() => {
    timelineRef.current.to(
      '#menu-button-content',
      {
        translateX: 0,
        duration: 0,
      },
      0,
    )
  })

  return (
    <button
      id='menu-button-small'
      onClick={handleOnClick}
    >
      <MenuButtonDots />
    </button>
  )
}
