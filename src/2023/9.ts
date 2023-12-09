import { readFile } from 'fs/promises'

export const getNextValueInChain = (line: number[]): number => {
  const differences = line.reduce((acc, curr, index) => {
    if (index === 0) return acc
    return [...acc, curr - line[index - 1]]
  }, [])
  if (differences.every((d) => d === 0)) return line.at(-1)
  return line.at(-1) + getNextValueInChain(differences)
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/9.txt', 'utf8')
  return input
    .split('\n')
    .map((l) => l.split(' ').map(Number))
    .map(getNextValueInChain)
    .reduce((acc, curr) => acc + curr, 0)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/9.txt', 'utf8')
  return input
    .split('\n')
    .map((l) => l.split(' ').map(Number).reverse()) // Just reversing the input does the trick here
    .map(getNextValueInChain)
    .reduce((acc, curr) => acc + curr, 0)
}
