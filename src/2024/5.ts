import { readFile } from 'fs/promises'

type OrderingRules = Set<string>
type Update = number[]
export const parseInput = (input: string): [OrderingRules, Update[]] => {
  const [_rules, _updates] = input.split('\n\n')
  return [
    new Set(_rules.split('\n')),
    _updates
      .split('\n')
      .map((_update) => _update.split(',').map(Number)) as Update[],
  ]
}

export const isUpdateValid = (rules: OrderingRules, update: Update) => {
  return update.every((num, index) => {
    if (index === update.length - 1) return true
    const nextNumber = update[index + 1]
    return !rules.has(`${nextNumber}|${num}`)
  })
}
export const getPageNumbersFromInput = (input: string) => {
  const [rules, updates] = parseInput(input)
  return updates
    .filter((u) => isUpdateValid(rules, u))
    .map((u) => u[Math.floor(u.length / 2)])
    .reduce((acc, num) => num + acc, 0)
}

export const makeUpdateValid = (rules: OrderingRules, _update: Update) => {
  const update = [..._update]
  update.forEach((num, index) => {
    if (index !== update.length - 1) {
      const nextNumber = update[index + 1]
      if (rules.has(`${nextNumber}|${num}`)) {
        update[index] = nextNumber
        update[index + 1] = num
      }
    }
  })
  return isUpdateValid(rules, update) ? update : makeUpdateValid(rules, update)
}

export const getInvalidPageNumbersFromInput = (input: string) => {
  const [rules, updates] = parseInput(input)
  return updates
    .filter((u) => !isUpdateValid(rules, u))
    .map((u) => makeUpdateValid(rules, u))
    .map((u) => u[Math.floor(u.length / 2)])
    .reduce((acc, num) => num + acc, 0)
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/5.txt', 'utf8')
  return getPageNumbersFromInput(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/5.txt', 'utf8')
  return getInvalidPageNumbersFromInput(input)
}
