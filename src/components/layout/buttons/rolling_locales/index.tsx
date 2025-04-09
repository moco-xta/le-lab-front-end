import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useLocale } from 'next-intl'

import { RootState } from '@/redux/store'

import { locales } from '@/i18n/config'

import './index.scss'

export default function RollingLocales() {
  const currentLocale = useLocale()

  const menu = useSelector((state: RootState) => state.appState.menu)

  const timelineRef = useRef<GSAPTimeline>(gsap.timeline({ paused: true, delay: 0.5 }))

  useGSAP(() => {
    timelineRef.current
      .to(
        '.rolling-locale-button',
        {
          translateX: 0,
          rotate: '-360deg',
          opacity: 1,
          duration: 0.5,
          ease: 'power1.out',
          stagger: {
            each: 0.05,
          },
        },
        0,
      )
      .to(
        '.rolling-locale-button',
        {
          translateY: 0,
          duration: 0.5,
          ease: 'elastic.out',
          stagger: {
            each: 0.05,
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
    <div id='rolling-locales-container'>
      {locales.map((locale) => (
        <button
          key={`rolling_locale_button_${locale}`}
          className={`rolling-locale-button ${locale === currentLocale ? 'active' : ''}`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
