import { findSelfProducingProgram, runProgram } from './17'

const testInput = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`

const testInput2 = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`
describe('day17Part01', () => {
  it('should ', () => {
    expect(runProgram(testInput)).toEqual('4,6,3,5,6,3,5,2,1,0')
  })
})

describe('day17Part02', () => {
  it('should', () => {
    expect(findSelfProducingProgram(testInput2)).toEqual(117440)
  })
})
