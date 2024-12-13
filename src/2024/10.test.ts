import { Coordinates, to2DimensionalNumberArray } from '@helpers'
import {
  calculateTotalEndpoints,
  calculateTotalPaths,
  findCompletePaths,
  findStartingPoints,
} from './10'

const testInput = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`

describe('parseHeightMapFromInput', () => {
  it('should parse a simple height map correctly', () => {
    const input = '123\n456\n789'
    const expected = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]
    expect(to2DimensionalNumberArray(input)).toEqual(expected)
  })

  it('should parse single row input', () => {
    expect(to2DimensionalNumberArray('123')).toEqual([[1, 2, 3]])
  })
})

describe('findStartingPoints', () => {
  it('should find multiple starting points', () => {
    const heightMap = [
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0],
    ]
    const expected: Coordinates[] = [
      [0, 0],
      [0, 2],
      [1, 1],
      [2, 0],
      [2, 2],
    ]
    expect(findStartingPoints(heightMap)).toEqual(expected)
  })

  it('should return empty array when no starting points exist', () => {
    const heightMap = [
      [1, 2],
      [3, 4],
    ]
    expect(findStartingPoints(heightMap)).toEqual([])
  })
})

describe('findCompletePaths', () => {
  it('should return empty array for dead ends', () => {
    const heightMap = [[0, 2, 3]]
    expect(findCompletePaths([0, 0], heightMap)).toEqual([])
  })
})

describe('calculateTotalEndpoints', () => {
  it('should count unique endpoints correctly', () => {
    expect(calculateTotalEndpoints(testInput)).toBe(36)
  })
})

describe('calculateTotalPaths', () => {
  it('should count all valid paths', () => {
    expect(calculateTotalPaths(testInput)).toBe(81)
  })
})
