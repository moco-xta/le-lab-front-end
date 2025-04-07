import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { TAppState } from '@/types/redux/types'

const initialState: TAppState = {
  menu: {
    isOpen: false,
    contentPosition: {
      top: null,
      right: null,
    },
  },
  localeSwitcher: {
    isOpen: false,
    contentDimensions: {
      width: null,
    },
    contentPosition: {
      top: null,
      left: null,
    },
  },
}

const appStateSlice = createSlice({
  name: 'AppState',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.menu.isOpen = !state.menu.isOpen
    },
    toggleLocaleSwitcher: (state) => {
      state.localeSwitcher.isOpen = !state.localeSwitcher.isOpen
    },
    setMenuContentPosition: (state, action: PayloadAction<{ top: number; right: number }>) => {
      state.menu.contentPosition.top = action.payload.top
      state.menu.contentPosition.right = action.payload.right
    },
    setLocalSwitcherContentPosition: (
      state,
      action: PayloadAction<{ width: number; top: number; left: number }>,
    ) => {
      state.localeSwitcher.contentDimensions.width = action.payload.width
      state.localeSwitcher.contentPosition.top = action.payload.top
      state.localeSwitcher.contentPosition.left = action.payload.left
    },
  },
})

export const {
  toggleMenu,
  toggleLocaleSwitcher,
  setMenuContentPosition,
  setLocalSwitcherContentPosition,
} = appStateSlice.actions

export default appStateSlice.reducer
