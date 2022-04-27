import getDaysInYear from "date-fns/getDaysInYear"
import differenceInCalendarDays from "date-fns/differenceInCalendarDays"

/** Calculate loan interest for a full year
 *
 * @param loanAmount loan amount
 * @param interestRate yearly interest rate
 * @returns total interest amount per year
 */
export const calculateInterestPerYear = (
  loanAmount: number,
  interestRate: number
): number => {
  const yearInterest: number = (loanAmount * interestRate) / 100
  return yearInterest
}

/** get days in a given year (date)
 *
 * @param date date, from where we get the year number
 * @returns number of days in given year
 */
export const daysInYear = (date: Date): number => {
  return getDaysInYear(date)
}

/** get days between start and end date
 *
 * @param startDate start date
 * @param endDate end date
 * @returns number of days between given dates
 */
export const getDaysBetweenPeriod = (
  startDate: Date,
  endDate: Date
): number => {
  if (endDate !== null && startDate !== null) {
    const days: number = differenceInCalendarDays(endDate, startDate)
    //we return days +1, since we calculate all days on, not just difference
    return days + 1
  }
}
