import { blinkInputStones } from './11'

const testInput = `125 17`

describe('day11', () => {
  it('should get the correct results', () => {
    expect(blinkInputStones('2024 10', 1)).toEqual(4)
    expect(blinkInputStones(testInput, 1)).toEqual(
      '253000 1 7'.split(' ').length,
    )
    expect(blinkInputStones(testInput, 2)).toEqual(
      '253 0 2024 14168'.split(' ').length,
    )
    expect(blinkInputStones(testInput, 3)).toEqual(
      '512072 1 20 24 28676032'.split(' ').length,
    )
    expect(blinkInputStones(testInput, 4)).toEqual(
      '512 72 2024 2 0 2 4 2867 6032'.split(' ').length,
    )
    expect(blinkInputStones(testInput, 5)).toEqual(
      '1036288 7 2 20 24 4048 1 4048 8096 28 67 60 32'.split(' ').length,
    )
    expect(blinkInputStones(testInput, 6)).toEqual(
      '2097446912 14168 4048 2 0 2 4 40 48 2024 40 48 80 96 2 8 6 7 6 0 3 2'.split(
        ' ',
      ).length,
    )
  })
})
