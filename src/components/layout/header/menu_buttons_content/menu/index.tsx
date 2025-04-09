import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

import Routes from './routes'
import Socials from './socials'

import './index.scss'

export default function Menu() {
  const menu = useSelector((state: RootState) => state.appState.menu)
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const breakpointS = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--breakpoint_S').trim(),
        10,
      )

      const checkScreenSize = () => {
        setIsSmallScreen(window.innerWidth < breakpointS)
      }

      checkScreenSize() // Initial check
      window.addEventListener('resize', checkScreenSize)
      return () => window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  return (
    <div
      id='menu'
      style={{
        top: `${!isSmallScreen ? menu.contentPosition.top + 'px' : ''}`,
        right: `${!isSmallScreen ? menu.contentPosition.right + 'px' : ''}`,
      }}
    >
      <Routes isSmallScreen={isSmallScreen} />
      <Socials />
    </div>
  )
}
