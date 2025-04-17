import React from 'react'

import ProjectCardCanvas from '@/components/three/canvas/project_card_canvas/ProjectCardCanvas'

import './index.scss'

export default function ProjectCard({ index }: { index: number }) {
  return <ProjectCardCanvas index={index} />
}
