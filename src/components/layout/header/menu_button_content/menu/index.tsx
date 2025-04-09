import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

import useIsSmallScreen from '@/hooks/useIsSmallScreen'

import Routes from './routes'
import Socials from './socials'
import RollingLocales from '@/components/layout/buttons/rolling_locales'

import './index.scss'

export default function Menu() {
  const menu = useSelector((state: RootState) => state.appState.menu)

  const isSmallScreen = useIsSmallScreen('--breakpoint_S')

  return (
    <div
      id='menu'
      style={{
        top: `${!isSmallScreen ? menu.contentPosition.top + 'px' : ''}`,
        right: `${!isSmallScreen ? menu.contentPosition.right + 'px' : ''}`,
      }}
    >
      <Routes isSmallScreen={isSmallScreen} />
      <Socials isSmallScreen={isSmallScreen} />
      {isSmallScreen && <RollingLocales />}
    </div>
  )
}
