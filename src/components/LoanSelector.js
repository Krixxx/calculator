import React from "react"
import styled from "styled-components"

//redux
import { useSelector, useDispatch } from "react-redux"
import { setLoanType } from "../slices/loanSelectorSlice"

import { LoanTypes } from "../enums.ts"

import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import FormControlLabel from "@mui/material/FormControlLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"

const LoanSelector = () => {
  const dispatch = useDispatch()
  const loanType = useSelector((state) => state.type.loanType)

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
            value={LoanTypes.Bullet}
            control={<Radio />}
            label="Bullet loan"
          />
          <FormControlLabel
            value={LoanTypes.FullBullet}
            control={<Radio />}
            label="Full-Bullet loan"
          />
          <FormControlLabel
            value={LoanTypes.Balloon}
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
