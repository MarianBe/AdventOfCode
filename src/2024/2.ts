import { readFile } from 'fs/promises'

type Report = number[]
type Reports = Report[]

export const splitInputToReports = (input: string): Reports => {
  return input.split('\n').map((line) => line.split(' ').map(Number))
}

type Direction = 'inc' | 'dec'
export const checkKeepsDecreasingOrIncreasing = (
  prev: number | undefined,
  curr: number,
  direction?: Direction | false,
): Direction | false | undefined => {
  if (!prev) return undefined
  if (curr === prev) return false
  if (direction === 'inc' && curr <= prev) return false
  if (direction === 'dec' && curr >= prev) return false
  return curr > prev ? 'inc' : 'dec'
}

export const checkIfInDistance = (
  prev: number,
  curr: number,
  min: number,
  max: number,
): boolean => Math.abs(prev - curr) >= min && Math.abs(prev - curr) <= max

export const checkIfReportIsValid = (
  report: Report,
  allowOneError: boolean = false,
): boolean => {
  let direction: Direction | false | undefined = undefined
  let isValid = true
  let index = 0
  for (const curr of report) {
    const currentIndex = index++
    if (currentIndex === 0) continue
    const prev = report[currentIndex - 1]
    direction = checkKeepsDecreasingOrIncreasing(prev, curr, direction)
    if (direction === false || !checkIfInDistance(prev, curr, 1, 3)) {
      isValid = false
      break
    }
  }

  if (allowOneError && !isValid) {
    const newEmptyArray = new Array(report.length)
      .fill(0)
      .map((_v, index) => index)

    return newEmptyArray.some((index) => {
      const copiedReport = [...report]
      copiedReport.splice(index, 1)
      return checkIfReportIsValid(copiedReport, false)
    })
  }
  return isValid
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/2.txt', 'utf8')
  return splitInputToReports(input).reduce((acc, curr) => {
    if (checkIfReportIsValid(curr)) return acc + 1
    return acc
  }, 0)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/2.txt', 'utf8')
  return splitInputToReports(input).reduce((acc, curr) => {
    if (checkIfReportIsValid(curr, true)) return acc + 1
    return acc
  }, 0)
}
