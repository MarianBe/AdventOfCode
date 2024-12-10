import { readFile } from 'fs/promises'

type HeightMap = number[][]
type RowIndex = number
type ColumnIndex = number
export type Position = [RowIndex, ColumnIndex]

export const parseHeightMapFromInput = (input: string): HeightMap =>
  input.split('\n').map((line) => line.split('').map(Number))

export const findStartingPoints = (heightMap: HeightMap): Position[] => {
  const startPoints: Position[] = []
  heightMap.forEach((row, rowIndex) =>
    row.forEach((height, colIndex) => {
      if (height === 0) startPoints.push([rowIndex, colIndex])
    }),
  )
  return startPoints
}

export const findCompletePaths = (
  currentPosition: Position,
  heightMap: HeightMap,
): string[] => {
  const [row, col] = currentPosition
  const currentHeight = heightMap[row][col]
  const adjacentPositions: Position[] = [
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
  const heightMap = parseHeightMapFromInput(input)
  const startingPoints = findStartingPoints(heightMap)
  return startingPoints.reduce((total, position) => {
    const fullPaths = findCompletePaths(position, heightMap)
    // Just get the unique endpoints of our paths
    return new Set(fullPaths.map((path) => path.split(',').at(-1))).size + total
  }, 0)
}

export const calculateTotalPaths = (input: string): number => {
  const heightMap = parseHeightMapFromInput(input)
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
