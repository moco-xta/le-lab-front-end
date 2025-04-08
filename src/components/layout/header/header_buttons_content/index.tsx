'use client'

import React from 'react'

import Menu from './menu'

import './index.scss'

export default function HeaderButtonsContent() {
  return (
    <header
      id='header-buttons-content'
      className='header-buttons-content-zIndex'
    >
      <Menu />
    </header>
  )
}
