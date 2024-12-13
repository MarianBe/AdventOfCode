import { stringify } from '@helpers'
import {
  createMazeFromInput,
  locateStartPosition,
  getDirectionalOffset,
  rotateClockwise,
  traverseMaze,
  placeWallInMaze,
  detectLoop,
  findAllPossibleLoops,
} from './6'

const testInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`

describe('Day 6', () => {
  describe('createMazeFromInput', () => {
    it('should create maze array from input string', () => {
      const maze = createMazeFromInput(testInput)
      expect(maze[0][4]).toBe('#')
      expect(maze[6][4]).toBe('^')
      expect(maze[0][0]).toBe('.')
    })
  })

  describe('locateStartPosition', () => {
    it('should find starting position marked with ^', () => {
      const maze = createMazeFromInput(testInput)
      expect(locateStartPosition(maze)).toEqual([6, 4])
    })
  })

  describe('getDirectionalOffset', () => {
    it('should return correct offsets for each direction', () => {
      expect(getDirectionalOffset('Up')).toEqual([-1, 0])
      expect(getDirectionalOffset('Down')).toEqual([1, 0])
      expect(getDirectionalOffset('Left')).toEqual([0, -1])
      expect(getDirectionalOffset('Right')).toEqual([0, 1])
    })
  })

  describe('rotateClockwise', () => {
    it('should rotate directions clockwise', () => {
      expect(rotateClockwise('Up')).toBe('Right')
      expect(rotateClockwise('Right')).toBe('Down')
      expect(rotateClockwise('Down')).toBe('Left')
      expect(rotateClockwise('Left')).toBe('Up')
    })
  })

  describe('traverseMaze', () => {
    it('should collect visited tiles', () => {
      const maze = createMazeFromInput(testInput)
      const visited = traverseMaze(maze)
      expect(visited.size).toBeGreaterThan(0)
      expect(visited.has(stringify([6, 4]))).toBeTruthy()
    })
  })

  describe('placeWallInMaze', () => {
    it('should place wall at specified coordinates', () => {
      const maze = createMazeFromInput(testInput)
      const newMaze = placeWallInMaze(maze, [1, 1])
      expect(newMaze[1][1]).toBe('#')
    })
  })

  describe('detectLoop', () => {
    it('should detect if path forms a loop', () => {
      const maze = createMazeFromInput(testInput)
      const startPos = locateStartPosition(maze)
      expect(detectLoop(maze, startPos, 'Up')).toBeFalsy()
    })
  })

  describe('findAllPossibleLoops', () => {
    it('should find all positions that create loops when walls are placed', () => {
      const maze = createMazeFromInput(testInput)
      const loops = findAllPossibleLoops(maze)
      expect(loops.size).toEqual(6)
    })
  })
})
