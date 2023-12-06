import { readFile } from 'fs/promises'

type Time = number
type Distance = number
type Records = [Time, Distance]

export const parseInput = (input: string): Records[] => {
  const [times, distances] = input
    .split('\n')
    .map((line) => line.split(':')[1].trim())
  const timesArray = times.split(/\s+/).map((time) => Number(time))
  const distancesArray = distances
    .split(/\s+/)
    .map((distance) => Number(distance))
  const records: Records[] = []
  timesArray.forEach((time, index) => {
    records.push([time, distancesArray[index]])
  })
  return records
}

export const parseInputIgnoringSpaces = (input: string): Records[] => {
  const [times, distances] = input
    .split('\n')
    .map((line) => line.split(':')[1].trim())
  const time = Number(times.split(/\s+/).join(''))
  const distance = Number(distances.split(/\s+/).join(''))
  // Returning array to keep compatibility with other functions
  return [[time, distance]]
}

export const getWinningHoldTimes = (record: Records): Time[] => {
  const [time, distance] = record
  const winningHoldTimes: Time[] = []
  for (let i = 0; i <= time; i++) {
    const timeToCoverDistance = time - i
    const timeHeld = i
    const distanceCovered = timeToCoverDistance * timeHeld
    if (distanceCovered > distance) {
      winningHoldTimes.push(timeHeld)
    }
  }
  return winningHoldTimes
}

export const getRecordsWinningHoldTimesProduct = (
  records: Records[],
): number => {
  return records.reduce((acc, record) => {
    const winningHoldTimes = getWinningHoldTimes(record)
    return acc * winningHoldTimes.length
  }, 1)
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/6.txt', 'utf8')
  return getRecordsWinningHoldTimesProduct(parseInput(input))
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/6.txt', 'utf8')
  return getRecordsWinningHoldTimesProduct(parseInputIgnoringSpaces(input))
}
