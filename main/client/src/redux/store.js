import { configureStore } from '@reduxjs/toolkit'
import grantSlice from './features/grant/grantSlice'

export const store = configureStore({
    reducer:{
        grant: grantSlice,
    },
})