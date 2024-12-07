import { parseInput, recursivelyCheckNumbers } from './7'

const testInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`

describe('day7Part01', () => {
  it('should correctly parse input', () => {
    expect(parseInput(testInput)[0]).toEqual([190, [10, 19]])
    expect(parseInput(testInput)[1]).toEqual([3267, [81, 40, 27]])
  })

  it('should find valid combinations using * and + operators', () => {
    const [testValue, numbers] = parseInput(testInput)[0]
    expect(recursivelyCheckNumbers(testValue, numbers)).toEqual(true)

    const [testValue2, numbers2] = parseInput(testInput)[1]
    expect(recursivelyCheckNumbers(testValue2, numbers2)).toEqual(true)
  })

  it('should return false when no valid combinations exist', () => {
    const [testValue, numbers] = parseInput(testInput)[2]
    expect(recursivelyCheckNumbers(testValue, numbers)).toEqual(false)

    const [testValue2, numbers2] = parseInput(testInput)[5]
    expect(recursivelyCheckNumbers(testValue2, numbers2)).toEqual(false)
  })
})

describe('day7Part02', () => {
  it('should return false when no valid combinations exist with all operators', () => {
    const [testValue, numbers] = parseInput(testInput)[2]
    expect(
      recursivelyCheckNumbers(testValue, numbers, ['+', '*', '||']),
    ).toEqual(false)
  })

  it('should find valid combinations using all operators', () => {
    const [testValue, numbers] = parseInput(testInput)[3]
    expect(
      recursivelyCheckNumbers(testValue, numbers, ['+', '*', '||']),
    ).toEqual(true)

    const [testValue2, numbers2] = parseInput(testInput)[8]
    expect(
      recursivelyCheckNumbers(testValue2, numbers2, ['+', '*', '||']),
    ).toEqual(true)
  })

  it('should handle edge cases', () => {
    expect(recursivelyCheckNumbers(10, [10], ['+', '*', '||'])).toEqual(true)
    expect(recursivelyCheckNumbers(20, [10], ['+', '*', '||'])).toEqual(false)
  })
})
