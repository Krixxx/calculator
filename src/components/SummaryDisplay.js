import React from "react"
import styled from "styled-components"

//redux
import { useSelector } from "react-redux"

import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"

import parseISO from "date-fns/parseISO"
import format from "date-fns/format"

const SummaryDisplay = ({ formattedLoanDuration }) => {
  const {
    loanType,
    loanAmount,
    interestRate,
    startDate: start,
    endDate: end,
    calculatedTotalInterestAmount: totalInterest,
    interestsByYear,
    totalAmount,
  } = useSelector((state) => state.loan)

  const startDate = parseISO(start)
  const endDate = parseISO(end)

  const formatDate = (inputDate) => {
    return format(inputDate, "dd MMMM yyyy")
  }

  const formatToCurrency = (number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(number)
  }

  return (
    <Wrapper>
      <FormControl>
        <FormLabel>Summary</FormLabel>
        <p>
          Loan type: <span>{loanType}</span>
        </p>
        <p>
          Loan amount:{" "}
          <span>{loanAmount && `${formatToCurrency(loanAmount)}`}</span>
        </p>
        <p>
          Interest rate: <span>{interestRate && `${interestRate} %`}</span>
        </p>
        <p>
          From: <span>{startDate && formatDate(startDate)}</span>
        </p>
        <p>
          To: <span>{endDate && formatDate(endDate)}</span>
        </p>
        <p>
          Duration: <span>{formattedLoanDuration}</span>
        </p>
        <p>
          Interest amount: <span>{formatToCurrency(totalInterest)}</span>
        </p>
        <hr />
        {interestsByYear.map((year, index) => {
          return (
            <p key={index}>
              {year.year} : <span>{formatToCurrency(year.amount)}</span>
            </p>
          )
        })}
        <h3>TOTAL: {formatToCurrency(totalAmount)}</h3>
      </FormControl>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: white;
  p {
    text-align: left;
    margin: 0.25rem;
  }
  span {
    font-weight: bold;
  }
`

export default SummaryDisplay
