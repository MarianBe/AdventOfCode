import { readFile } from 'fs/promises'

export type Position = [number, number]
type PlantMap = string[][]

export const getPlantMap = (input: string): PlantMap =>
  input.split('\n').map((line) => line.split(''))

export const positionToString = ([y, x]: Position): string => `${y}|${x}`

export const recursiveCheckPlantGroup = (
  plant: string,
  [Y, X]: Position,
  plantmap: PlantMap,
  alreadyVisited: Set<string>,
): [number, number, number] => {
  let area = 0
  let perimeter = 0
  let sides = 0
  const neighbours: Position[] = [
    [Y - 1, X],
    [Y + 1, X],
    [Y, X - 1],
    [Y, X + 1],
  ]

  alreadyVisited.add(positionToString([Y, X]))
  area++
  sides += getCornersForPosition([Y, X], plantmap)
  neighbours.forEach((neighbour) => {
    const neighbourPlantDifferent =
      plantmap?.[neighbour[0]]?.[neighbour[1]] !== plant
    if (neighbourPlantDifferent) {
      perimeter++
      return
    }
    if (alreadyVisited.has(positionToString(neighbour))) {
      return
    }
    const check = recursiveCheckPlantGroup(
      plant,
      neighbour,
      plantmap,
      alreadyVisited,
    )
    area += check[0]
    perimeter += check[1]
    sides += check[2]
  })
  return [area, perimeter, sides]
}

export const getCornersForPosition = (
  [Y, X]: Position,
  plantMap: PlantMap,
): number => {
  let corners = 0
  const plant = plantMap[Y][X]
  const [tl, t, tr, l, r, bl, b, br] = [
    [Y - 1, X - 1],
    [Y - 1, X],
    [Y - 1, X + 1],
    [Y, X - 1],
    [Y, X + 1],
    [Y + 1, X - 1],
    [Y + 1, X],
    [Y + 1, X + 1],
  ].map((pos) => plantMap?.[pos[0]]?.[pos[1]])

  // TopLeftOuterCorner
  if (t !== plant && l !== plant) corners++

  // TopRightOuterCorner
  if (t !== plant && r !== plant) corners++

  // BottomLeftOuterCorner
  if (b !== plant && l !== plant) corners++

  // BottomRightOuterCorner
  if (b !== plant && r !== plant) corners++

  // TopLeftInnerCorner
  if (tl !== plant && t === plant && l === plant) corners++

  // TopRightInnerCorner
  if (tr !== plant && t === plant && r === plant) corners++

  // BottomLeftInnerCorner
  if (bl !== plant && b === plant && l === plant) corners++

  // BottomRightInnerCorner
  if (br !== plant && b === plant && r === plant) corners++

  return corners
}

export const getFenceSize = (
  input: string,
  useSides: boolean = false,
): number => {
  const plantMap = getPlantMap(input)
  const visited = new Set<string>()

  return plantMap.reduce(
    (acc, line, Y) =>
      acc +
      line.reduce((accLine, plant, X) => {
        if (visited.has(positionToString([Y, X]))) {
          return accLine
        }
        const [area, perimeter, sides] = recursiveCheckPlantGroup(
          plant,
          [Y, X],
          plantMap,
          visited,
        )
        return accLine + area * (useSides ? sides : perimeter)
      }, 0),
    0,
  )
}
export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/12.txt', 'utf8')
  return getFenceSize(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/12.txt', 'utf8')
  return getFenceSize(input, true)
}
