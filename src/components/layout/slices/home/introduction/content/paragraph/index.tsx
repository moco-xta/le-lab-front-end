import React, { RefObject, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useTranslations } from 'next-intl'

import './index.scss'

function IntroductionParagraphLineRevealed({ text }: { text: string }) {
  const textRef = useRef<HTMLDivElement>(null!)

  return (
    <div className='introduction-line-wrapper'>
      <p
        ref={textRef}
        className='introduction-line gradient-text'
      >
        {text}
      </p>
    </div>
  )
}

export default function IntroductionParagraph() {
  const t = useTranslations('HOME.INTRODUCTION')

  useGSAP(() => {
    const animationFn = gsap.to('.introduction-line', {
      scrollTrigger: {
        trigger: '#introduction-section',
        start: 'top 60%',
        // markers: true,
      },
      yPercent: -100,
      rotateZ: '0deg',
      opacity: 1,
      duration: 0.5,
      delay: 0.5,
      ease: 'power1.out',
      stagger: 0.2,
    })

    return () => {
      animationFn.kill()
    }
  })

  return (
    <div id='home-introduction-container'>
      <IntroductionParagraphLineRevealed text={t('INTRODUCTION.LINE_1')} />
      <IntroductionParagraphLineRevealed text={t('INTRODUCTION.LINE_2')} />
      <IntroductionParagraphLineRevealed text={t('INTRODUCTION.LINE_3')} />
      <IntroductionParagraphLineRevealed text={t('INTRODUCTION.LINE_4')} />
      <IntroductionParagraphLineRevealed text={t('INTRODUCTION.LINE_5')} />
      <button
        id='learn-more-button'
        className='button-style-1'
      >
        Learn more
      </button>
    </div>
  )
}
