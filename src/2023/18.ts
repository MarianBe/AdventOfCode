import { readFile } from 'fs/promises'
type Direction = 'R' | 'L' | 'U' | 'D'
interface Instruction {
  direction: Direction
  steps: number
}
const DIRECTIONS: Direction[] = ['R', 'D', 'L', 'U']
export const parseInput = (
  input: string,
  convertColor: boolean = false,
): Instruction[] => {
  const lines = input.split('\n')
  if (convertColor) {
    return lines.map((line) => {
      const [, , color] = line
        .trim()
        .split(' ')
        .map((s) => s.replace(/[#()]/g, ''))
      return {
        direction: DIRECTIONS[parseInt(color.slice(-1), 10)],
        steps: parseInt(color.slice(0, 5), 16),
      }
    })
  }
  return lines.map((line) => {
    const [direction, steps] = line.trim().split(' ')

    return {
      direction: direction as 'R' | 'L' | 'U' | 'D',
      steps: Number(steps),
    }
  })
}

export const getTrenchArea = (
  input: string,
  convertColor: boolean = false,
): number => {
  const parsed = parseInput(input, convertColor)
  const currentCoords = [0, 0]
  let area = 1
  let perimeter = 1

  parsed.forEach(({ direction, steps }) => {
    const [prevX, prevY] = [...currentCoords]
    if (direction === 'R') {
      currentCoords[0] += steps
    } else if (direction === 'L') {
      currentCoords[0] -= steps
    } else if (direction === 'U') {
      currentCoords[1] -= steps
    } else {
      currentCoords[1] += steps
    }
    perimeter += steps
    area += prevX * currentCoords[1] - prevY * currentCoords[0]
  })
  return Math.abs(area / 2) + perimeter / 2
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/18.txt', 'utf8')
  return getTrenchArea(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/18.txt', 'utf8')
  return getTrenchArea(input, true)
}
