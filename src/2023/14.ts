import { readFile } from 'fs/promises'

export type Rock = 'O'
export type Fixed = '#'
export type Empty = '.'
export type Cell = Rock | Fixed | Empty
type X = number
type Y = number
export type Coordinate = [X, Y]

export interface Params {
  rockMap: Coordinate[]
  fixedMap: Coordinate[]
  gridSize: [X, Y]
}

export const parseGrid = (input: string): Params => {
  const rockMap: Coordinate[] = []
  const fixedMap: Coordinate[] = []
  let gridSize: [X, Y] = [0, 0]

  const lines = input.split('\n')
  gridSize = [lines[0].length, lines.length]
  lines.forEach((line: string, y: Y) => {
    line
      .trim()
      .split('')
      .forEach((cell: Cell, x: X) => {
        if (cell === 'O') {
          rockMap.push([x, y])
        } else if (cell === '#') {
          fixedMap.push([x, y])
        }
      })
  })

  return { rockMap, fixedMap, gridSize }
}
export const canRockMove = ({
  gridSize,
  rockMap,
  fixedMap,
  coordinates,
}: Params & { coordinates: Coordinate }) => {
  if (coordinates[0] < 0 || coordinates[0] >= gridSize[0]) {
    return false
  }
  if (coordinates[1] < 0 || coordinates[1] >= gridSize[1]) {
    return false
  }
  if (fixedMap.some(([x, y]) => x === coordinates[0] && y === coordinates[1])) {
    return false
  }
  if (rockMap.some(([x, y]) => x === coordinates[0] && y === coordinates[1])) {
    return false
  }
  return true
}

export const tiltNorth = ({ gridSize, rockMap, fixedMap }: Params) => {
  // We need to sort the rockMap by the y coordinate so we tilt the northern-most rocks first
  const sortedRockMap = rockMap.sort((a, b) => a[1] - b[1])

  const newRockMap: Coordinate[] = []
  sortedRockMap.forEach(([x, y]) => {
    let newY = y
    while (
      canRockMove({
        gridSize,
        rockMap: newRockMap,
        fixedMap,
        coordinates: [x, newY - 1],
      })
    ) {
      newY--
    }
    newRockMap.push([x, newY])
  })
  return { rockMap: newRockMap, fixedMap, gridSize }
}

export const tiltSouth = ({ gridSize, rockMap, fixedMap }: Params) => {
  const sortedRockMap = rockMap.sort((a, b) => b[1] - a[1])

  const newRockMap: Coordinate[] = []
  sortedRockMap.forEach(([x, y]) => {
    let newY = y
    while (
      canRockMove({
        gridSize,
        rockMap: newRockMap,
        fixedMap,
        coordinates: [x, newY + 1],
      })
    ) {
      newY++
    }
    newRockMap.push([x, newY])
  })
  return { rockMap: newRockMap, fixedMap, gridSize }
}

export const tiltWest = ({ gridSize, rockMap, fixedMap }: Params) => {
  const sortedRockMap = rockMap.sort((a, b) => a[0] - b[0])

  const newRockMap: Coordinate[] = []
  sortedRockMap.forEach(([x, y]) => {
    let newX = x
    while (
      canRockMove({
        gridSize,
        rockMap: newRockMap,
        fixedMap,
        coordinates: [newX - 1, y],
      })
    ) {
      newX--
    }
    newRockMap.push([newX, y])
  })
  return { rockMap: newRockMap, fixedMap, gridSize }
}

export const tiltEast = ({ gridSize, rockMap, fixedMap }: Params) => {
  const sortedRockMap = rockMap.sort((a, b) => b[0] - a[0])

  const newRockMap: Coordinate[] = []
  sortedRockMap.forEach(([x, y]) => {
    let newX = x
    while (
      canRockMove({
        gridSize,
        rockMap: newRockMap,
        fixedMap,
        coordinates: [newX + 1, y],
      })
    ) {
      newX++
    }
    newRockMap.push([newX, y])
  })
  return { rockMap: newRockMap, fixedMap, gridSize }
}

export const runSpinCycle = (params: Params, repetitions = 1) => {
  // The patternsa are repetitive, so we can cache the results of each tilt
  const cacheMap = new Map<string, Params['rockMap']>()
  let firstCacheHit = null
  while (repetitions-- > 0) {
    const cacheKey = JSON.stringify(params.rockMap.sort())
    if (cacheMap.has(cacheKey)) {
      // When we know our cycle length, remove the number of repetitions that are a multiple of the cycle length
      if (firstCacheHit?.cacheKey === cacheKey) {
        const cycleLength = firstCacheHit.repetitions - repetitions
        repetitions = repetitions % cycleLength
      }
      if (!firstCacheHit) {
        firstCacheHit = {
          repetitions,
          cacheKey,
        }
      }
      params.rockMap = cacheMap.get(cacheKey)
    } else {
      params = tiltNorth(params)
      params = tiltWest(params)
      params = tiltSouth(params)
      params = tiltEast(params)
      cacheMap.set(cacheKey, params.rockMap)
    }
  }
  return params
}

export const getNorthWeight = ({ gridSize, rockMap }: Params): number => {
  return rockMap.reduce((acc, [x, y]) => gridSize[1] - y + acc, 0)
}

export const printDebug = ({ gridSize, rockMap, fixedMap }: Params) => {
  const grid = [...Array(gridSize[1])].map(() =>
    [...Array(gridSize[0])].map(() => '.'),
  )

  rockMap.forEach(([x, y]) => (grid[y][x] = 'O'))
  fixedMap.forEach(([x, y]) => (grid[y][x] = '#'))
  console.clear()
  console.log(grid.map((line) => line.join('')).join('\n'))
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/14.txt', 'utf8')
  return getNorthWeight(tiltNorth(parseGrid(input)))
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/14.txt', 'utf8')
  console.log(
    'This takes around 50 seconds to run, until we encounter the first cycle ',
  )
  return getNorthWeight(runSpinCycle(parseGrid(input), 1000000000))
}
