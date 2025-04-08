import React from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useTranslations } from 'next-intl'

import './index.scss'

export default function HeroHeading() {
  const t = useTranslations('HOME.HERO')

  useGSAP(() => {
    const animationFn = gsap.to('.hero-heading-line', {
      yPercent: -100,
      rotateZ: '0deg',
      opacity: 1,
      duration: 0.75,
      delay: 0.5,
      ease: 'power1.out',
      stagger: 0.15,
    })

    return () => {
      animationFn.kill()
    }
  })

  return (
    <div id='hero-heading'>
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <div
            key={`heading_line_${index + 1}`}
            className='hero-heading-line-wrapper'
          >
            <p className='hero-heading-line'>{t(`TEXT.LINE_${index + 1}`)}</p>
          </div>
        ))}
    </div>
  )
}
