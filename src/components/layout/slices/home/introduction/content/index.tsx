import React, { RefObject } from 'react'

import IntroductionTitle from './title'
import IntroductionParagraph from './paragraph'

import './index.scss'

export default function Content() {
  return (
    <div id='introduction-content'>
      <IntroductionTitle />
      <IntroductionParagraph />
    </div>
  )
}
