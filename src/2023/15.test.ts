import { getFocusingPower, getSequenceHash, hashString } from './15'

const testInput = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`

describe('day15Part01', () => {
  it('should return the correct hash value for a given string', () => {
    expect(hashString('HASH')).toEqual(52)
  })
  it('should return the correct sequence hash value for a given input', () => {
    expect(getSequenceHash(testInput)).toEqual(1320)
  })
})

describe('day15Part02', () => {
  it('should return the correct focusing power for a given input', () => {
    expect(getFocusingPower(testInput)).toEqual(145)
  })
})
