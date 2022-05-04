import { configureStore } from "@reduxjs/toolkit"

import loanSelectorSlice from "../slices/loanSelectorSlice"
import loanReducer from "../slices/loanSlice"

export const store = configureStore({
  reducer: {
    loan: loanReducer,
    type: loanSelectorSlice,
  },
})
