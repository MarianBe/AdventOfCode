import { readFile } from 'fs/promises'

type SpaceTypes = '.' | '#'
type SpaceMap = SpaceTypes[][]
type Row = number
type Column = number
type Coordinates = [Row, Column]
type ExpansionMap = { rows: number[]; columns: number[] }

export const getSpaceMap = (input: string): SpaceMap => {
  return input.split('\n').map((l) => l.trim().split('') as SpaceTypes[])
}

export const getSpaceMapExpansions = (spaceMap: SpaceMap): ExpansionMap => {
  // Every row or column that only has '.' should be expanded by 1
  const rowsToExpand = new Set<number>(
    new Array(spaceMap.length).fill(0).map((_, i) => i),
  )
  const columnsToExpand = new Set<number>(
    new Array(spaceMap[0].length).fill(0).map((_, i) => i),
  )

  spaceMap.forEach((row, rowIndex) => {
    row.forEach((space, columnIndex) => {
      if (space === '#') {
        rowsToExpand.delete(rowIndex)
        columnsToExpand.delete(columnIndex)
      }
    })
  })

  return {
    rows: [...rowsToExpand],
    columns: [...columnsToExpand],
  }
}

export const getAllGalaxies = (spaceMap: SpaceMap): Coordinates[] => {
  const galaxies: Coordinates[] = []
  spaceMap.forEach((row, rowIndex) => {
    row.forEach((space, columnIndex) => {
      if (space === '#') {
        galaxies.push([rowIndex, columnIndex])
      }
    })
  })
  return galaxies
}

export const getAllPairsFromArray = <T>(arr: T[]): [T, T][] => {
  const pairs: [T, T][] = []
  arr.forEach((item, index) => {
    arr.slice(index + 1).forEach((otherItem) => {
      pairs.push([item, otherItem])
    })
  })
  return [...pairs]
}

export const getShortestDistanceBetweenGalaxies = (
  [galaxy1, galaxy2]: [Coordinates, Coordinates],
  expansionMap: ExpansionMap,
  expansionSize: number = 1,
): number => {
  let verticalSteps = 0
  let horizontalSteps = 0

  const verticalBounds = [galaxy1[0], galaxy2[0]].sort((a, b) =>
    a > b ? 1 : -1,
  )
  const horizontalBounds = [galaxy1[1], galaxy2[1]].sort((a, b) =>
    a > b ? 1 : -1,
  )
  expansionMap.rows.forEach((row) => {
    if (row > verticalBounds[0] && row < verticalBounds[1]) {
      verticalSteps += expansionSize
    }
  })
  expansionMap.columns.forEach((column) => {
    if (column > horizontalBounds[0] && column < horizontalBounds[1]) {
      horizontalSteps += expansionSize
    }
  })
  verticalSteps += Math.abs(galaxy1[0] - galaxy2[0])
  horizontalSteps += Math.abs(galaxy1[1] - galaxy2[1])
  return verticalSteps + horizontalSteps
}

export const getSumOfGalaxyDistances = (
  input: string,
  expansionSize: number = 1,
): number => {
  const spaceMap = getSpaceMap(input)
  const galaxyPairs = getAllPairsFromArray(getAllGalaxies(spaceMap))
  const expansionMap = getSpaceMapExpansions(spaceMap)

  return galaxyPairs.reduce(
    (sum, galaxyPair) =>
      sum +
      getShortestDistanceBetweenGalaxies(
        galaxyPair,
        expansionMap,
        expansionSize,
      ),
    0,
  )
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/11.txt', 'utf8')
  return getSumOfGalaxyDistances(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/11.txt', 'utf8')
  return getSumOfGalaxyDistances(input, 999999)
}
