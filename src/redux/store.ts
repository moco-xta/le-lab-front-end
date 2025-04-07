import { configureStore } from '@reduxjs/toolkit'

import appStateSlice from './slices/appStateSlice'

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
