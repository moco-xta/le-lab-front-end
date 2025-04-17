import React from 'react'

import { IProjectData } from '@/types/data/types'

import ProjectCardCanvas from '@/components/three/canvas/project_card_canvas/ProjectCardCanvas'


import './index.scss'

export default function ProjectCard({ index, project }: { index: number, project: IProjectData }) {
  return <ProjectCardCanvas index={index} textureUrl={project.imageUrl} />
}
