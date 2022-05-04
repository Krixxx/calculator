import { createSlice } from "@reduxjs/toolkit"
import { LoanTypes } from "../enums.ts"

const initialState = {
  loanType: LoanTypes.FullBullet,
}

export const loanSelectorSlice = createSlice({
  name: "type",
  initialState,
  reducers: {
    setLoanType: (state, action) => {
      state.loanType = action.payload
    },
  },
})

export const { setLoanType } = loanSelectorSlice.actions

export default loanSelectorSlice.reducer
