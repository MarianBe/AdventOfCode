import { readFile } from 'fs/promises'
import {
  Coordinates,
  Directions,
  findCoordinatesIn2DimensionalArray,
  getOffsetForDirection,
  stringify,
  to2DimensionalArray,
} from '@helpers'

type Maze = ('#' | '.' | 'S' | 'E')[][]
type Backlog = {
  position: Coordinates
  direction: Directions
  score: number
  pathTaken: Coordinates[]
}
export const findCheapestRoute = (input: string): [number, number] => {
  const map = to2DimensionalArray<Maze>(input)
  let cheapestRoute = Infinity
  const pathOfCheapestRoute = new Set()
  const endpoint = stringify(findCoordinatesIn2DimensionalArray(map, 'E'))
  const visited = new Map<string, number>()
  // Add our first step as visited
  visited.set(stringify(findCoordinatesIn2DimensionalArray(map, 'S'), 'r'), 0)

  const backlog: Backlog[] = [
    {
      position: findCoordinatesIn2DimensionalArray(map, 'S'),
      direction: 'r',
      score: 0,
      pathTaken: [findCoordinatesIn2DimensionalArray(map, 'S')],
    },
  ]

  while (backlog.length !== 0) {
    const currentStep = backlog.shift()
    const currentDirectionIndex = Directions.findIndex(
      (d) => d === currentStep.direction,
    )
    const nextSteps: Backlog[] = [
      // Turn right
      {
        position: currentStep.position,
        direction: Directions[(currentDirectionIndex + 1) % 4],
        score: currentStep.score + 1000,
        pathTaken: [...currentStep.pathTaken],
      },
      // Turn left
      {
        position: currentStep.position,
        direction: Directions[(currentDirectionIndex + 3) % 4],
        score: currentStep.score + 1000,
        pathTaken: [...currentStep.pathTaken],
      },
      // Turn around
      {
        position: currentStep.position,
        direction: Directions[(currentDirectionIndex + 2) % 4],
        score: currentStep.score + 2000,
        pathTaken: [...currentStep.pathTaken],
      },
      {
        position: getOffsetForDirection(
          currentStep.direction,
          currentStep.position,
        ),
        pathTaken: [
          ...currentStep.pathTaken,
          getOffsetForDirection(currentStep.direction, currentStep.position),
        ],
        direction: currentStep.direction,
        score: currentStep.score + 1,
      },
    ]
      .filter((step) => {
        const existingScore = visited.get(
          stringify(step.position, step.direction),
        )
        // Only continue if we don't have a score for this yet or if it is lower
        return existingScore === undefined || existingScore >= step.score
      })
      .filter((step) => {
        // Is the next step inside the map and not a wall
        const nextTile = map?.[step.position[0]]?.[step.position[1]]
        return nextTile && nextTile !== '#'
      })
    nextSteps.forEach((step) => {
      if (stringify(step.position) === endpoint) {
        if (cheapestRoute > step.score) {
          cheapestRoute = step.score
          pathOfCheapestRoute.clear()
          step.pathTaken.forEach((s) => pathOfCheapestRoute.add(stringify(s)))
        } else if (cheapestRoute === step.score) {
          step.pathTaken.forEach((s) => pathOfCheapestRoute.add(stringify(s)))
        }
      }
      const key = stringify(step.position, step.direction)
      if (!(step.score > visited.get(key))) {
        visited.set(key, step.score)
      }
    })

    backlog.push(...nextSteps)
  }

  return [cheapestRoute, pathOfCheapestRoute.size]
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/16.txt', 'utf8')
  console.log('🕒 This takes around 2 seconds, please wait 🕒')
  return findCheapestRoute(input)[0]
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/16.txt', 'utf8')
  console.log('🕒 This takes around 2 seconds, please wait 🕒')
  return findCheapestRoute(input)[1]
}
