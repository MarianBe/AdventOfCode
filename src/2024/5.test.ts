import {
  parseInput,
  isUpdateValid,
  getPageNumbersFromInput,
  makeUpdateValid,
  getInvalidPageNumbersFromInput,
} from './5'

const testInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`

describe('day5Part01', () => {
  it('should parse input correctly', () => {
    expect(parseInput(testInput)[0].has('47|53')).toBeTruthy()
    expect(parseInput(testInput)[1][0]).toEqual([75, 47, 61, 53, 29])
  })
  it('should validate updates correctly', () => {
    const [rules, updates] = parseInput(testInput)
    expect(isUpdateValid(rules, updates[0])).toBeTruthy()
    expect(isUpdateValid(rules, updates[1])).toBeTruthy()
    expect(isUpdateValid(rules, updates[2])).toBeTruthy()
    expect(isUpdateValid(rules, updates[3])).toBeFalsy()
    expect(isUpdateValid(rules, updates[4])).toBeFalsy()
    expect(isUpdateValid(rules, updates[5])).toBeFalsy()
  })
  it('should get page numbers from input correctly', () => {
    expect(getPageNumbersFromInput(testInput)).toEqual(143)
  })
})

describe('day5Part02', () => {
  it('should make update valid correctly', () => {
    const [rules, updates] = parseInput(testInput)
    expect(makeUpdateValid(rules, updates[3])).toEqual([97, 75, 47, 61, 53])
  })
  it('should get invalid page numbers from input correctly', () => {
    expect(getInvalidPageNumbersFromInput(testInput)).toEqual(123)
  })
})
