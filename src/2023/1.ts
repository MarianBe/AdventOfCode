import { readFile } from 'fs/promises'
// Note: After finishing part2 i realized it would probably be easier to just use findIndex and findLastIndex for all possible values
// and then getting the lowest index possible, but i don't have time to refactor this now

type NumberStrings =
  | 'one'
  | 'two'
  | 'three'
  | 'four'
  | 'five'
  | 'six'
  | 'seven'
  | 'eight'
  | 'nine'

export const mapNumberStringToNumber = (input: NumberStrings): string => {
  switch (input) {
    case 'one':
      return '1'
    case 'two':
      return '2'
    case 'three':
      return '3'
    case 'four':
      return '4'
    case 'five':
      return '5'
    case 'six':
      return '6'
    case 'seven':
      return '7'
    case 'eight':
      return '8'
    case 'nine':
      return '9'
    default:
      throw new Error('Invalid input')
  }
}

// Replace the first and last numberString with the number per line, the others are left as is
export const replaceLineStringNumbers = (input: string): string => {
  const numberStrings: NumberStrings[] = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ]

  const firstMatch = numberStrings
    .map((number) => ({ number, index: input.indexOf(number) }))
    .filter((n) => n.index !== -1)
    .sort((a, b) => a.index - b.index)[0]

  if (!firstMatch) {
    return input
  }

  const lastMatch = numberStrings
    .map((number) => ({ number, index: input.lastIndexOf(number) }))
    .sort((a, b) => b.index - a.index)[0]

  if (firstMatch.index === lastMatch.index) {
    return (
      input.slice(0, firstMatch.index) +
      mapNumberStringToNumber(firstMatch.number) +
      input.slice(firstMatch.index + firstMatch.number.length)
    )
  }

  return (
    input.slice(0, firstMatch.index) +
    mapNumberStringToNumber(firstMatch.number) +
    input.slice(firstMatch.index + firstMatch.number.length, lastMatch.index) +
    mapNumberStringToNumber(lastMatch.number) +
    input.slice(lastMatch.index + lastMatch.number.length)
  )
}

export const lineCalibrationValue = (input: string): number => {
  const numbers = input
    .split('')
    .filter((c) => c.match(/\d/))
    .map(Number)

  return parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`)
}

export const calibrationValue = (input: string): number => {
  const lines = input.split('\n').filter((l) => l.length)
  return lines.reduce((acc, line) => acc + lineCalibrationValue(line), 0)
}

export const calibrationValueWithReplacement = (input: string): number => {
  const lines = input.split('\n').filter((l) => l.length)
  return lines
    .map(replaceLineStringNumbers)
    .reduce((acc, line) => acc + lineCalibrationValue(line), 0)
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/1.txt', 'utf8')
  return calibrationValue(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/1.txt', 'utf8')
  return calibrationValueWithReplacement(input)
}
