import {
  getAdjacentNumbers,
  getGearRatioFromInput,
  getNumberFromCoordinates,
  getSumOfNumbersFromInput,
  getSymbolsMap,
} from './3'

const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

const splitLines = testInput.split('\n')
describe('day03Part01', () => {
  it('should extract the symbols to a map', () => {
    expect(
      getSymbolsMap(splitLines, ['*', '#', '+', '$', '/', '@', '%']),
    ).toEqual([
      [3, 1],
      [6, 3],
      [3, 4],
      [5, 5],
      [3, 8],
      [5, 8],
    ])
  })
  it('should return the number from coordinates', () => {
    expect(getNumberFromCoordinates(splitLines, [6, 2])).toEqual({
      start: [6, 2],
      end: [8, 2],
      value: 633,
      length: 3,
    })
    expect(getNumberFromCoordinates(splitLines, [7, 2])).toEqual({
      start: [6, 2],
      end: [8, 2],
      value: 633,
      length: 3,
    })
    expect(getNumberFromCoordinates(splitLines, [8, 2])).toEqual({
      start: [6, 2],
      end: [8, 2],
      value: 633,
      length: 3,
    })
    expect(getNumberFromCoordinates(splitLines, [3, 2])).toEqual({
      start: [2, 2],
      end: [3, 2],
      value: 35,
      length: 2,
    })
    expect(getNumberFromCoordinates(splitLines, [0, 4])).toEqual({
      start: [0, 4],
      end: [2, 4],
      value: 617,
      length: 3,
    })
    expect(getNumberFromCoordinates(splitLines, [6, 7])).toEqual({
      start: [6, 7],
      end: [8, 7],
      value: 755,
      length: 3,
    })
  })

  it('should return all adjacent Numbers from our symbolsMap', () => {
    expect(getAdjacentNumbers(splitLines, [[3, 1]]).sort()).toEqual(
      [
        {
          start: [2, 2],
          end: [3, 2],
          value: 35,
          length: 2,
        },
        {
          start: [0, 0],
          end: [2, 0],
          value: 467,
          length: 3,
        },
      ].sort(),
    )
    expect(getAdjacentNumbers(splitLines, [[5, 8]]).sort()).toEqual(
      [
        {
          start: [5, 9],
          end: [7, 9],
          value: 598,
          length: 3,
        },
        {
          start: [6, 7],
          end: [8, 7],
          value: 755,
          length: 3,
        },
      ].sort(),
    )
  })
  it('should return the sum of all adjacent Numbers from our symbolsMap', () => {
    expect(getSumOfNumbersFromInput(testInput)).toEqual(4361)
  })
})

describe('day03Part02', () => {
  it('should find all symbols that are gears (*)', () => {
    expect(getSymbolsMap(splitLines, ['*'])).toEqual([
      [3, 1],
      [3, 4],
      [5, 8],
    ])
  })
  it('should return the correct sum for all gear ratios', () => {
    expect(getGearRatioFromInput(testInput)).toEqual(467835)
  })
})
