import React from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useTranslations } from 'next-intl'

import './index.scss'

function IntroductionTitleTextBlock({ id, text }: { id: string; text: string }) {
  return (
    <div className='text-revealed-wrapper'>
      <span
        id={id}
        className='section-title text-revealed introduction-title-text-blocks'
      >
        {text}
        &nbsp;
      </span>
    </div>
  )
}

export default function IntroductionTitle() {
  const t = useTranslations('HOME.INTRODUCTION')

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#introduction-section',
        start: 'top 60%',
        // markers: true,
      },
      labels: {
        firstLine: 0,
        secondLine: 0,
      },
    })

    timeline
      .to(
        '#hi-text',
        {
          yPercent: -100,
          opacity: 1,
          duration: 0.5,
          ease: 'power1.out',
        },
        'firstLine',
      )
      .to(
        '#im-text',
        {
          yPercent: -100,
          opacity: 1,
          duration: 0.5,
          ease: 'power1.out',
        },
        'firstLine+=0.25',
      )
      .to(
        '#federico-text',
        {
          yPercent: -100,
          opacity: 1,
          duration: 0.5,
          ease: 'power1.out',
        },
        'firstLine+=0.5',
      )
      .to(
        '#im-federico-container',
        {
          xPercent: 15,
          duration: 0.5,
          ease: 'power1.out',
        },
        'firstLine+=0.75',
      )
      .to(
        '#introduction-title-first-line',
        {
          xPercent: 10,
          duration: 0.5,
          ease: 'power1.out',
        },
        'firstLine+=0.75',
      )
      .to(
        '#a-text',
        {
          yPercent: 100,
          opacity: 1,
          duration: 0.5,
          ease: 'power1.out',
        },
        'secondLine-=1',
      )
      .to(
        '#front-end-text',
        {
          yPercent: 100,
          opacity: 1,
          duration: 0.5,
          ease: 'power1.out',
        },
        'secondLine-=0.75',
      )
      .to(
        '#developer-text',
        {
          yPercent: 100,
          opacity: 1,
          duration: 0.5,
          ease: 'power1.out',
        },
        'secondLine-=0.5',
      )
  })

  const texts = [
    [
      {
        id: 'hi-text',
        text: 'SECTION_TITLE.HI',
      },
    ],
    [
      {
        id: 'im-text',
        text: 'SECTION_TITLE.I_M',
      },
      {
        id: 'federico-text',
        text: 'Federico',
      },
    ],
    [
      {
        id: 'a-text',
        text: 'SECTION_TITLE.A',
      },
      {
        id: 'front-end-text',
        text: 'SECTION_TITLE.FRONT_END',
      },
      {
        id: 'developer-text',
        text: 'SECTION_TITLE.DEVELOPER',
      },
    ],
  ]

  return (
    <h2 id='introduction-title'>
      <div
        id='introduction-title-first-line'
        className='introduction-title-lines'
      >
        {texts[0].map((text) => (
          <IntroductionTitleTextBlock
            key={`introduction-title-text-block-${text.id}`}
            id={text.id}
            text={t(text.text)}
          />
        ))}
        <div id='im-federico-container'>
          {texts[1].map((text) => (
            <IntroductionTitleTextBlock
              key={`introduction-title-text-block-${text.id}`}
              id={text.id}
              text={text.text !== 'Federico' ? t(text.text) : text.text}
            />
          ))}
        </div>
      </div>
      <div
        id='introduction-title-second-line'
        className='introduction-title-lines'
      >
        {texts[2].map((text) => (
          <IntroductionTitleTextBlock
            key={`introduction-title-text-block-${text.id}`}
            id={text.id}
            text={t(text.text)}
          />
        ))}
      </div>
    </h2>
  )
}
