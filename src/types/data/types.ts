export interface IMetroLineData {
  id: number
  d: string
  color: string
}

export interface IProjectData {
  key: string
  url: string
  name: string
  imageUrl: string
  descriptionsKey: string
  dates: {
    [key: string]: string
  }
  roles: string[]
}
