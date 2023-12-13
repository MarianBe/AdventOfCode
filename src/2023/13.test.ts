import { readFileSync } from 'fs'
import {
  getSetsFromInput,
  getHorizontalReflectionLine,
  getVerticalReflectionLine,
  getSumOfInputReflections,
  getHorizontalReflectionLineWithSmudge,
  getVerticalReflectionLineWithSmudge,
  getSumOfInputReflectionsWithSmudges,
} from './13'

const testInput = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`

const testSets = getSetsFromInput(
  readFileSync('src/2023/inputs/13.txt', 'utf8'),
)
describe('getSetsFromInput', () => {
  it('should return an array of sets from input', () => {
    const expectedSets = [
      `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.`,
      `#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`,
    ]
    expect(getSetsFromInput(testInput)).toEqual(expectedSets)
  })
})

describe('getHorizontalReflectionLine', () => {
  it('should return the correct horizontal reflection line', () => {
    expect(getHorizontalReflectionLine(getSetsFromInput(testInput)[0])).toEqual(
      0,
    )
    expect(getHorizontalReflectionLine(getSetsFromInput(testInput)[1])).toEqual(
      400,
    )
  })
})

describe('getVerticalReflectionLine', () => {
  it('should return the correct vertical reflection line', () => {
    expect(getVerticalReflectionLine(getSetsFromInput(testInput)[0])).toEqual(5)
    expect(getVerticalReflectionLine(getSetsFromInput(testInput)[1])).toEqual(0)
  })
})

describe('getSumOfInputReflections', () => {
  it('should return the correct sum of input reflections', () => {
    expect(getSumOfInputReflections(testInput)).toEqual(405)
  })
})

describe('getHorizontalReflectionLineWithSmudge', () => {
  it('should return the correct horizontal reflection line with smudge', () => {
    expect(
      getHorizontalReflectionLineWithSmudge(getSetsFromInput(testInput)[0]),
    ).toEqual(300)
    expect(
      getHorizontalReflectionLineWithSmudge(getSetsFromInput(testInput)[1]),
    ).toEqual(100)
    expect(getHorizontalReflectionLineWithSmudge(testSets[0])).toEqual(0)
    expect(getHorizontalReflectionLineWithSmudge(testSets[1])).toEqual(300)
    expect(getHorizontalReflectionLineWithSmudge(testSets[2])).toEqual(100)
    expect(getHorizontalReflectionLineWithSmudge(testSets[3])).toEqual(0)
    expect(getHorizontalReflectionLineWithSmudge(testSets[4])).toEqual(200)
    expect(getHorizontalReflectionLineWithSmudge(testSets[5])).toEqual(0)
    expect(getHorizontalReflectionLineWithSmudge(testSets[6])).toEqual(0)
    expect(getHorizontalReflectionLineWithSmudge(testSets[7])).toEqual(0)
    expect(getHorizontalReflectionLineWithSmudge(testSets[8])).toEqual(1000)
    expect(getHorizontalReflectionLineWithSmudge(testSets[9])).toEqual(700)
    expect(getHorizontalReflectionLineWithSmudge(testSets[10])).toEqual(200)
    expect(getHorizontalReflectionLineWithSmudge(testSets[11])).toEqual(0)
    expect(getHorizontalReflectionLineWithSmudge(testSets[12])).toEqual(0)
    expect(getHorizontalReflectionLineWithSmudge(testSets[13])).toEqual(0)
    expect(getHorizontalReflectionLineWithSmudge(testSets[65])).toEqual(700)
    expect(getHorizontalReflectionLineWithSmudge(testSets[82])).toEqual(300)
    expect(getHorizontalReflectionLineWithSmudge(testSets[86])).toEqual(0)
  })
})

describe('getVerticalReflectionLineWithSmudge', () => {
  it('should return the correct vertical reflection line with smudge', () => {
    expect(
      getVerticalReflectionLineWithSmudge(getSetsFromInput(testInput)[0]),
    ).toEqual(0)
    expect(
      getVerticalReflectionLineWithSmudge(getSetsFromInput(testInput)[1]),
    ).toEqual(0)
    expect(getVerticalReflectionLineWithSmudge(testSets[0])).toEqual(8)
    expect(getVerticalReflectionLineWithSmudge(testSets[1])).toEqual(0)
    expect(getVerticalReflectionLineWithSmudge(testSets[2])).toEqual(0)
    expect(getVerticalReflectionLineWithSmudge(testSets[3])).toEqual(5)
    expect(getVerticalReflectionLineWithSmudge(testSets[4])).toEqual(0)
    expect(getVerticalReflectionLineWithSmudge(testSets[5])).toEqual(1)
    expect(getVerticalReflectionLineWithSmudge(testSets[6])).toEqual(12)
    expect(getVerticalReflectionLineWithSmudge(testSets[7])).toEqual(8)
    expect(getVerticalReflectionLineWithSmudge(testSets[8])).toEqual(0)
    expect(getVerticalReflectionLineWithSmudge(testSets[9])).toEqual(0)
    expect(getVerticalReflectionLineWithSmudge(testSets[10])).toEqual(0)
    expect(getVerticalReflectionLineWithSmudge(testSets[11])).toEqual(6)
    expect(getVerticalReflectionLineWithSmudge(testSets[12])).toEqual(7)
    expect(getVerticalReflectionLineWithSmudge(testSets[13])).toEqual(5)
    expect(getVerticalReflectionLineWithSmudge(testSets[65])).toEqual(0)
    expect(getVerticalReflectionLineWithSmudge(testSets[82])).toEqual(0)
    expect(getVerticalReflectionLineWithSmudge(testSets[86])).toEqual(5)
  })
})

describe('getSumOfInputReflectionsWithSmudges', () => {
  it('should return the correct sum of input reflections with smudges', () => {
    expect(getSumOfInputReflectionsWithSmudges(testInput)).toEqual(400)
  })
})
