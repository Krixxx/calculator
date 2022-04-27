import { useEffect, useState } from "react"
import styled from "styled-components"

//redux
import { useSelector, useDispatch } from "react-redux"
import {
  calculateTotalAmount,
  setCalculatedTotalInterestAmount,
  setInterestsByYear,
  setLoanYears,
} from "./slices/loanSlice"

//helper functions
import {
  calculateInterestPerYear,
  daysInYear,
  getDaysBetweenPeriod,
} from "./helpers.ts"

import { InputContainer, LoanSelector, SummaryDisplay } from "./components"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"

import getYear from "date-fns/getYear"
import parseISO from "date-fns/parseISO"
import intervalToDuration from "date-fns/intervalToDuration"
import formatDuration from "date-fns/formatDuration"

function App() {
  const dispatch = useDispatch()

  const {
    loanType,
    startDate: start,
    endDate: end,
    loanAmount,
    interestRate,
    daysPerYear,
  } = useSelector((state) => state.loan)

  const startDate = parseISO(start)
  const endDate = parseISO(end)

  const [formattedLoanDuration, setFormattedLoanDuration] = useState("") //loan duration in yyyy, mmmm, dd
  const [interests, setInterests] = useState([]) // total interests

  //calculate the amount of interest by takin in daily interest amount and number of days
  const currentYearInterest = (dailyInterest, daysUntileEndOfYear) => {
    const amount = dailyInterest * daysUntileEndOfYear
    return amount
  }

  //put all loan years into one array
  const loanYears = []
  for (let i = getYear(startDate); i < getYear(endDate) + 1; i++) {
    loanYears.push(i)
  }

  const calculateInterestAmouts = (
    loanAmount,
    interestRate,
    startDate,
    endDate,
    yearsArray
  ) => {
    let interestsList = []
    setInterests(0)

    const interestAmount = calculateInterestPerYear(loanAmount, interestRate)

    const interestPerDay = interestAmount / daysPerYear

    if (yearsArray.length === 1) {
      const amountOfDays = getDaysBetweenPeriod(startDate, endDate)

      let interestAmount = currentYearInterest(interestPerDay, amountOfDays)

      interestsList.push({ year: yearsArray[0], amount: interestAmount })

      setInterests(interestAmount)
    }

    if (yearsArray.length > 1) {
      for (let i = 0; i < yearsArray.length; i++) {
        if (i === 0) {
          //first year
          const amountOfDays = getDaysBetweenPeriod(
            startDate,
            new Date(yearsArray[i], 11, 31)
          )

          let interestAmount = currentYearInterest(interestPerDay, amountOfDays)

          interestsList.push({ year: yearsArray[i], amount: interestAmount })

          setInterests((amount) => amount + interestAmount)
        } else if (i === yearsArray.length - 1) {
          //last year
          const amountOfDays = getDaysBetweenPeriod(
            new Date([yearsArray[i], 1, 1]),
            endDate
          )

          let interestAmount = currentYearInterest(interestPerDay, amountOfDays)

          interestsList.push({ year: yearsArray[i], amount: interestAmount })
          setInterests((amount) => amount + interestAmount)
        } else {
          //years between
          let interestAmount = currentYearInterest(interestPerDay, daysPerYear)

          interestsList.push({ year: yearsArray[i], amount: interestAmount })
          setInterests((amount) => amount + interestAmount)
        }
      }
    }
    return interestsList
  }

  const handleClick = () => {
    dispatch(
      setInterestsByYear(
        calculateInterestAmouts(
          loanAmount,
          interestRate,
          startDate,
          endDate,
          loanYears
        )
      )
    )
  }

  //calculate loan duration, to display it in summary
  useEffect(() => {
    if (startDate !== null && endDate !== null) {
      const interval = formatDuration(
        intervalToDuration({ start: startDate, end: endDate }),
        { format: ["years", "months", "days"] }
      )
      setFormattedLoanDuration(interval)
    }
  }, [startDate, endDate])

  //
  useEffect(() => {
    if (
      loanAmount !== null &&
      interestRate !== null &&
      (startDate !== null || startDate !== "") &&
      (endDate !== null || endDate !== "")
    ) {
      if (loanType === "full-bullet") {
        dispatch(setCalculatedTotalInterestAmount(interests))
        dispatch(calculateTotalAmount())
      } else if (loanType === "bullet") {
        dispatch(setCalculatedTotalInterestAmount(0))
        dispatch(calculateTotalAmount())
      } else {
        dispatch(setCalculatedTotalInterestAmount(0))
        dispatch(calculateTotalAmount())
      }
    }
  }, [dispatch, loanType, loanAmount, interestRate, startDate, endDate])

  return (
    <Wrapper>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <LoanSelector />
            <InputContainer handleClick={handleClick} />
          </Grid>
          <Grid item xs={12} md={3}>
            <SummaryDisplay
              formattedLoanDuration={formattedLoanDuration}
              interests={interests}
            />
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  text-align: center;
  margin-top: 1rem;
`

export default App
