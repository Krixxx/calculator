//redux
import { useSelector } from "react-redux"

import { LoanTypes } from "../enums.ts"

import { FullBullet } from "../components"

const InputContainer = ({ handleClick }) => {
  //using redux
  const { loanType } = useSelector((state) => state.type)

  switch (loanType) {
    case LoanTypes.Balloon:
      return <h1>Baloon Loan Type</h1>
    case LoanTypes.Bullet:
      return <h1>Bullet Loan Type</h1>
    case LoanTypes.FullBullet:
      return <FullBullet handleClick={handleClick} />
    default:
      break
  }
}

export default InputContainer
