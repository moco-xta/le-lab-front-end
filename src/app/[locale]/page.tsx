'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'

import Hero from '@/components/layout/slices/home/hero'
import Introduction from '@/components/layout/slices/home/introduction'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

import './page.scss'

export default function HomePage() {
  const t = useTranslations()

  return (
    <div id='home-page'>
      <Hero />
      <Introduction />
    </div>
  )
}
