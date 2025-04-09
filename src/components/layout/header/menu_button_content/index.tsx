'use client'

import React from 'react'

import Menu from './menu'

import './index.scss'

export default function MenuButtonContent() {
  return (
    <header
      id='menu-button-content'
      className='menu-button-content-zIndex'
    >
      <Menu />
    </header>
  )
}
