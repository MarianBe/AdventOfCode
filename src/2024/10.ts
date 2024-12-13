import { readFile } from 'fs/promises'
import { to2DimensionalNumberArray, Coordinates } from '@helpers'

type HeightMap = number[][]
export const findStartingPoints = (heightMap: HeightMap): Coordinates[] => {
  const startPoints: Coordinates[] = []
  heightMap.forEach((row, rowIndex) =>
    row.forEach((height, colIndex) => {
      if (height === 0) startPoints.push([rowIndex, colIndex])
    }),
  )
  return startPoints
}

export const findCompletePaths = (
  currentPosition: Coordinates,
  heightMap: HeightMap,
): string[] => {
  const [row, col] = currentPosition
  const currentHeight = heightMap[row][col]
  const adjacentPositions: Coordinates[] = [
    [row - 1, col], // North
    [row + 1, col], // South
    [row, col - 1], // West
    [row, col + 1], // East
  ]

  const validPaths = adjacentPositions
    .map(([nextRow, nextCol]) => {
      const nextHeight = heightMap?.[nextRow]?.[nextCol]
      if (nextHeight !== currentHeight + 1) return []
      if (nextHeight === 9) {
        return [`${row}|${col},${nextRow}|${nextCol}`]
      }
      return findCompletePaths([nextRow, nextCol], heightMap).map(
        (path) => `${row}|${col},${path}`,
      )
    })
    .flat()

  return Array.from(new Set(validPaths))
}

export const calculateTotalEndpoints = (input: string): number => {
  const heightMap = to2DimensionalNumberArray<HeightMap>(input)
  const startingPoints = findStartingPoints(heightMap)
  return startingPoints.reduce((total, position) => {
    const fullPaths = findCompletePaths(position, heightMap)
    // Just get the unique endpoints of our paths
    return new Set(fullPaths.map((path) => path.split(',').at(-1))).size + total
  }, 0)
}

export const calculateTotalPaths = (input: string): number => {
  const heightMap = to2DimensionalNumberArray<HeightMap>(input)
  const startingPoints = findStartingPoints(heightMap)
  return startingPoints.reduce((total, position) => {
    const completePaths = findCompletePaths(position, heightMap)
    return completePaths.length + total
  }, 0)
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/10.txt', 'utf8')
  return calculateTotalEndpoints(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/10.txt', 'utf8')
  return calculateTotalPaths(input)
}
