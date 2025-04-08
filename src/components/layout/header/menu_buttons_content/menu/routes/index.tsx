import React from 'react'

import Route from './route'

import { routesData } from '@/routes/routes'

import './index.scss'

export default function Routes() {
  return (
    <div id='routes'>
      {routesData
        .filter((route) => route.hasOwnProperty('index'))
        .sort((a, b) => a.index! - b.index!)
        .map((route) => (
          <Route
            key={`route_${route.translationKey}`}
            route={route}
          />
        ))}
    </div>
  )
}
