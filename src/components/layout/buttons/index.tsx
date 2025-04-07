import React, { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useTranslations } from 'next-intl'

import { AppDispatch, RootState } from '@/redux/store'
import {
  setMenuContentPosition,
  toggleLocaleSwitcher,
  toggleMenu,
} from '@/redux/slices/appStateSlice'

import './index.scss'

export default function MenuButton() {
  const t = useTranslations('BUTTONS')
  const dispatch = useDispatch<AppDispatch>()

  const { menu, localeSwitcher } = useSelector((state: RootState) => state.appState)

  const handleOnClick = () => {
    dispatch(toggleMenu())
    if (localeSwitcher.isOpen) dispatch(toggleLocaleSwitcher())
  }

  const timelineRef = useRef<GSAPTimeline>(gsap.timeline({ paused: true }))
  const menuButtonRef = useRef<HTMLButtonElement>(null!)

  useGSAP(() => {
    timelineRef.current
      .to(
        '#menu-button-menu-close-container',
        {
          translateY: '-30%',
          duration: 0.25,
          ease: 'power1.out',
          delay: 0.1,
        },
        0,
      )
      .to(
        '#menu-button-menu',
        {
          opacity: 0,
          duration: 0.25,
          ease: 'power1.out',
          delay: 0.1,
        },
        0,
      )
      .to(
        '#menu-button-close',
        {
          opacity: 1,
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

  const handleResize = useCallback(() => {
    const rect = menuButtonRef.current.getBoundingClientRect()

    dispatch(
      setMenuContentPosition({
        top: rect.top + rect.height,
        right: window.innerWidth - (rect.left + rect.width),
      }),
    )
  }, [dispatch])

  useEffect(() => {
    if (menuButtonRef.current) handleResize()
  }, [dispatch, handleResize, menuButtonRef])

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  return (
    <button
      ref={menuButtonRef}
      id='menu-button'
      onClick={handleOnClick}
    >
      <div id='menu-button-menu-close-container'>
        <span id='menu-button-menu'>{t('MENU').toUpperCase()}</span>
        <span id='menu-button-close'>{t('CLOSE').toUpperCase()}</span>
      </div>
      <span id='menu-button-dots'>Dots</span>
    </button>
  )
}
