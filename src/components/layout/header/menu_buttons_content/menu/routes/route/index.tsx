import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useTranslations } from 'next-intl'
import { FaArrowRight } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'

import type { IRouteData } from '@/types/routes/types'

import { Link, usePathname } from '@/i18n/routing'

import { AppDispatch } from '@/redux/store'
import { toggleMenu } from '@/redux/slices/appStateSlice'

import { splitTextToCharacters } from '@/helpers/textHelpers'

import './index.scss'

export default function Route({
  route,
  isSmallScreen,
}: {
  route: IRouteData
  isSmallScreen: boolean
}) {
  const t = useTranslations('ROUTES')
  const pathname = usePathname()
  const dispatch = useDispatch<AppDispatch>()

  const [isActiveRoute, setIsActiveRoute] = useState(pathname === route.path)

  useEffect(() => {
    setIsActiveRoute(pathname === route.path)
  }, [pathname, route.path])

  const timelineRef = useRef<GSAPTimeline>(gsap.timeline({ paused: true }))

  const handleOnClick = () => {
    dispatch(toggleMenu())
    if (!isActiveRoute) timelineRef.current.reverse()
  }
  const handleMouseEnter = () => {
    if (!isActiveRoute) timelineRef.current.play()
  }
  const handleMouseLeave = () => {
    if (!isActiveRoute) timelineRef.current.reverse()
  }

  useGSAP(() => {
    if (!isSmallScreen) {
      timelineRef.current
        .to(`.${route.translationKey}-route-character-up`, {
          translateY: '-18px',
          duration: 0.15,
          ease: 'power1.out',
          stagger: {
            each: 0.025,
          },
        })
        .to(
          `.${route.translationKey}-route-character-down`,
          {
            translateY: '-18px',
            duration: 0.15,
            ease: 'power1.out',
            stagger: {
              each: 0.025,
            },
          },
          0,
        )
        .to(
          `.${route.translationKey}-route-background`,
          {
            backgroundColor: 'var(--bright-lavender)',
            scale: 1,
            opacity: 0.5,
            duration: timelineRef.current.reversed() ? 0.05 : 0.25,
            ease: 'power1.out',
          },
          0,
        )
        .to(
          `.${route.translationKey}-route-arrow-icon`,
          {
            right: '15px',
            scale: 1,
            opacity: 1,
            duration: 0.05,
            ease: 'power1.out',
          },
          0.25,
        )
    }
  })

  return (
    <Link
      key={`route_${route.translationKey}`}
      className='route-wrapper'
      href={route.path}
      onClick={handleOnClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!isSmallScreen ? (
        <>
          <div className='route-container'>
            {Array(2)
              .fill(null)
              .map((_, index) => (
                <div
                  className='route'
                  key={`route_${route.translationKey}_${index}`}
                >
                  {splitTextToCharacters(t(route.translationKey).toUpperCase()).map(
                    (letter, index) => (
                      <span
                        key={`route_character_${route.translationKey}_${index}`}
                        className={`route-character ${route.translationKey}-route-character-${index === 0 ? 'up' : 'down'}`}
                      >
                        {letter !== ' ' ? letter : '\u00A0'}
                      </span>
                    ),
                  )}
                </div>
              ))}
          </div>
          <div className={`route-background ${route.translationKey}-route-background`} />
          {isActiveRoute ? (
            <GoDotFill className='route-dot-icon' />
          ) : (
            <FaArrowRight className={`route-arrow-icon ${route.translationKey}-route-arrow-icon`} />
          )}
        </>
      ) : (
        <div className='route-container'>
          <div className='route-wrapper'>
            <div
              className='route'
              style={{ color: isActiveRoute ? 'var(--lime-green)' : '' }}
            >
              {t(route.translationKey)}
            </div>
          </div>
        </div>
      )}
    </Link>
  )
}
