import { readFile } from 'fs/promises'

const CARD_STRENGTHS = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
  'A',
] as const
type Card = (typeof CARD_STRENGTHS)[number]
type Hand = [Card, Card, Card, Card, Card]
type HandStrength = number
type GroupedHand = Record<Card, number>

export const groupHand = (hand: Hand): GroupedHand => {
  return hand.reduce((acc, card) => {
    if (!acc[card]) acc[card] = 0
    acc[card]++
    return acc
  }, {} as GroupedHand)
}

export const getHandStrength = (
  groupedHand: GroupedHand,
  useJokers: boolean = false,
): HandStrength => {
  const jokers = useJokers ? groupedHand?.['J'] : undefined

  if (jokers && jokers < 5) {
    delete groupedHand['J']
    Object.keys(groupedHand).forEach((card) => {
      groupedHand[card] += jokers
    })
  }
  // Five of a kind
  if (Object.keys(groupedHand).length === 1) return 7
  if (Object.keys(groupedHand).length === 2) {
    // Four of a kind
    if (Object.values(groupedHand).some((v) => v === 4)) return 6
    // Full house
    return 5
  }
  if (Object.keys(groupedHand).length === 3) {
    // Three of a kind
    if (Object.values(groupedHand).some((v) => v === 3)) return 4
    // Two pair
    return 3
  }

  if (Object.keys(groupedHand).length === 4) {
    // Pair
    return 2
  }
  // High card
  return 1
}

export const splitHandString = (handString: string): Hand => {
  return handString.split('') as Hand
}

export const getHandStrengthComparison = (
  handA: Hand,
  handB: Hand,
  useJokers: boolean = false,
): number => {
  const groupedHandA = groupHand(handA)
  const groupedHandB = groupHand(handB)

  const handStrengthA = getHandStrength(groupedHandA, useJokers)
  const handStrengthB = getHandStrength(groupedHandB, useJokers)

  if (handStrengthA === handStrengthB) {
    const mappedA = handA.map((card) =>
      useJokers && card === 'J' ? -1 : CARD_STRENGTHS.indexOf(card),
    )
    const mappedB = handB.map((card) =>
      useJokers && card === 'J' ? -1 : CARD_STRENGTHS.indexOf(card),
    )
    // map the cards to their strength and return the strongest one
    for (let i = 0; i < 5; i++) {
      if (mappedA[i] !== mappedB[i]) {
        return mappedA[i] - mappedB[i]
      }
    }
    return 0
  }

  return handStrengthA - handStrengthB
}

export const sumInputWinnings = (
  input: string,
  useJokers: boolean = false,
): number => {
  const bets: [Hand, number][] = input
    .split('\n')
    .map((line) => line.trim().split(' '))
    .map(([handString, bid]) => [
      splitHandString(handString),
      parseInt(bid, 10),
    ])

  return bets
    .sort((a, b) => getHandStrengthComparison(a[0], b[0], useJokers))
    .reduce((acc, [, bid], index) => {
      return acc + bid * (index + 1)
    }, 0)
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/7.txt', 'utf8')
  return sumInputWinnings(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/7.txt', 'utf8')
  return sumInputWinnings(input, true)
}
