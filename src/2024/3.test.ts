import {
  getMultiplicationResult,
  retrievePatterns,
  computeInstructionsResult,
  computeConditionalInstructionsResult,
} from './3'

const testInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`
const testInput2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`
describe('day3Part01', () => {
  it('should retrieve the mul-patterns from our testInput', () => {
    expect(retrievePatterns(testInput)).toEqual([
      'mul(2,4)',
      'mul(5,5)',
      'mul(11,8)',
      'mul(8,5)',
    ])
  })
  it('Should get the multiplication result of a mul-string', () => {
    expect(getMultiplicationResult('mul(2,4)')).toEqual(8)
    expect(getMultiplicationResult('mul(123,2)')).toEqual(246)
  })
  it('Should get the final sum for our testInput', () => {
    expect(computeInstructionsResult(testInput)).toEqual(161)
  })
})

describe('day3Part02', () => {
  it('should retrieve the patterns with conditioncals from our testInput', () => {
    expect(retrievePatterns(testInput2, true)).toEqual([
      'mul(2,4)',
      "don't()",
      'mul(5,5)',
      'mul(11,8)',
      'do()',
      'mul(8,5)',
    ])
  })
  it('Should get the final sum for our testInput2 with conditionals', () => {
    expect(computeConditionalInstructionsResult(testInput2)).toEqual(48)
  })
})
