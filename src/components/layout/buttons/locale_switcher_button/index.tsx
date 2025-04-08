import React, { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocale, useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { FaArrowRight } from 'react-icons/fa'
import { RiTranslate2 } from 'react-icons/ri'

import { AppDispatch, RootState } from '@/redux/store'
import {
  setLocalSwitcherContentPosition,
  toggleLocaleSwitcher,
  toggleMenu,
} from '@/redux/slices/appStateSlice'

import './index.scss'

export default function LocaleSwitcherButton() {
  const t = useTranslations('LOCALES')
  const locale = useLocale()
  const dispatch = useDispatch<AppDispatch>()

  const { menu, localeSwitcher } = useSelector((state: RootState) => state.appState)

  const localeSwitcherButtonRef = useRef<HTMLButtonElement>(null!)
  const buttonTimelineRef = useRef<GSAPTimeline>(gsap.timeline({ paused: true }))
  const contentTimelineRef = useRef<GSAPTimeline>(gsap.timeline({ paused: true }))

  const handleResize = useCallback(() => {
    const rect = localeSwitcherButtonRef.current.getBoundingClientRect()

    dispatch(
      setLocalSwitcherContentPosition({
        width: rect.width,
        top: rect.top + rect.height,
        left: rect.left,
      }),
    )
  }, [dispatch])

  useEffect(() => {
    if (localeSwitcherButtonRef.current) handleResize()
  }, [dispatch, handleResize, localeSwitcherButtonRef])

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  useGSAP(() => {
    buttonTimelineRef.current
      .to(
        '#locale-switcher-button',
        {
          translateX: '0.425em',
          duration: 0.25,
          ease: 'power1.out',
        },
        0,
      )
      .to(
        '#locale-switcher-translation-icon',
        {
          scale: 0,
          opacity: 0,
          duration: 0.25,
          ease: 'power1.out',
        },
        0,
      )
      .to(
        '#locale-switcher-arrow-icon',
        {
          opacity: 1,
          duration: 0.25,
          ease: 'power1.out',
        },
        0,
      )

    contentTimelineRef.current
      .to(
        '#header-buttons-content',
        {
          translateX: 0,
          duration: 0,
          ease: 'none',
        },
        0,
      )
      .to('.locale-option', {
        opacity: 1,
        duration: 0.25,
        ease: 'power1.out',
        stagger: 0.05,
      })
      .to(
        '#locale-switcher-arrow-icon',
        {
          rotate: '90deg',
          marginTop: 0,
          duration: 0.25,
          ease: 'power1.out',
        },
        0,
      )
  })

  const handleOnClick = () => {
    dispatch(toggleLocaleSwitcher())
    if (menu.isOpen) dispatch(toggleMenu())
  }

  const handleMouseEnter = () => {
    buttonTimelineRef.current.play()
  }
  const handleMouseLeave = () => {
    buttonTimelineRef.current.reverse()
  }

  useEffect(() => {
    if (localeSwitcher.isOpen) {
      contentTimelineRef.current.play()
    } else {
      contentTimelineRef.current.reverse()
    }
  }, [localeSwitcher.isOpen])

  return (
    <div
      id='locale-switcher-button-container'
      onClick={handleOnClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div id='locale-switcher-button-wrapper'>
        <button
          ref={localeSwitcherButtonRef}
          id='locale-switcher-button'
        >
          <FaArrowRight
            id='locale-switcher-arrow-icon'
            size={12}
          />
          <span id='locale-switcher-button-text'>{t(locale.toUpperCase()).toUpperCase()}</span>
          <RiTranslate2
            id='locale-switcher-translation-icon'
            size={15}
          />
        </button>
      </div>
    </div>
  )
}
