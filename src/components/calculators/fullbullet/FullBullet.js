import React, { useEffect, useState } from "react"
import styled from "styled-components"

//redux
import { useSelector, useDispatch } from "react-redux"
import {
  setLoanAmount,
  setInterestRate,
  setStartDate,
  setEndDate,
  setDaysPerYear,
} from "../../../slices/loanSlice"

import parseISO from "date-fns/parseISO"
import isAfter from "date-fns/isAfter"

import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import MobileDatePicker from "@mui/lab/MobileDatePicker"

import enGBLocale from "date-fns/locale/en-GB"

const localeMap = {
  enGB: enGBLocale,
}

const maskMap = {
  enGB: "__/__/____",
}

const FullBullet = ({ handleClick }) => {
  //using redux
  const {
    loanAmount,
    interestRate,
    daysPerYear,
    startDate: start,
    endDate: end,
  } = useSelector((state) => state.loan)

  const startDate = parseISO(start)
  const endDate = parseISO(end)

  const dispatch = useDispatch()

  const [validSelection, setValidSelection] = useState(true) //is loan start date before end date?

  const isEndDateValid = (startDate, endDate) => {
    let valid = isAfter(endDate, startDate)
    return valid
  }

  useEffect(() => {
    if (startDate !== null && endDate !== null) {
      setValidSelection(isEndDateValid(startDate, endDate))
    }
  }, [startDate, endDate])

  return (
    <Wrapper>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        locale={localeMap["fr"]}
      >
        <Grid container spacing={1}>
          <Grid item md={4}>
            <TextField
              value={loanAmount}
              onChange={(e) => dispatch(setLoanAmount(e.target.value))}
              label="Loan amount €"
              type="number"
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              value={interestRate}
              onChange={(e) => dispatch(setInterestRate(e.target.value))}
              label="Interest rate %"
              type="number"
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              value={daysPerYear}
              onChange={(e) => dispatch(setDaysPerYear(e.target.value))}
              label="Days per year"
              type="number"
            />
          </Grid>
          <Grid item md={6}>
            <MobileDatePicker
              label="Loan start date"
              value={startDate}
              mask={maskMap["fr"]}
              onChange={(newValue) => {
                dispatch(setStartDate(newValue.toISOString()))
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item md={6}>
            <MobileDatePicker
              label="Loan end date"
              value={endDate}
              className={!validSelection ? "error" : ""}
              onChange={(newValue) => {
                dispatch(setEndDate(newValue.toISOString()))
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={!validSelection ? "Date cannot be earlier!" : ""}
                />
              )}
            />
          </Grid>
          <Grid item md={12}>
            <Button variant="contained" onClick={() => handleClick()}>
              Calculate
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 1rem;
  background-color: white;
  padding: 1rem;
  .error {
    border-color: red;
  }
`

export default FullBullet
