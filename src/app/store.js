import { configureStore } from "@reduxjs/toolkit"

import loanReducer from "../slices/loanSlice"

export const store = configureStore({
  reducer: {
    loan: loanReducer,
  },
})
