import { parseModuleMap, sendPulses } from './20'

const testInput = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`

describe('day20Part01', () => {
  it('should ', () => {
    expect(sendPulses(testInput, 1000)).toEqual(32000000)
  })
})

describe('day20Part02', () => {
  it('should', () => {
    expect(1).toEqual(1)
  })
})
