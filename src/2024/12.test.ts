import {
  getFenceSize,
  getCornersForPosition,
  getPlantMap,
  recursiveCheckPlantGroup,
} from './12'

const testInput = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`

const shortTestInput = `AAAA
BBCD
BBCC
EEEC`

describe('day12Part01', () => {
  it('should get the fence size by using the perimeter', () => {
    expect(getFenceSize(shortTestInput)).toEqual(140)
    expect(getFenceSize(testInput)).toEqual(1930)
  })
})

describe('day12Part02', () => {
  it('should get the corners for a position', () => {
    const plantMap = getPlantMap(shortTestInput)

    expect(getCornersForPosition([0, 0], plantMap)).toEqual(2)
    expect(getCornersForPosition([0, 1], plantMap)).toEqual(0)
    expect(getCornersForPosition([0, 2], plantMap)).toEqual(0)
    expect(getCornersForPosition([0, 3], plantMap)).toEqual(2)
  })
  it('should get the corners for a position on our bigger input', () => {
    const plantMap = getPlantMap(testInput)

    expect(getCornersForPosition([4, 9], plantMap)).toEqual(2)
    expect(getCornersForPosition([5, 9], plantMap)).toEqual(1)
    expect(getCornersForPosition([5, 8], plantMap)).toEqual(1)
    expect(getCornersForPosition([6, 8], plantMap)).toEqual(0)
    expect(getCornersForPosition([9, 9], plantMap)).toEqual(1)
    expect(getCornersForPosition([8, 8], plantMap)).toEqual(1)
  })
  it('should handle edge-cases for corners', () => {
    const plantMap = getPlantMap(`OXO
XXX
OXO`)

    expect(getCornersForPosition([0, 0], plantMap)).toEqual(4)
    expect(getCornersForPosition([0, 1], plantMap)).toEqual(2)
    expect(getCornersForPosition([0, 2], plantMap)).toEqual(4)
    expect(getCornersForPosition([1, 0], plantMap)).toEqual(2)
    expect(getCornersForPosition([1, 1], plantMap)).toEqual(4)
    expect(getCornersForPosition([1, 2], plantMap)).toEqual(2)
    expect(getCornersForPosition([2, 0], plantMap)).toEqual(4)
    expect(getCornersForPosition([2, 1], plantMap)).toEqual(2)
    expect(getCornersForPosition([2, 2], plantMap)).toEqual(4)
  })
  it('should handle diagonal corners', () => {
    const plantMap = getPlantMap(`AAC
AAF
GHA`)

    expect(getCornersForPosition([0, 0], plantMap)).toEqual(1)
    expect(getCornersForPosition([0, 1], plantMap)).toEqual(1)
    expect(getCornersForPosition([0, 2], plantMap)).toEqual(4)
    expect(getCornersForPosition([1, 0], plantMap)).toEqual(1)
    expect(getCornersForPosition([1, 1], plantMap)).toEqual(1)
    expect(getCornersForPosition([1, 2], plantMap)).toEqual(4)
    expect(getCornersForPosition([2, 0], plantMap)).toEqual(4)
    expect(getCornersForPosition([2, 1], plantMap)).toEqual(4)
    expect(getCornersForPosition([2, 2], plantMap)).toEqual(4)
  })

  it('should get the fence size by using the sides', () => {
    expect(getFenceSize(shortTestInput, true)).toEqual(80)
    expect(getFenceSize(testInput, true)).toEqual(1206)
  })
})
