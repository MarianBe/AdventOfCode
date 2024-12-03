import {
  splitInputToReports,
  checkKeepsDecreasingOrIncreasing,
  checkIfInDistance,
  checkIfReportIsValid,
} from './2'

const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

describe('day2Part01', () => {
  it('should split our input into reports', () => {
    expect(splitInputToReports(testInput)[0]).toEqual([7, 6, 4, 2, 1])
  })
  it('should correctly check for increasing or decreasing', () => {
    expect(checkKeepsDecreasingOrIncreasing(4, 6, 'inc')).toEqual('inc')
    expect(checkKeepsDecreasingOrIncreasing(4, 6, 'dec')).toEqual(false)
    expect(checkKeepsDecreasingOrIncreasing(6, 6)).toEqual(false)
    expect(checkKeepsDecreasingOrIncreasing(4, 6, 'dec')).toEqual(false)
    expect(checkKeepsDecreasingOrIncreasing(8, 6, 'dec')).toEqual('dec')
    expect(checkKeepsDecreasingOrIncreasing(4, 6)).toEqual('inc')
    expect(checkKeepsDecreasingOrIncreasing(6, 4)).toEqual('dec')
    expect(checkKeepsDecreasingOrIncreasing(undefined, 6)).toEqual(undefined)
  })
  it('should correctly check if the changes are in the correct distance', () => {
    expect(checkIfInDistance(4, 6, 1, 3)).toEqual(true)
    expect(checkIfInDistance(4, 7, 1, 3)).toEqual(true)
    expect(checkIfInDistance(8, 4, 1, 3)).toEqual(false)
    expect(checkIfInDistance(8, 5, 1, 3)).toEqual(true)
  })
  it('should check if our reports are correct', () => {
    const reports = splitInputToReports(testInput)
    expect(checkIfReportIsValid(reports[0])).toEqual(true)
    expect(checkIfReportIsValid(reports[1])).toEqual(false)
    expect(checkIfReportIsValid(reports[2])).toEqual(false)
    expect(checkIfReportIsValid(reports[3])).toEqual(false)
    expect(checkIfReportIsValid(reports[4])).toEqual(false)
    expect(checkIfReportIsValid(reports[5])).toEqual(true)
  })
})

describe('day2Part02', () => {
  it('should check if our reports are correct while allowing one error', () => {
    const reports = splitInputToReports(testInput)
    expect(checkIfReportIsValid(reports[0], true)).toEqual(true)
    expect(checkIfReportIsValid(reports[1], true)).toEqual(false)
    expect(checkIfReportIsValid(reports[2], true)).toEqual(false)
    expect(checkIfReportIsValid(reports[3], true)).toEqual(true)
    expect(checkIfReportIsValid(reports[4], true)).toEqual(true)
    expect(checkIfReportIsValid(reports[5], true)).toEqual(true)
  })
})
