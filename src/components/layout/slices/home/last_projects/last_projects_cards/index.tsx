import React, { useRef } from 'react'

import type { IProjectData } from '@/types/data/types'

import ProjectCard from '@/components/layout/cards/projects'

import { projectsData } from '@/data/projects/projectsData'

import './index.scss'

export default function LastProjectsCards() {
  const rolesRef = useRef<string[]>([])

  projectsData.forEach((project: IProjectData) => {
    let sentence = ''
    project.roles.forEach((role, roleIndex) => {
      sentence += `${roleIndex > 0 ? '· ' : ''}${role}${roleIndex < project.roles.length - 1 ? '\u00A0' : ''}`
    })
    rolesRef.current.push(sentence)
  })

  return (
    <div id='project-cards-cards'>
      {projectsData.map((project, index) => {
        return (
          <ProjectCard
            key={`project-cards-card-${index}`}
            index={index}
            project={project}
            roles={rolesRef.current[index]}
          />
        )
      })}
    </div>
  )
}
