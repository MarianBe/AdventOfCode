import {
  to2DimensionalArray,
  stringify,
  findCoordinatesIn2DimensionalArray,
} from './helpers'
describe('helpers', () => {
  describe('to2DimensionalArray', () => {
    it('should convert string input to 2D array', () => {
      const input = 'abc\ndef\nghi'
      const expected = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
      ]
      expect(to2DimensionalArray(input)).toEqual(expected)
    })

    it('should handle empty string', () => {
      expect(to2DimensionalArray('')).toEqual([[]])
    })

    it('should handle single line', () => {
      expect(to2DimensionalArray('abc')).toEqual([['a', 'b', 'c']])
    })
  })

  describe('stringify', () => {
    it('should join arguments with pipe separator', () => {
      expect(stringify('a', 1, true)).toBe('a|1|true')
    })

    it('should handle single argument', () => {
      expect(stringify('test')).toBe('test')
    })

    it('should handle array arguments', () => {
      expect(stringify([5, 8])).toBe('5|8')
    })

    it('should handle empty arguments', () => {
      expect(stringify()).toBe('')
    })
  })

  describe('findCoordinatesIn2DimensionalArray', () => {
    it('should find coordinates of a string in 2D array', () => {
      const map = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
      ]
      expect(findCoordinatesIn2DimensionalArray(map, 'e')).toEqual([1, 1])
    })

    it('should find coordinates of a number in 2D array', () => {
      const map = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]
      expect(findCoordinatesIn2DimensionalArray(map, 5)).toEqual([1, 1])
    })

    it('should return undefined if the element is not found', () => {
      const map = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
      ]
      expect(findCoordinatesIn2DimensionalArray(map, 'z')).toEqual(undefined)
    })
  })
})
