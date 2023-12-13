import {
  getHorizontalReflectionLine,
  getSetsFromInput,
  getSumOfInputReflections,
  getVerticalReflectionLine,
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

describe('day13Part01', () => {
  it('should return the correct sets from input', () => {
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

  it('should return the correct horizontal reflection line', () => {
    expect(getHorizontalReflectionLine(getSetsFromInput(testInput)[1])).toEqual(
      400,
    )
    expect(getHorizontalReflectionLine(getSetsFromInput(testInput)[0])).toEqual(
      0,
    )
  })

  it('should return the correct vertical reflection line', () => {
    expect(getVerticalReflectionLine(getSetsFromInput(testInput)[0])).toEqual(5)
    expect(getVerticalReflectionLine(getSetsFromInput(testInput)[1])).toEqual(0)
  })

  it('should return the correct result for our testinput', () => {
    expect(getSumOfInputReflections(testInput)).toEqual(405)
  })
})

describe('day13Part02', () => {
  it('should return the correct result', () => {
    // Add your test case here
  })
})
