import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/redux/store'

import Routes from './routes'
import Socials from './socials'

import './index.scss'

export default function Menu() {
  const menu = useSelector((state: RootState) => state.appState.menu)

  return (
    <div
      id='menu'
      style={{
        top: `${menu.contentPosition.top}px`,
        right: `${menu.contentPosition.right}px`,
      }}
    >
      <Routes />
      <Socials />
    </div>
  )
}
