import { configureStore } from '@reduxjs/toolkit'
import rangeFormReducer from '../redux/Range.reducer'

export const store = configureStore({
  reducer: {
    rangeForm: rangeFormReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch