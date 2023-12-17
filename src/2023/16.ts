import { readFile } from 'fs/promises'

type Direction = 'right' | 'down' | 'left' | 'up'
type Operation = { direction: Direction; position: [X, Y] }
type X = number
type Y = number

export const getNextPosition = (
  position: [X, Y],
  direction: Direction,
): [X, Y] => {
  const [x, y] = position
  if (direction === 'right') return [x + 1, y]
  if (direction === 'down') return [x, y + 1]
  if (direction === 'left') return [x - 1, y]
  if (direction === 'up') return [x, y - 1]
}

export const traverseGrid = (
  grid: string[][],
  position: [X, Y],
  direction: Direction,
  visitedTiles: Set<string>,
  operations: Operation[] = [],
) => {
  const [x, y] = position
  const currentTile = grid[y]?.[x]

  // Out of bounds
  if (!currentTile) return

  visitedTiles.add(`${x},${y}`)

  if (currentTile === '.') {
    operations.push({
      direction,
      position: getNextPosition(position, direction),
    })
  }

  if (currentTile === '|') {
    if (direction === 'right' || direction === 'left') {
      operations.push({
        direction: 'down',
        position: getNextPosition(position, 'down'),
      })
      operations.push({
        direction: 'up',
        position: getNextPosition(position, 'up'),
      })
    } else {
      operations.push({
        direction,
        position: getNextPosition(position, direction),
      })
    }
  }

  if (currentTile === '-') {
    if (direction === 'right' || direction === 'left') {
      operations.push({
        direction,
        position: getNextPosition(position, direction),
      })
    } else {
      operations.push({
        direction: 'right',
        position: getNextPosition(position, 'right'),
      })
      operations.push({
        direction: 'left',
        position: getNextPosition(position, 'left'),
      })
    }
  }

  if (currentTile === '/') {
    if (direction === 'right') {
      operations.push({
        direction: 'up',
        position: getNextPosition(position, 'up'),
      })
    } else if (direction === 'down') {
      operations.push({
        direction: 'left',
        position: getNextPosition(position, 'left'),
      })
    } else if (direction === 'left') {
      operations.push({
        direction: 'down',
        position: getNextPosition(position, 'down'),
      })
    } else {
      operations.push({
        direction: 'right',
        position: getNextPosition(position, 'right'),
      })
    }
  }

  if (currentTile === '\\') {
    if (direction === 'right') {
      operations.push({
        direction: 'down',
        position: getNextPosition(position, 'down'),
      })
    } else if (direction === 'down') {
      operations.push({
        direction: 'right',
        position: getNextPosition(position, 'right'),
      })
    } else if (direction === 'left') {
      operations.push({
        direction: 'up',
        position: getNextPosition(position, 'up'),
      })
    } else {
      operations.push({
        direction: 'left',
        position: getNextPosition(position, 'left'),
      })
    }
  }
}

export const getGrid = (input: string): string[][] => {
  const grid = input.split('\n').map((row) => row.trim().split(''))
  return grid
}

export const getEnergizedTiles = (
  input: string,
  startDirection: Direction = 'right',
  startPosition: [X, Y] = [0, 0],
): number => {
  const grid = getGrid(input)
  const visitedTiles = new Set<string>()
  const finishedOperations = new Set<string>()
  const operations: Operation[] = [
    {
      direction: startDirection,
      position: startPosition,
    },
  ]
  while (operations.length) {
    const operation = operations.pop()
    if (finishedOperations.has(JSON.stringify(operation))) continue
    traverseGrid(
      grid,
      operation.position,
      operation.direction,
      visitedTiles,
      operations,
    )
    finishedOperations.add(JSON.stringify(operation))
  }

  return visitedTiles.size
}

export const debugGrid = (grid: string[][], visitedTiles: Set<string>) => {
  console.clear()
  const gridCopy = grid.map((row) => [...row.map(() => '.')])
  visitedTiles.forEach((tile) => {
    const [x, y] = tile.split(',').map(Number)
    gridCopy[y][x] = 'X'
  })

  console.log(gridCopy.map((row) => row.join('')).join('\n'))
}

export const getMostEnergizedTiles = (input: string): number => {
  const grid = getGrid(input)
  const gridWidth = grid[0].length
  const gridHeight = grid.length
  const allPossibleStarts: { position: [X, Y]; direction: Direction }[] = []

  for (let y = 0; y < gridHeight; y++) {
    allPossibleStarts.push({ position: [0, y], direction: 'right' })
    allPossibleStarts.push({ position: [gridWidth - 1, y], direction: 'left' })
  }
  for (let x = 0; x < gridWidth; x++) {
    allPossibleStarts.push({ position: [x, 0], direction: 'down' })
    allPossibleStarts.push({ position: [x, gridHeight - 1], direction: 'up' })
  }
  return Math.max(
    ...allPossibleStarts.map(({ position, direction }) =>
      getEnergizedTiles(input, direction, position),
    ),
  )
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/16.txt', 'utf8')
  return getEnergizedTiles(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/16.txt', 'utf8')
  return getMostEnergizedTiles(input)
}
