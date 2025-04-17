import React from 'react'

import LastProjectsTitleBar from './title_bar'
import LastProjectsCards from './last_projects_cards'

import './index.scss'

export default function LastProjects() {
  return (
    <section id='last-projects-section'>
      <LastProjectsTitleBar />
      <LastProjectsCards />
    </section>
  )
}
