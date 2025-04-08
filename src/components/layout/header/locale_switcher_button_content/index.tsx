'use client'

import React from 'react'

import LocaleSwitcherOptions from './locale_switcher_options'

import './index.scss'

export default function LocaleSwitcherButtonContent() {
  return (
    <header
      id='locale-switcher-button-content'
      className='locale-switcher-button-content-zIndex'
    >
      <LocaleSwitcherOptions />
    </header>
  )
}
