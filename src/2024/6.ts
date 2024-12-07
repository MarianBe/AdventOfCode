/* eslint-disable no-constant-condition */
import { readFile } from 'fs/promises'

type TerrainType = '.' | '#' | '^'
type Maze = TerrainType[][]
type Y = number
type X = number
export type Coordinates = [Y, X]
type VisitedTiles = Set<string>
type LoopingPaths = Set<string>
export type Direction = 'Up' | 'Down' | 'Left' | 'Right'

export const serializePosition = (
  coordinate: Coordinates,
  direction?: Direction,
): string =>
  `${coordinate[0]}|${coordinate[1]}` + (direction ? `|${direction}` : '')

export const createMazeFromInput = (input: string): Maze =>
  input.split('\n').map((line) => line.split('') as TerrainType[])

export const locateStartPosition = (maze: Maze): Coordinates => {
  let X = undefined
  const Y = maze.findIndex(
    (line) =>
      line.findIndex((tile, index) => {
        if (tile === '^') {
          X = index
          return true
        }
        return false
      }) !== -1,
  )
  return [Y, X]
}

export const getDirectionalOffset = (
  direction: Direction,
): [number, number] => {
  if (direction === 'Up') return [-1, 0]
  if (direction === 'Down') return [1, 0]
  if (direction === 'Left') return [0, -1]
  if (direction === 'Right') return [0, 1]
}

export const rotateClockwise = (direction: Direction): Direction => {
  if (direction === 'Up') return 'Right'
  if (direction === 'Right') return 'Down'
  if (direction === 'Down') return 'Left'
  if (direction === 'Left') return 'Up'
}

export const placeWallInMaze = (maze: Maze, coordinates: Coordinates): Maze => {
  return maze.map((line, Y) =>
    line.map((tile, X) =>
      Y === coordinates[0] && X === coordinates[1] ? '#' : tile,
    ),
  )
}

export const detectLoop = (
  maze: Maze,
  startPosition: Coordinates,
  startDirection: Direction,
): boolean => {
  let currentDirection: Direction = startDirection
  let currentPosition: Coordinates = startPosition

  const visited = new Set<string>()
  let loopFound = false
  while (true) {
    const offset = getDirectionalOffset(currentDirection)
    const nextPosition: Coordinates = [
      currentPosition[0] + offset[0],
      currentPosition[1] + offset[1],
    ]
    const nextStepKey = serializePosition(nextPosition, currentDirection)

    if (visited.has(nextStepKey)) {
      loopFound = true
      break
    }

    const nextTile = maze?.[nextPosition[0]]?.[nextPosition[1]]
    if (!nextTile) {
      break
    }

    if (nextTile === '#') {
      currentDirection = rotateClockwise(currentDirection)
      continue
    }
    visited.add(nextStepKey)
    currentPosition = nextPosition
  }
  return loopFound
}

export const traverseMaze = (maze: Maze): VisitedTiles => {
  let direction: Direction = 'Up'
  let currentPosition: Coordinates = locateStartPosition(maze)
  const visitedTiles: VisitedTiles = new Set([
    serializePosition(currentPosition),
  ])

  while (true) {
    const offset = getDirectionalOffset(direction)
    const nextPosition: Coordinates = [
      currentPosition[0] + offset[0],
      currentPosition[1] + offset[1],
    ]
    const nextTile = maze?.[nextPosition[0]]?.[nextPosition[1]]
    if (!nextTile) {
      break
    }

    if (nextTile === '#') {
      direction = rotateClockwise(direction)
      continue
    }

    visitedTiles.add(serializePosition(nextPosition))
    currentPosition = nextPosition
  }
  return visitedTiles
}

export const findAllPossibleLoops = (maze: Maze): LoopingPaths => {
  const direction: Direction = 'Up'
  const startPosition: Coordinates = locateStartPosition(maze)
  const possibleLoops: LoopingPaths = new Set()

  maze.forEach((line, Y) => {
    line.forEach((tile, X) => {
      if (tile === '.') {
        if (
          detectLoop(placeWallInMaze(maze, [Y, X]), startPosition, direction)
        ) {
          possibleLoops.add(serializePosition([Y, X]))
        }
      }
    })
  })
  return possibleLoops
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/6.txt', 'utf8')
  return traverseMaze(createMazeFromInput(input)).size
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/6.txt', 'utf8')
  const maze = createMazeFromInput(input)
  console.log('🕒 This takes around 12 seconds, please wait 🕒')
  return findAllPossibleLoops(maze).size
}
