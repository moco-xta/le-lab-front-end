import React from 'react'
import { useTranslations } from 'next-intl'

import './index.scss'

export default function HeroHeading() {
  const t = useTranslations('HOME.HERO')

  return (
    <p id='hero-heading'>
      <span>{t('TEXT.LINE_1')}</span>
      <span>{t('TEXT.LINE_2')}</span>
      <span>{t('TEXT.LINE_3')}</span>
    </p>
  )
}
