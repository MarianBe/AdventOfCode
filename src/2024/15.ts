import { readFile } from 'fs/promises'
import {
  Coordinates,
  Directions,
  findCoordinatesIn2DimensionalArray,
  getOffsetForDirection,
  to2DimensionalArray,
} from '@helpers'

const InstructionsMap: Record<string, Directions> = {
  '<': 'l',
  '^': 't',
  '>': 'r',
  v: 'b',
}
type WarehouseObject = '#' | 'O' | '@' | '.' | '[' | ']'

type WarehouseMap = WarehouseObject[][]

export const parseInput = (input: string): [WarehouseMap, Directions[]] => {
  const [_map, _instructions] = input.split('\n\n')
  const map = to2DimensionalArray<WarehouseMap>(_map)
  const instructions: Directions[] = _instructions
    .split('')
    .map((i) => InstructionsMap[i])
  return [map, instructions]
}

export const expandMap = (map: WarehouseMap): WarehouseMap => {
  return map.map((row) =>
    row
      .map((char) => {
        if (char === '#') return ['#', '#']
        if (char === 'O') return ['[', ']']
        if (char === '.') return ['.', '.']
        return ['@', '.']
      })
      .flat(),
  ) as WarehouseMap
}

export const moveThroughWarehouse = (
  map: WarehouseMap,
  coordinates: Coordinates,
  direction: Directions,
  dryrun: boolean = false,
) => {
  const currentObject = map[coordinates[0]][coordinates[1]]
  const nextObjectCoordinates = getOffsetForDirection(direction, coordinates)
  const nextObject = map[nextObjectCoordinates[0]][nextObjectCoordinates[1]]

  // If we hit a wall this move is not valid
  if (nextObject === '#') return false

  // We're doing a dryrun and the next space is free, return true
  if (nextObject === '.' && dryrun) return true

  if (nextObject === '.') {
    // Execute the actual move
    map[nextObjectCoordinates[0]][nextObjectCoordinates[1]] = currentObject
    map[coordinates[0]][coordinates[1]] = '.'
    return true
  }

  // Handle the edge-cases of vertically moving 2-wide boxes
  if (['[', ']'].includes(nextObject) && ['t', 'b'].includes(direction)) {
    const otherSideCoordinates = getOffsetForDirection(
      nextObject === '[' ? 'r' : 'l',
      nextObjectCoordinates,
    )
    // We're recursively checking if all sides are allowed first before commiting
    const allowed = [nextObjectCoordinates, otherSideCoordinates].every((c) =>
      moveThroughWarehouse(map, c, direction, true),
    )
    if (dryrun) return allowed

    return (
      allowed &&
      moveThroughWarehouse(map, nextObjectCoordinates, direction) &&
      moveThroughWarehouse(map, otherSideCoordinates, direction) &&
      moveThroughWarehouse(map, coordinates, direction)
    )
  }

  if (['[', ']', 'O'].includes(nextObject)) {
    // Next Block is a box, try moving the box first and then retry
    return (
      moveThroughWarehouse(map, nextObjectCoordinates, direction) &&
      moveThroughWarehouse(map, coordinates, direction)
    )
  }

  return false
}

export const getGPSCoordinates = (
  input: string,
  expanded: boolean = false,
): number => {
  const [_map, instructions] = parseInput(input)
  const map = expanded ? expandMap(_map) : _map
  instructions.forEach((instruction) => {
    moveThroughWarehouse(
      map,
      findCoordinatesIn2DimensionalArray(map, '@'),
      instruction,
    )
  })
  return map.reduce(
    (accY, row, Y) =>
      accY +
      row.reduce((accX, char, X) => {
        if (char === 'O' || char === '[') return accX + 100 * Y + X
        return accX
      }, 0),
    0,
  )
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/15.txt', 'utf8')
  return getGPSCoordinates(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/15.txt', 'utf8')
  return getGPSCoordinates(input, true)
}
