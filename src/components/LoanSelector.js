import React from "react"
import styled from "styled-components"

//redux
import { useSelector, useDispatch } from "react-redux"
import { setLoanType } from "../slices/loanSlice"

import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import FormControlLabel from "@mui/material/FormControlLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"

const LoanSelector = () => {
  const dispatch = useDispatch()
  const loanType = useSelector((state) => state.loan.loanType)
  return (
    <Wrapper>
      <FormControl>
        <FormLabel>Select loan type</FormLabel>
        <RadioGroup
          row
          name="loan-type-selector"
          defaultValue="bullet"
          value={loanType}
          onChange={(e) => dispatch(setLoanType(e.target.value))}
        >
          <FormControlLabel
            value="bullet"
            control={<Radio />}
            label="Bullet loan"
          />
          <FormControlLabel
            value="full-bullet"
            control={<Radio />}
            label="Full-Bullet loan"
          />
          <FormControlLabel
            value="balloon"
            control={<Radio />}
            label="Balloon loan"
          />
        </RadioGroup>
      </FormControl>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  background-color: white;
`

export default LoanSelector
