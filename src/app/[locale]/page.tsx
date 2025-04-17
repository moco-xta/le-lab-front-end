'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Hero from '@/components/layout/slices/home/hero'
import Introduction from '@/components/layout/slices/home/introduction'
import LastProjects from '@/components/layout/slices/home/last_projects'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

import './page.scss'

export default function HomePage() {
  return (
    <div id='home-page'>
      <Hero />
      <Introduction />
      <LastProjects />
    </div>
  )
}
