import { readFile } from 'fs/promises'

type X = number
type Y = number
type Direction = 'R' | 'L' | 'U' | 'D'

interface GridEstimateMap {
  coordinates: string
  heatloss: number
  explored: boolean
  lastDirection: Direction[]
}
const DIRECTIONS: Direction[] = ['R', 'L', 'U', 'D']

export const parseGrid = (input: string) => {
  const lines = input.split('\n')
  return lines.map((line) => line.trim().split('').map(Number))
}
export const getNextCoordinates = (
  [x, y]: [X, Y],
  direction: Direction,
): [X, Y] => {
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

export const findPathWithLeastHeatloss = (input: string): number => {
  const grid = parseGrid(input)
  const gridWidth = grid[0].length
  const gridHeight = grid.length

  const gridEstimates = new Map<string, GridEstimateMap>()

  gridEstimates.set(`0,0`, {
    coordinates: `0,0`,
    heatloss: 0, //grid[0][0],
    explored: false,
    lastDirection: [],
  })

  const lowestHeatloss = Infinity
  while (Array.from(gridEstimates.values()).some((v) => !v.explored)) {
    const currentEstimate = Array.from(gridEstimates.values())
      .sort((a, b) => a.heatloss - b.heatloss)
      .find((v) => !v.explored)

    currentEstimate.explored = true
    const lastDirection = currentEstimate.lastDirection.at(-1)
    DIRECTIONS.forEach((direction) => {
      const [x, y] = currentEstimate.coordinates.split(',').map(Number)
      const [nextX, nextY] = getNextCoordinates([x, y], direction)

      // out of bounds, skip
      if (grid[nextY] === undefined || grid[nextY][nextX] === undefined) {
        return
      }

      // Too long of a straight line, skip
      if (
        [...currentEstimate.lastDirection, direction].splice(-4).join('') ===
        new Array(4).fill(direction).join('')
      ) {
        return
      }
      if (
        (lastDirection === 'R' && direction === 'L') ||
        (lastDirection === 'L' && direction === 'R') ||
        (lastDirection === 'U' && direction === 'D') ||
        (lastDirection === 'D' && direction === 'U')
      )
        return

      const last3Directions = [...currentEstimate.lastDirection, direction]
        .splice(-3)
        .join(',')

      const nextEstimate = gridEstimates.get(
        `${nextX},${nextY},${last3Directions}`,
      )
      const nextHeatloss = currentEstimate.heatloss + grid[nextY][nextX]

      if (nextEstimate) {
        if (nextHeatloss < nextEstimate.heatloss) {
          nextEstimate.heatloss = nextHeatloss
          nextEstimate.lastDirection = [
            ...currentEstimate.lastDirection,
            direction,
          ]
        }
      } else {
        gridEstimates.set(`${nextX},${nextY},${last3Directions}`, {
          coordinates: `${nextX},${nextY}`,
          heatloss: nextHeatloss,
          explored: false,
          lastDirection: [...currentEstimate.lastDirection, direction],
        })
      }
    })
  }
  console.log(
    Array.from(gridEstimates.values()).filter(
      (v) => v.coordinates === `${gridWidth - 1},${gridHeight - 1}`,
    ),
  )
  return Math.min(
    ...Array.from(gridEstimates.values())
      .filter((v) => v.coordinates === `${gridWidth - 1},${gridHeight - 1}`)
      .map((v) => v.heatloss),
  )
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/17.txt', 'utf8')
  return findPathWithLeastHeatloss(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/17.txt', 'utf8')
  return 0
}
