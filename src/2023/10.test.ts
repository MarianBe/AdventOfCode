import {
  findFarthestPointInLoop,
  getEnclosedAreaOfLoop,
  getNextPoints,
  parseGrid,
} from './10'

const testInput = `.....
.S-7.
.|.|.
.L-J.
.....`

describe('day10Part01', () => {
  it('should find the next points for a given point', () => {
    expect(getNextPoints(parseGrid(testInput), [1, 1])).toEqual([
      [2, 1],
      [1, 2],
    ])
    expect(getNextPoints(parseGrid(testInput), [1, 3])).toEqual([
      [1, 2],
      [2, 3],
    ])
    expect(getNextPoints(parseGrid(testInput), [2, 3])).toEqual([
      [1, 3],
      [3, 3],
    ])
    expect(getNextPoints(parseGrid(testInput), [3, 3])).toEqual([
      [2, 3],
      [3, 2],
    ])
    expect(getNextPoints(parseGrid(testInput), [3, 2])).toEqual([
      [3, 1],
      [3, 3],
    ])
    expect(getNextPoints(parseGrid(testInput), [3, 1])).toEqual([
      [3, 2],
      [2, 1],
    ])
  })
  it('should find the farthest point in the loop', () => {
    expect(findFarthestPointInLoop(testInput)).toEqual(4)
  })
})

const testInput2 = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`

const testInput3 = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`

describe('day10Part02', () => {
  it('should find the contained points for our input', () => {
    expect(getEnclosedAreaOfLoop(testInput2)).toEqual(8)
  })
  it('should find the contained points for our input', () => {
    expect(getEnclosedAreaOfLoop(testInput3)).toEqual(10)
  })
})
