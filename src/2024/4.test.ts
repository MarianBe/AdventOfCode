import { to2DimensionalArray } from '@helpers'
import {
  getNextCharacterInDirection,
  countXMASOccurrences,
  countX_MASOccurences,
} from './4'

const testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`
const noXMASInput = `MMMMMMMMMM
MMMMMMMMMM
MMMMMMMMMM
MMMMMMMMMM
MMMMMMMMMM`
describe('day4Part01', () => {
  it('should parse the input to a 2-Dimensional character array', () => {
    expect(to2DimensionalArray(testInput)[0]).toEqual([
      'M',
      'M',
      'M',
      'S',
      'X',
      'X',
      'M',
      'A',
      'S',
      'M',
    ])
  })
  it('should correctly get the characters we need', () => {
    const wordSearch = to2DimensionalArray(testInput)
    expect(getNextCharacterInDirection(wordSearch, [2, 5], 'tl', 0)).toEqual(
      'M',
    )
    expect(getNextCharacterInDirection(wordSearch, [2, 5], 'tl', 1)).toEqual(
      'X',
    )
    expect(getNextCharacterInDirection(wordSearch, [2, 5], 'tl', 2)).toEqual(
      'S',
    )
    expect(getNextCharacterInDirection(wordSearch, [2, 5], 'tl', 3)).toEqual(
      undefined,
    )
    expect(getNextCharacterInDirection(wordSearch, [2, 5], 'l', 1)).toEqual('X')
    expect(getNextCharacterInDirection(wordSearch, [2, 5], 'r', 1)).toEqual('A')
    expect(getNextCharacterInDirection(wordSearch, [2, 5], 'b', 1)).toEqual('S')
  })
  it('should be able to count all XMAS in our testInput', () => {
    expect(countXMASOccurrences(testInput)).toEqual(18)
  })
  it('should return 0 if no XMAS is found', () => {
    expect(countXMASOccurrences(noXMASInput)).toEqual(0)
  })
})

describe('day4Part02', () => {
  it('should be able to count all X-MAS in our testInput', () => {
    expect(countX_MASOccurences(testInput)).toEqual(9)
  })
  it('should return 0 if no X-MAS is found', () => {
    expect(countX_MASOccurences(noXMASInput)).toEqual(0)
  })
})
