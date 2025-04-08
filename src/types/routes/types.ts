import { ReactNode } from 'react'

export interface IRootLayout {
  children: ReactNode
}

export interface IRouteData {
  index?: number
  translationKey: string
  path: string
}
