import { readFile } from 'fs/promises'

// I used an online regex generator for this one
const mulRegex = new RegExp(/mul\(\d{1,3},\d{1,3}\)/gm)
const mulRegexWithConditionals = new RegExp(
  /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/gm,
)
export const retrievePatterns = (
  input: string,
  withConditionals: boolean = false,
): string[] => {
  return input.match(withConditionals ? mulRegexWithConditionals : mulRegex)
}

// Gets a string like mul(5,8) as input
export const getMultiplicationResult = (mul: string): number => {
  const [a, b] = mul
    .substring(4, mul.length - 1)
    .split(',')
    .map(Number)

  return a * b
}

export const computeInstructionsResult = (input: string): number => {
  const patterns = retrievePatterns(input)
  return patterns.reduce((acc, curr) => acc + getMultiplicationResult(curr), 0)
}

export const computeConditionalInstructionsResult = (input: string): number => {
  const patterns = retrievePatterns(input, true)
  let enabled = true
  return patterns.reduce((acc, curr) => {
    if (curr === 'do()') {
      enabled = true
      return acc
    }
    if (curr === "don't()") {
      enabled = false
    }
    if (!enabled) return acc
    return acc + getMultiplicationResult(curr)
  }, 0)
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/3.txt', 'utf8')
  return computeInstructionsResult(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/3.txt', 'utf8')
  return computeConditionalInstructionsResult(input)
}
