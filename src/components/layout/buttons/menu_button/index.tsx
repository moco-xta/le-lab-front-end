import React, { useCallback, useEffect, useRef, useState } from 'react'
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

import MenuButtonDots from '@/components/svg/menu_button_dots'
// import Metaball from '@/components/svg/metaball'

import './index.scss'

export default function MenuButton() {
  const t = useTranslations('BUTTONS')
  const dispatch = useDispatch<AppDispatch>()

  const { menu, localeSwitcher } = useSelector((state: RootState) => state.appState)

  const [isMenuButtonHovered, setIsMenuButtonHovered] = useState(false)

  const timelineRef = useRef<GSAPTimeline>(gsap.timeline({ paused: true }))
  const menuButtonRef = useRef<HTMLButtonElement>(null!)

  /* useGSAP(() => {
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
        '#routes',
        {
          translateX: 0,
          translateY: 0,
          translateZ: 0,
          rotateZ: 0,
          scale: 1,
          opacity: 1,
          duration: 0.25,
          ease: 'power1.out',
          delay: 0.1,
        },
        0,
      )
      .to(
        '#socials-container',
        {
          translateX: 0,
          translateY: 0,
          translateZ: 0,
          rotateZ: 0,
          scale: 1,
          opacity: 1,
          duration: 0.25,
          ease: 'power1.out',
          delay: 0.1,
        },
        0,
      )
      .to(
        '#menu-button',
        {
          backgroundColor: 'var(--white)',
          duration: 0,
          ease: 'power1.out',
        },
        0,
      )
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
      .to(
        '#menu-button-dots',
        {
          rotate: '90deg',
          duration: 0.25,
          ease: 'power1.out',
          delay: 0.1,
        },
        0,
      )
  }) */

  useEffect(() => {
    if (menu.isOpen) {
      timelineRef.current.play()
    } else {
      timelineRef.current.reverse()
    }
  }, [menu.isOpen])

  const handleOnClick = () => {
    dispatch(toggleMenu())
    if (localeSwitcher.isOpen) dispatch(toggleLocaleSwitcher())
  }

  const handleOnMouseEnter = () => {
    setIsMenuButtonHovered(true)
  }

  const handleOnMouseLeave = () => {
    setIsMenuButtonHovered(false)
  }

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
      style={{
        backgroundColor: isMenuButtonHovered && !menu.isOpen ? 'var(--white)' : 'var(--light-grey)',
      }}
      onClick={handleOnClick}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <div id='menu-button-menu-close-container'>
        <span id='menu-button-menu'>{t('MENU').toUpperCase()}</span>
        <span id='menu-button-close'>{t('CLOSE').toUpperCase()}</span>
      </div>
      <MenuButtonDots />
      {/* <Metaball /> */}
    </button>
  )
}
