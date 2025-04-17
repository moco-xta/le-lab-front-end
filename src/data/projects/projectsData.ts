import moment from 'moment'

import type { IProjectData } from '@/types/data/types'

import { default as imgConstants } from '@/constants/assets/imgConstants.json'

export const projectsData: IProjectData[] = [
  {
    key: 'moco_xta',
    name: 'Moco.xta',
    url: 'https://moco-xta.com/en',
    imageUrl: imgConstants.PROJECTS.MOCO_XTA,
    descriptionsKey: 'DESCRIPTIONS.MOCO_XTA',
    dates: {
      to: moment(new Date()).format('YYYY-MM-DD'),
      from: '2024-01-01',
    },
    roles: ['Full-stack', 'Real-time 3D'],
  },
  {
    key: 'abwerkt',
    name: 'ABWerkt.nl',
    url: 'https://www.ab-werkt.nl/',
    imageUrl: imgConstants.PROJECTS.MOCO_XTA,
    descriptionsKey: 'DESCRIPTIONS.ABWERKT',
    dates: {
      to: '2023-11-31',
      from: '2023-03-01',
    },
    roles: ['Front-end'],
  },
  {
    key: 'lento',
    name: 'Lento.eu',
    url: 'https://lento.eu/en',
    imageUrl: imgConstants.PROJECTS.MOCO_XTA,
    descriptionsKey: 'DESCRIPTIONS.LENTO',
    dates: {
      to: '2023-02-28',
      from: '2022-02-01',
    },
    roles: ['Front-end'],
  },
  {
    key: 'hundred_hands',
    name: '100 Hands',
    url: 'https://www.100hands.nl/',
    imageUrl: imgConstants.PROJECTS.MOCO_XTA,
    descriptionsKey: 'DESCRIPTIONS.HUNDRED_HANDS',
    dates: {
      to: '2022-01-30',
      from: '2021-09-01',
    },
    roles: ['Full-stack', 'Real-time 3D'],
  },
  {
    key: 'wpme',
    name: 'WPME',
    url: 'https://wpme.group/',
    imageUrl: imgConstants.PROJECTS.MOCO_XTA,
    descriptionsKey: 'DESCRIPTIONS.WPME',
    dates: {
      to: '2021-08-30',
      from: '2021-03-17',
    },
    roles: ['Full-stack', 'Real-time 3D'],
  },
  {
    key: 'openclassrooms',
    name: 'Openclassrooms',
    url: 'https://openclassrooms.com/en/',
    imageUrl: imgConstants.PROJECTS.MOCO_XTA,
    descriptionsKey: 'DESCRIPTIONS.OPENCLASSROOMS',
    dates: {
      to: '2021-05-17',
      from: '2019-05-01',
    },
    roles: ['Full-stack', 'Real-time 3D'],
  },
]
