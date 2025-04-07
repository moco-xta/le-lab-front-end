export type TAppState = {
  menu: {
    isOpen: boolean
    contentPosition: {
      top: number | null
      right: number | null
    }
  }
  localeSwitcher: {
    isOpen: boolean
    contentDimensions: {
      width: number | null
    }
    contentPosition: {
      top: number | null
      left: number | null
    }
  }
}