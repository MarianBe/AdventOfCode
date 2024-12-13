import { readFile } from 'fs/promises'
import { stringify, Coordinates } from '@helpers'

interface Game {
  A: Coordinates
  B: Coordinates
  Prize: Coordinates
}
export const getGames = (input: string): Game[] =>
  input.split('\n\n').map((game) => {
    const [_A, _B, _Prize] = game.split('\n')
    const A = _A
      .split('+')
      .slice(1)
      .map((n) => parseInt(n.replace(', Y', ''), 10)) as Game['A']
    const B = _B
      .split('+')
      .slice(1)
      .map((n) => parseInt(n.replace(', Y', ''), 10)) as Game['B']

    const Prize = _Prize
      .split('=')
      .slice(1)
      .map((n) => parseInt(n.replace(', Y', ''), 10)) as Game['Prize']
    return {
      A,
      B,
      Prize,
    }
  })

// I got the actual equation from reddit, as this was a friday afternoon and my brain was not ready for some algebra
// source: https://www.reddit.com/r/adventofcode/comments/1hd7irq/2024_day_13_an_explanation_of_the_mathematics/
// A = (p_x*b_y - prize_y*b_x) / (a_x*b_y - a_y*b_x)
// B = (a_x*p_y - a_y*p_x) / (a_x*b_y - a_y*b_x)
export const getCheapestButtonPressWithMath = ({
  A,
  B,
  Prize,
}: Game): [number, number] | undefined => {
  const aPresses = Math.round(
    (Prize[0] * B[1] - Prize[1] * B[0]) / (A[0] * B[1] - A[1] * B[0]),
  )
  const bPresses = Math.round(
    (Prize[1] * A[0] - Prize[0] * A[1]) / (A[0] * B[1] - A[1] * B[0]),
  )
  if (
    stringify([
      aPresses * A[0] + bPresses * B[0],
      aPresses * A[1] + bPresses * B[1],
    ]) !== stringify(Prize)
  )
    return undefined
  return [aPresses, bPresses]
}

export const getCheapestButtonPresses = (
  { A, B, Prize }: Game,
  maxPresses: number = 100,
): [number, number] | undefined => {
  let bButtonPresses = Math.min(
    Math.ceil(Prize[0] / B[0]),
    Math.ceil(Prize[1] / B[1]),
  )
  let aButtonPresses = 0
  const calc = () => {
    return [
      aButtonPresses * A[0] + bButtonPresses * B[0],
      aButtonPresses * A[1] + bButtonPresses * B[1],
    ]
  }

  while (aButtonPresses < maxPresses && bButtonPresses >= 0) {
    const coords = calc()
    if (stringify(coords) === stringify(Prize)) break
    if (coords[0] > Prize[0] || coords[1] > Prize[1]) {
      bButtonPresses--
      continue
    }
    if (coords[0] <= Prize[0] && coords[1] <= Prize[1]) {
      aButtonPresses++
      continue
    }
    break
  }
  if (stringify(calc()) !== stringify(Prize)) return undefined
  return [aButtonPresses, bButtonPresses]
}

export const getMinimumAmountOfTokens = (
  input: string,
  part2: boolean = false,
): number => {
  const games = getGames(input)
  return games.reduce((acc, game) => {
    const buttonPresses = getCheapestButtonPressWithMath({
      ...game,
      Prize: game.Prize.map((p) =>
        part2 ? p + 10000000000000 : p,
      ) as Coordinates,
    })
    if (!buttonPresses) return acc
    return acc + buttonPresses[0] * 3 + buttonPresses[1]
  }, 0)
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/13.txt', 'utf8')
  return getMinimumAmountOfTokens(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/13.txt', 'utf8')
  return getMinimumAmountOfTokens(input, true)
}
