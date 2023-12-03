import { readFile } from 'fs/promises'

export type Coordinates = [x: number, y: number]

export type FoundNumber = {
  start: Coordinates
  end: Coordinates
  value: number
  length: number
}
const numberRegex = /[0-9]/
export const getSymbolsMap = (
  inputLines: string[],
  symbols: string[],
): Coordinates[] => {
  const symbolsMap: Coordinates[] = []
  // regex that matches anything except . and numbers
  inputLines.forEach((line, lineIndex) => {
    line.split('').forEach((symbol, symbolIndex) => {
      if (symbols.includes(symbol)) {
        symbolsMap.push([symbolIndex, lineIndex])
      }
    })
  })
  return symbolsMap
}

export const getNumberFromCoordinates = (
  inputLines: string[],
  coordinates: Coordinates,
): FoundNumber => {
  const start: Coordinates = [...coordinates]
  const end: Coordinates = [...coordinates]
  while (inputLines[start[1]][start[0] - 1]?.match(numberRegex)) {
    start[0]--
  }
  while (inputLines[end[1]][end[0] + 1]?.match(numberRegex)) {
    end[0]++
  }
  const length = end[0] - start[0] + 1
  const value = Number(inputLines[start[1]].slice(start[0], end[0] + 1))
  return {
    start,
    end,
    value,
    length,
  }
}

const checkNumberExistingAtCoordinate = (
  inputLines: string[],
  coordinates: Coordinates,
) => {
  const [x, y] = coordinates
  return inputLines[y][x] && inputLines[y][x].match(numberRegex)
}

export const getAdjacentNumbers = (
  inputLines: string[],
  symbolsMap: Coordinates[],
): FoundNumber[] => {
  const adjacentNumbers = new Map<string, FoundNumber>()

  const checkAndSetNumberAtCoordinate = (coordinates: Coordinates) => {
    if (checkNumberExistingAtCoordinate(inputLines, coordinates)) {
      const number = getNumberFromCoordinates(inputLines, coordinates)
      adjacentNumbers.set(number.start.join(','), number)
    }
  }

  symbolsMap.forEach((coordinates) => {
    const [x, y] = coordinates
    // left
    checkAndSetNumberAtCoordinate([x - 1, y])
    // right
    checkAndSetNumberAtCoordinate([x + 1, y])
    // top
    checkAndSetNumberAtCoordinate([x, y - 1])
    // bottom
    checkAndSetNumberAtCoordinate([x, y + 1])
    // top left
    checkAndSetNumberAtCoordinate([x - 1, y - 1])
    // top right
    checkAndSetNumberAtCoordinate([x + 1, y - 1])
    // bottom left
    checkAndSetNumberAtCoordinate([x - 1, y + 1])
    // bottom right
    checkAndSetNumberAtCoordinate([x + 1, y + 1])
  })

  return [...adjacentNumbers.values()]
}

export const getSumOfNumbersFromInput = (input: string): number => {
  const inputLines = input.split('\n')
  const symbolsMap = getSymbolsMap(inputLines, [
    '*',
    '#',
    '+',
    '$',
    '/',
    '@',
    '%',
    '=',
    '&',
    '-',
  ])
  const adjacentNumbers = getAdjacentNumbers(inputLines, symbolsMap)
  return adjacentNumbers.reduce((acc, { value }) => acc + value, 0)
}

export const getGearRatioFromInput = (input: string): number => {
  const inputLines = input.split('\n')
  const symbolsMap = getSymbolsMap(inputLines, ['*'])

  const gearRatioSum = symbolsMap.reduce((acc, coordinates: Coordinates) => {
    const adjacentNumbers = getAdjacentNumbers(inputLines, [coordinates])
    if (adjacentNumbers.length !== 2) {
      return acc
    }
    return adjacentNumbers[0].value * adjacentNumbers[1].value + acc
  }, 0)
  return gearRatioSum
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/3.txt', 'utf8')
  return getSumOfNumbersFromInput(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/3.txt', 'utf8')
  return getGearRatioFromInput(input)
}
