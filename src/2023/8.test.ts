import {
  countStepsForNode,
  countStepsSimultaneously,
  getInstructionsFromInput,
  mapNodes,
} from './8'

const testInput = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`

describe('day08Part01', () => {
  it('should map the nodes correctly', () => {
    expect(
      mapNodes(`RL

    AAA = (BBB, CCC)
    BBB = (DDD, EEE)
    CCC = (ZZZ, GGG)`),
    ).toEqual(
      new Map([
        ['AAA', ['BBB', 'CCC']],
        ['BBB', ['DDD', 'EEE']],
        ['CCC', ['ZZZ', 'GGG']],
      ]),
    )
  })
  it('should get the instructions from the input', () => {
    expect(getInstructionsFromInput(testInput)).toEqual(['R', 'L'])
  })
  it('should count the steps correctly', () => {
    expect(countStepsForNode(testInput)).toEqual(2)
  })
})
const testInput2 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`

describe('day08Part02', () => {
  it('should count the steps simultaneously', () => {
    expect(countStepsSimultaneously(testInput2)).toEqual(6)
  })
})
