import { configureStore } from '@reduxjs/toolkit'

import userSlice from './redux/slice/UserSlice'

export const store = configureStore({
  reducer: {
    user:userSlice
  },
})