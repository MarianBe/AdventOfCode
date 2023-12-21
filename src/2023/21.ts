import { readFile } from 'fs/promises'

type Node = '#' | '.' | 'S'
type X = number
type Y = number
type Coordinates = [X, Y]
interface QueueItem {
  coordinates: Coordinates
  steps: number
}

export const parseInput = (input: string): Node[][] => {
  const lines = input.split('\n')
  const grid = lines.map((line) => line.trim().split('') as Node[])
  return grid
}
const getStartingPoint = (grid: Node[][]): Coordinates => {
  const y = grid.findIndex((line) => line.includes('S'))
  const x = grid[y].findIndex((node) => node === 'S')
  return [x, y]
}
const queueItemToString = (item: QueueItem): string => JSON.stringify(item)
const stringToQueueItem = (str: string): QueueItem => JSON.parse(str)

export const getReachableNodesAmount = (
  input: string,
  availableSteps: number,
  infinite: boolean = false,
): number => {
  const grid = parseInput(input)
  const gridHeight = grid.length
  const gridWidth = grid[0].length
  const startingPoint = getStartingPoint(grid)
  const finalNodes = new Set<string>()
  const queue = new Set<string>()
  queue.add(queueItemToString({ coordinates: startingPoint, steps: 0 }))

  while (!(queue.size === 0)) {
    const [_currentNode] = queue.entries().next().value
    queue.delete(_currentNode)
    const currentNode = stringToQueueItem(_currentNode)

    const [x, y] = currentNode.coordinates
    if (currentNode.steps === availableSteps) {
      finalNodes.add(currentNode.coordinates.join(','))
      continue
    }

    const possibleMoves = [
      [x, y - 1],
      [x, y + 1],
      [x - 1, y],
      [x + 1, y],
    ].filter(([_x, _y]) => {
      const x =
        infinite ?
          _x % gridWidth < 0 ?
            gridWidth + (_x % gridWidth)
          : _x % gridWidth
        : _x

      const y =
        infinite ?
          _y % gridHeight < 0 ?
            gridHeight + (_y % gridHeight)
          : _y % gridHeight
        : _y

      return grid[y]?.[x] === '.' || grid[y]?.[x] === 'S'
    })

    possibleMoves.forEach(([x, y]) => {
      queue.add(
        queueItemToString({
          coordinates: [x, y],
          steps: currentNode.steps + 1,
        }),
      )
    })
  }

  return finalNodes.size
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/21.txt', 'utf8')
  return getReachableNodesAmount(input, 64)
}

export const partTwo = async (): Promise<number> => {
  // To be honest, this was too much math for me to figure out
  // I eventually found the pattern for 65 + 131 * i
  // 131 is the maps width / height, 65 is the position of the starting point
  // and found the formula with https://www.dcode.fr/newton-interpolating-polynomial
  const steps = 26501365
  const x = (steps - 65) / 131
  return 14895 * Math.pow(x, 2) + 15001 * x + 3784
}
