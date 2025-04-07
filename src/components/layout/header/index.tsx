'use client'

import React from 'react'

import LogoMocoCanvas from '@/components/three/canvas/logo_moco/LogoMocoCanvas'

import { getMatteMaterial } from '@/components/three/materials'

import { logoMocoData } from '@/data/logo_moco/three/logoMocoData'

import './index.scss'

export default function Header() {
  return (
    <>
      <header
        id='header_logo'
        className='header_zIndex'
      >
        <LogoMocoCanvas logoMocoMaterial={getMatteMaterial(logoMocoData.material.color)} />
      </header>
    </>
  )
}
