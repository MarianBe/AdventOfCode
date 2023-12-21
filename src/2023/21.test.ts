import { getReachableNodesAmount } from './21'

const testInput = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`

describe('day21Part01', () => {
  it('should find the availble nodes for our steps ', () => {
    expect(getReachableNodesAmount(testInput, 6)).toEqual(16)
  })
})

describe('day21Part02', () => {
  it('should find the available steps with an infinte grid', () => {
    expect(getReachableNodesAmount(testInput, 50, true)).toEqual(1594)
    expect(getReachableNodesAmount(testInput, 100, true)).toEqual(6536)
  })
})
