import { readFile } from 'fs/promises'

type Grid = string[][]
type Row = number
type Column = number
type Coordinates = [Row, Column]

export const parseGrid = (input: string): Grid => {
  return input.split('\n').map((l) => l.trim().split(''))
}

export const getNextPoints = (
  grid: Grid,
  currentPoint: Coordinates,
): Coordinates[] => {
  if (!currentPoint) return []
  const [currentRow, currentColumn] = currentPoint
  if (grid[currentRow][currentColumn] === 'S') {
    return [
      [currentRow - 1, currentColumn],
      [currentRow + 1, currentColumn],
      [currentRow, currentColumn - 1],
      [currentRow, currentColumn + 1],
    ].filter(
      ([r, c]) =>
        !!grid?.[r]?.[c] &&
        getNextPoints(grid, [r, c])?.some(
          (p) => p[0] === currentRow && p[1] === currentColumn,
        ),
    ) as [Coordinates, Coordinates]
  }
  if (grid[currentRow][currentColumn] === '-') {
    return [
      [currentRow, currentColumn - 1],
      [currentRow, currentColumn + 1],
    ]
  }
  if (grid[currentRow][currentColumn] === '|') {
    return [
      [currentRow - 1, currentColumn],
      [currentRow + 1, currentColumn],
    ]
  }
  if (grid[currentRow][currentColumn] === 'L') {
    return [
      [currentRow, currentColumn + 1],
      [currentRow - 1, currentColumn],
    ]
  }
  if (grid[currentRow][currentColumn] === 'J') {
    return [
      [currentRow - 1, currentColumn],
      [currentRow, currentColumn - 1],
    ]
  }
  if (grid[currentRow][currentColumn] === '7') {
    return [
      [currentRow, currentColumn - 1],
      [currentRow + 1, currentColumn],
    ]
  }
  if (grid[currentRow][currentColumn] === 'F') {
    return [
      [currentRow, currentColumn + 1],
      [currentRow + 1, currentColumn],
    ]
  }
}
export const getStartingPoint = (grid: Grid): Coordinates => {
  const rowWithS = grid.find((row) => row.includes('S'))
  const startingPoint: Coordinates = [
    grid.indexOf(rowWithS),
    rowWithS.findIndex((c) => c === 'S'),
  ]
  return startingPoint
}
export const findFarthestPointInLoop = (input: string): number => {
  const grid = parseGrid(input)
  const startingPoint = getStartingPoint(grid)

  let foundFurthestPoint = false
  let distance = 1
  let currentPoints: Coordinates[] = getNextPoints(grid, startingPoint)
  const visited = new Set<string>([
    startingPoint.join(','),
    ...currentPoints.map((p) => p.join(',')),
  ])
  while (!foundFurthestPoint) {
    const nextForwardPoints = getNextPoints(grid, currentPoints[0])
    const nextBackwardPoints = getNextPoints(grid, currentPoints[1])

    const nextPoints = [...nextForwardPoints, ...nextBackwardPoints].filter(
      (p) => !visited.has(p.join(',')),
    )

    if (nextPoints.length === 0) {
      // We visited all points
      foundFurthestPoint = true
    } else {
      nextPoints.forEach((p) => visited.add(p.join(',')))
      currentPoints = nextPoints as [Coordinates, Coordinates]
      distance++
    }
  }

  return distance
}

export const getEnclosedAreaOfLoop = (input: string): number => {
  const grid = parseGrid(input)

  const startingPoint = getStartingPoint(grid)

  let done = false
  let currentPoints: Coordinates[] = getNextPoints(grid, startingPoint)
  const visited = new Set<string>([
    startingPoint.join(','),
    ...currentPoints.map((p) => p.join(',')),
  ])
  while (!done) {
    const nextForwardPoints = getNextPoints(grid, currentPoints[0])
    const nextBackwardPoints = getNextPoints(grid, currentPoints[1])

    const nextPoints = [...nextForwardPoints, ...nextBackwardPoints].filter(
      (p) => !visited.has(p.join(',')),
    )
    if (nextPoints.length === 0) {
      // We visited all points and added them to the set
      done = true
    } else {
      nextPoints.forEach((p) => visited.add(p.join(',')))
      currentPoints = nextPoints as [Coordinates, Coordinates]
    }
  }

  // Find the contained points
  let containedPoints = 0
  let insideWalls = false
  let lastWall = ''
  grid.forEach((row, rowIndex) => {
    lastWall = ''
    insideWalls = false
    row.forEach((cell, cellIndex) => {
      // If any character is not part of the loop and is inside a wall, it is contained
      if (insideWalls && !visited.has([rowIndex, cellIndex].join(','))) {
        containedPoints++
      }
      if (visited.has([rowIndex, cellIndex].join(','))) {
        // "|" is a wall, so we always toggle
        if (cell === '|') {
          insideWalls = !insideWalls
        } else {
          // "L7" and "FJ" are walls, so we toggle
          // "LJ" and "F7" do not need a toggle, since they just go back
          if (cell === '7') {
            if (lastWall === 'L') {
              insideWalls = !insideWalls
            }
          }
          if (cell === 'J') {
            if (lastWall === 'F') {
              insideWalls = !insideWalls
            }
          }
          if (cell !== '-') lastWall = cell
        }
      }
    })
  })

  return containedPoints
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/10.txt', 'utf8')
  return findFarthestPointInLoop(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/10.txt', 'utf8')
  return getEnclosedAreaOfLoop(input)
}
