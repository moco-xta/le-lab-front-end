import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useLocale } from 'next-intl'

import type { TLocales } from '@/types/locales/types'

import { usePathname, useRouter } from '@/i18n/routing'

import { AppDispatch, RootState } from '@/redux/store'

import { toggleLocaleSwitcher, toggleMenu } from '@/redux/slices/appStateSlice'

import { locales } from '@/i18n/config'

import './index.scss'

export default function RollingLocales() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useDispatch<AppDispatch>()

  const { menu, localeSwitcher } = useSelector((state: RootState) => state.appState)

  const timelineRef = useRef<GSAPTimeline>(gsap.timeline({ paused: true, delay: 0.5 }))
  
  function handleSetCurrentLocale(localeOption: TLocales) {
    router.replace({ pathname }, { locale: localeOption })
    dispatch(toggleMenu())
    dispatch(toggleLocaleSwitcher())
  }

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
      {locales.map((localeOption) => (
        <button
          key={`rolling_locale_button_${localeOption}`}
          className={`rolling-locale-button ${localeOption === locale ? 'active' : ''}`}
          onClick={() => handleSetCurrentLocale(localeOption)}
        >
          {localeOption.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
