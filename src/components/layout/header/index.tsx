'use client'

import React from 'react'

import LogoMocoCanvas from '@/components/three/canvas/logo_moco/LogoMocoCanvas'
import LocaleSwitcherButton from '../buttons/locale_switcher_button'
import MenuButton from '../buttons/menu_button'

import { getMatteMaterial } from '@/components/three/materials'

import { logoMocoData } from '@/data/logo_moco/three/logoMocoData'

import './index.scss'

export default function Header() {
  return (
    <>
      <header
        id='header-logo'
        className='header-zIndex'
      >
        <LogoMocoCanvas logoMocoMaterial={getMatteMaterial(logoMocoData.material.color)} />
      </header>
      <header
        id='header-buttons'
        className='header-zIndex'
      >
        <LocaleSwitcherButton />
        <MenuButton />
      </header>
    </>
  )
}
