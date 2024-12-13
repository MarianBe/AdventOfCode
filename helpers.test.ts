import { to2DimensionalArray, stringify } from './helpers'
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
})
