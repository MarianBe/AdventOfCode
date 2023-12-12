import checkArrangement from './12.worker'
import {
  getPossibleArrangements,
  isArrangementStillPossible,
  getMultipliedLine,
} from './12.worker'

const testInput = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`
const lines = testInput.split('\n')
describe('day12Part01', () => {
  it('should get the number of possible arrangements', () => {
    expect(getPossibleArrangements('#.#.###', ['#', '#', '###'])).toEqual(1)
    expect(checkArrangement({ line: lines[0] })).toEqual(1)

    expect(checkArrangement({ line: lines[1] })).toEqual(4)
    expect(checkArrangement({ line: lines[2] })).toEqual(1)
    expect(checkArrangement({ line: lines[3] })).toEqual(1)
    expect(checkArrangement({ line: lines[4] })).toEqual(4)
    expect(checkArrangement({ line: lines[5] })).toEqual(10)
  })
  it("should check if an arrangement is still possible, if it's not, it should return false", () => {
    expect(isArrangementStillPossible('#.#.?##', ['#', '#', '###'])).toEqual([
      true,
      '?##',
      ['###'],
    ])
  })
})

describe('day12Part02', () => {
  it('should multiply the lines correctly', () => {
    expect(getMultipliedLine(lines[0])).toEqual(
      '???.###????.###????.###????.###????.### 1,1,3,1,1,3,1,1,3,1,1,3,1,1,3',
    )
  })
  it('should get the number of possible arrangements for the multiplied lines', () => {
    expect(checkArrangement({ line: lines[0], multiplicator: 2 })).toEqual(1)
    expect(checkArrangement({ line: lines[1], multiplicator: 2 })).toEqual(32)
    expect(checkArrangement({ line: lines[2], multiplicator: 2 })).toEqual(1)
    expect(checkArrangement({ line: lines[3], multiplicator: 2 })).toEqual(2)
    expect(checkArrangement({ line: lines[4], multiplicator: 2 })).toEqual(20)
    expect(checkArrangement({ line: lines[5], multiplicator: 2 })).toEqual(150)
  })
})
