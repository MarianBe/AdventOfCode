import { readFile } from 'fs/promises'

type CardNumbers = [number[], number[]]

export const getNumbersFromCard = (card: string): CardNumbers => {
  const cleanedInput = card.startsWith('Card') ? card.split(':')[1] : card
  const [winningNumbers, losingNumbers] = cleanedInput
    .split('|')
    .map((numbers) =>
      numbers
        .split(' ')
        .filter((n) => n)
        .map((num) => parseInt(num)),
    )
  return [winningNumbers, losingNumbers]
}

export const getPointsFromCardNumbers = (numbers: CardNumbers): number => {
  const [winning, playing] = numbers
  return playing.reduce((acc, num) => {
    if (winning.includes(num)) {
      return acc === 0 ? 1 : acc * 2
    }
    return acc
  }, 0)
}

export const getAmountOfWinningNumbers = (numbers: CardNumbers): number => {
  const [winning, playing] = numbers
  return playing.reduce((acc, num) => {
    if (winning.includes(num)) {
      return acc + 1
    }
    return acc
  }, 0)
}

export const getPointsForInput = (input: string): number => {
  const splitLines = input.split('\n')
  return splitLines.reduce((acc, line) => {
    const numbers = getNumbersFromCard(line)
    return acc + getPointsFromCardNumbers(numbers)
  }, 0)
}

export const getInputsCardAmount = (input: string) => {
  const splitLines = input.split('\n')
  const copiesMap = new Array(splitLines.length).fill(1)

  splitLines.forEach((line, index) => {
    const amountOfCopies = copiesMap[index]
    const winningNumbers = getAmountOfWinningNumbers(getNumbersFromCard(line))
    if (winningNumbers > 0) {
      for (let i = 1; i <= winningNumbers; i++) {
        copiesMap[index + i] += amountOfCopies
      }
    }
  })

  return copiesMap.reduce((acc, copies) => {
    return acc + copies
  }, 0)
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/4.txt', 'utf8')
  return getPointsForInput(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/4.txt', 'utf8')
  return getInputsCardAmount(input)
}
