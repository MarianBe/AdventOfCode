import { readFile } from 'fs/promises'

export type TestValue = number
export type Numbers = number[]
export type Operators = '*' | '+' | '||'

export const parseInput = (input: string): [TestValue, Numbers][] => {
  const _lines = input.split('\n').map((l) => l.split(': '))
  return _lines.map(([_testValue, _numbers]) => [
    Number(_testValue),
    _numbers.split(' ').map(Number),
  ])
}
export const calculate = (a: number, b: number, operator: Operators) => {
  switch (operator) {
    case '+':
      return a + b
    case '*':
      return a * b
    case '||':
      return Number(`${a}${b}`)
  }
}
export const recursivelyCheckNumbers = (
  testValue: TestValue,
  numbers: Numbers,
  operators: Operators[] = ['*', '+'] as const,
): boolean => {
  if (numbers[0] > testValue) return false
  if (numbers.length === 1) return numbers[0] === testValue
  return operators.some((operator) =>
    recursivelyCheckNumbers(
      testValue,
      [calculate(numbers[0], numbers[1], operator), ...numbers.slice(2)],
      operators,
    ),
  )
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/7.txt', 'utf8')
  const parsed = parseInput(input)
  return parsed.reduce(
    (acc, [testValue, numbers]) =>
      acc + (recursivelyCheckNumbers(testValue, numbers) ? testValue : 0),
    0,
  )
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/7.txt', 'utf8')
  const parsed = parseInput(input)
  return parsed.reduce(
    (acc, [testValue, numbers]) =>
      acc +
      (recursivelyCheckNumbers(testValue, numbers, ['+', '*', '||']) ? testValue
      : 0),
    0,
  )
}
