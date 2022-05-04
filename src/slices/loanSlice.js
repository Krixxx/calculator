import { createSlice } from "@reduxjs/toolkit"
import getYear from "date-fns/getYear"
import parseISO from "date-fns/parseISO"

let today = new Date()
let tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)

today = today.toISOString()
tomorrow = tomorrow.toISOString()

const initialState = {
  loanAmount: "",
  interestRate: "",
  daysPerYear: 365,
  startDate: today,
  endDate: tomorrow,
  interestsByYear: [],
  calculatedTotalInterestAmount: "",
  totalAmount: "",
  loanYears: [],
}

export const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    setLoanAmount: (state, action) => {
      state.loanAmount = action.payload
    },
    setDaysPerYear: (state, action) => {
      state.daysPerYear = Number(action.payload)
    },
    setInterestRate: (state, action) => {
      state.interestRate = action.payload
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload
    },
    setInterestsByYear: (state, action) => {
      state.interestsByYear = []

      state.interestsByYear = action.payload
    },
    setCalculatedTotalInterestAmount: (state, action) => {
      state.calculatedTotalInterestAmount = action.payload
    },
    setLoanYears: (state, action) => {
      state.loanYears = []

      for (
        let i = getYear(parseISO(state.startDate));
        i < getYear(parseISO(state.endDate)) + 1;
        i++
      ) {
        console.log(i)
        state.loanYears.push(i)
      }
    },
    calculateTotalAmount: (state) => {
      state.totalAmount =
        Number(state.loanAmount) + Number(state.calculatedTotalInterestAmount)
    },
  },
})

export const {
  setLoanAmount,
  setInterestRate,
  setDaysPerYear,
  setStartDate,
  setEndDate,
  setInterestsByYear,
  setCalculatedTotalInterestAmount,
  setLoanYears,
  calculateTotalAmount,
} = loanSlice.actions

export default loanSlice.reducer
