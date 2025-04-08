'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const t = useTranslations()

  return <div>Home</div>
}
