import React from 'react'

import { IProjectData } from '@/types/data/types'

import ProjectCardCanvas from '@/components/three/canvas/project_card_canvas/ProjectCardCanvas'
import ProjectCardRoles from './roles'
import ProjectCardName from './name'

import './index.scss'

export default function ProjectCard({
  index,
  project,
  roles,
}: {
  index: number
  project: IProjectData
  roles: string
}) {
  /* return (
    <a
      id={`project-card-${index}`}
      className='project-card'
    >
      <ProjectCardCanvas
        index={index}
        textureUrl={project.imageUrl}
      />
      <div
        className={`project-card-info ${!isSmallScreen ? (!isOdd(index) ? 'project-card-info-left' : 'project-card-info-right') : 'project-card-small-screen'}`}
      >
        <ProjectCardRoles
          index={index}
          roles={roles}
        />
        <ProjectCardName
          index={index}
          name={project.name}
        />
      </div>
    </a>
  ) */

  return (
    <div
      id={`project-card-${index}`}
      className='project-card'
    >
      {/* <div id={`project-card-canvas-${index}`} className='project-card-canvas'></div> */}
      <ProjectCardCanvas
        index={index}
        textureUrl={project.imageUrl}
      />
      <ProjectCardRoles
        index={index}
        roles={roles}
      />
      <ProjectCardName
        index={index}
        name={project.name}
      />

      {/* {Array(16 * 1).fill(null).map((_, i) => (
        <div key={`project-card-${index}-cell-${i}`} className='project-card-cell'></div>
      ))} */}
    </div>
  )
}
