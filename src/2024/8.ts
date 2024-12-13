import { readFile } from 'fs/promises'
import { to2DimensionalArray } from '@helpers'

export type Grid = string[][]
export type Position = [number, number]
export type AntennaPositions = Map<string, Position[]>

export const collectAntennaPositions = (grid: Grid): AntennaPositions => {
  const positions = new Map()
  grid.forEach((row, y) =>
    row.forEach((symbol, x) => {
      if (symbol === '.') return
      const existingPositions = positions.get(symbol) || []
      positions.set(symbol, [...existingPositions, [y, x]])
    }),
  )
  return positions
}

export const isValidPosition = ([y, x]: Position, grid: Grid): boolean =>
  y >= 0 && y < grid.length && x >= 0 && x < grid[0].length

export const positionToString = ([y, x]: Position): string => `${y}|${x}`

export const findAntinodes = (
  positions: Position[],
  grid: Grid,
  allowMultipleSteps = false,
): string[] => {
  const [origin, ...others] = positions
  if (others.length === 0) return []

  const antinodes = others.flatMap((target) => {
    const offsetY = origin[0] - target[0]
    const offsetX = origin[1] - target[1]
    const foundPositions = []

    for (let multiplier = 1; true; multiplier++) {
      const nextPositions = [
        [origin[0] - offsetY * multiplier, origin[1] - offsetX * multiplier],
        [origin[0] + offsetY * multiplier, origin[1] + offsetX * multiplier],
        [target[0] - offsetY * multiplier, target[1] - offsetX * multiplier],
        [target[0] + offsetY * multiplier, target[1] + offsetX * multiplier],
      ].map((pos) => positionToString(pos as Position))

      if (
        nextPositions.every(
          (pos) =>
            !isValidPosition(pos.split('|') as unknown as Position, grid),
        )
      ) {
        // We're out of bounds on all sides now, stop
        break
      }

      foundPositions.push(...nextPositions)

      // Just do one iteration for part1
      if (!allowMultipleSteps) break
    }

    return foundPositions.filter((pos) => {
      const isOriginOrTarget =
        pos === positionToString(origin) || pos === positionToString(target)
      return (
        (allowMultipleSteps || !isOriginOrTarget) &&
        isValidPosition(pos.split('|') as unknown as Position, grid)
      )
    })
  })

  return [...antinodes, ...findAntinodes(others, grid, allowMultipleSteps)]
}

export const calculateAntinodes = (
  input: string,
  allowMultipleSteps = false,
): Set<string> => {
  const grid = to2DimensionalArray<Grid>(input)
  const antennas = [...collectAntennaPositions(grid).entries()]
  const antinodes = new Set<string>()

  antennas.forEach(([_, positions]) => {
    findAntinodes(positions, grid, allowMultipleSteps).forEach((pos) =>
      antinodes.add(pos),
    )
  })

  return antinodes
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/8.txt', 'utf8')
  return calculateAntinodes(input).size
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/8.txt', 'utf8')
  return calculateAntinodes(input, true).size
}
