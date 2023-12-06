import {
  getRecordsWinningHoldTimesProduct,
  getWinningHoldTimes,
  parseInput,
  parseInputIgnoringSpaces,
} from './6'

const testInput = `Time:      7  15   30
Distance:  9  40  200`

describe('day06Part01', () => {
  it('should parse the Input correctly', () => {
    expect(parseInput(testInput)).toEqual([
      [7, 9],
      [15, 40],
      [30, 200],
    ])
  })
  it('should get the winning hold times for a record', () => {
    expect(getWinningHoldTimes([7, 9])).toEqual([2, 3, 4, 5])
    expect(getWinningHoldTimes([15, 40])).toEqual([4, 5, 6, 7, 8, 9, 10, 11])
  })
  it('should get the product of the winning hold times for out input', () => {
    expect(getRecordsWinningHoldTimesProduct(parseInput(testInput))).toEqual(
      288,
    )
  })
})
describe('day06Part02', () => {
  it('should parseInput ignoring the spaces', () => {
    expect(parseInputIgnoringSpaces(testInput)).toEqual([[71530, 940200]])
  })
  it('should get the winning hold times for our input ignoring spaces', () => {
    expect(
      getRecordsWinningHoldTimesProduct(parseInputIgnoringSpaces(testInput)),
    ).toEqual(71503)
  })
})
