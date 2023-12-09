import { readFile } from 'fs/promises'

export const getNextValueInChain = (
  line: number[],
  position: 'start' | 'end' = 'end',
): number => {
  const at = position === 'start' ? 0 : -1
  const differences = line.reduce((acc, curr, index) => {
    if (index === 0) {
      return acc
    }
    return [...acc, curr - line[index - 1]]
  }, [])
  if (differences.every((d) => d === 0)) {
    return line.at(at)
  }
  if (position === 'start')
    return line.at(at) - getNextValueInChain(differences, position)
  return line.at(at) + getNextValueInChain(differences, position)
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/9.txt', 'utf8')
  return input
    .split('\n')
    .map((l) => l.split(' ').map(Number))
    .map((v) => getNextValueInChain(v))
    .reduce((acc, curr) => acc + curr, 0)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/9.txt', 'utf8')
  return input
    .split('\n')
    .map((l) => l.split(' ').map(Number))
    .map((v) => getNextValueInChain(v, 'start'))
    .reduce((acc, curr) => acc + curr, 0)
}
