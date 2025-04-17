import React from 'react'

import ProjectCard from '@/components/layout/cards/projects'

import { projectsData } from '@/data/projects/projectsData'

import './index.scss'

export default function LastProjectsCards() {
  return (
    <div id='last-projects-cards'>
      {projectsData.map((project, index) => {
        return (
          <ProjectCard
            key={`last-projects-card-${index}`}
            index={index}
            project={project}
          />
        )
      })}
    </div>
  )
}
