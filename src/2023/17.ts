import { readFile } from 'fs/promises'
import { PriorityQueue } from '@datastructures-js/priority-queue'

type Direction = 'R' | 'L' | 'U' | 'D'
type XY = [number, number]
interface Node {
  coordinates: XY
  heatloss: number
  direction: Direction
  directionCount: number
}
const DIRECTIONS: Direction[] = ['U', 'R', 'D', 'L']

export const parseGrid = (input: string) => {
  const lines = input.split('\n')
  return lines.map((line) => line.trim().split('').map(Number))
}
export const getNextCoordinates = ([x, y]: XY, direction: Direction): XY => {
  if (direction === 'R') {
    return [x + 1, y]
  } else if (direction === 'L') {
    return [x - 1, y]
  } else if (direction === 'U') {
    return [x, y - 1]
  } else {
    return [x, y + 1]
  }
}
const getCacheKey = ({ coordinates, direction, directionCount }: Node) => {
  return `${coordinates}:${direction}:${directionCount}`
}
export const findPathWithLeastHeatloss = (
  input: string,
  minStraightDirections = 0,
  maxStraightDirections = 3,
): number => {
  const grid = parseGrid(input)
  const gridWidth = grid[0].length
  const gridHeight = grid.length

  const visited = new Set<string>()

  const queue = new PriorityQueue<Node>((a, b) => a.heatloss - b.heatloss)

  queue.enqueue({
    coordinates: [0, 0],
    heatloss: 0,
    direction: 'D',
    directionCount: 0,
  })
  queue.enqueue({
    coordinates: [0, 0],
    heatloss: 0,
    direction: 'R',
    directionCount: 0,
  })

  const addToQueue = (node: Node) => {
    if (visited.has(getCacheKey(node))) return
    const [x, y] = node.coordinates
    if (grid?.[y]?.[x] === undefined) return

    const newHeatloss = node.heatloss + grid[y][x]
    queue.enqueue({ ...node, heatloss: newHeatloss })
  }

  let lowestHeatloss = Infinity
  while (!queue.isEmpty()) {
    const node = queue.dequeue()
    const { direction, directionCount, heatloss, coordinates } = node
    const [x, y] = coordinates

    if (!grid?.[y]?.[x]) continue
    if (visited.has(getCacheKey(node))) {
      continue
    }

    visited.add(getCacheKey(node))

    if (coordinates[0] === gridWidth - 1 && coordinates[1] === gridHeight - 1) {
      lowestHeatloss = Math.min(lowestHeatloss, heatloss)
      continue
    }

    if (directionCount < maxStraightDirections) {
      const nextCoordinatesInSameDirection = getNextCoordinates(
        coordinates,
        direction,
      )
      addToQueue({
        coordinates: nextCoordinatesInSameDirection,
        heatloss,
        direction,
        directionCount: directionCount + 1,
      })
    }

    // We can't turn yet
    if (directionCount < minStraightDirections) {
      continue
    }

    const nextDirectionRight =
      DIRECTIONS[(DIRECTIONS.indexOf(direction) + 1) % 4]
    addToQueue({
      coordinates: getNextCoordinates(coordinates, nextDirectionRight),
      heatloss,
      direction: nextDirectionRight,
      directionCount: 1,
    })

    const nextDirectionLeft =
      DIRECTIONS[(DIRECTIONS.indexOf(direction) + 3) % 4]
    addToQueue({
      coordinates: getNextCoordinates(coordinates, nextDirectionLeft),
      direction: DIRECTIONS[(DIRECTIONS.indexOf(direction) + 3) % 4],
      directionCount: 1,
      heatloss,
    })
  }
  return lowestHeatloss
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/17.txt', 'utf8')
  return findPathWithLeastHeatloss(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/17.txt', 'utf8')
  return findPathWithLeastHeatloss(input, 4, 10)
}
