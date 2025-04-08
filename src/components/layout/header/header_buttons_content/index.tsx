'use client'

import React from 'react'

import LocaleSwitcherOptions from './locale_switcher_options'
import Menu from './menu'

import './index.scss'

export default function HeaderButtonsContent() {
  return (
    <header
      id='header-buttons-content'
      className='header-buttons-content-zIndex'
    >
      <LocaleSwitcherOptions />
      <Menu />
    </header>
  )
}
