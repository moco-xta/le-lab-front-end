import React from 'react'

import LastProjectsTitle from './title'
import LastProjectsTitleDecoration from './title_decoration'

import './index.scss'

export default function LastProjectsTitleBar() {
  return (
    <div id='last-projects-title-bar'>
      <LastProjectsTitle />
      <LastProjectsTitleDecoration />
    </div>
  )
}
