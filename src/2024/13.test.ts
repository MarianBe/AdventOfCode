import {
  getCheapestButtonPresses,
  getGames,
  getMinimumAmountOfTokens,
} from './13'

const testInput = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`

describe('day13Part01', () => {
  it('should get the cheapest button presses', () => {
    expect(getGames(testInput)[0]).toEqual({
      A: [94, 34],
      B: [22, 67],
      Prize: [8400, 5400],
    })

    expect(getCheapestButtonPresses(getGames(testInput)[0])).toEqual([80, 40])
    expect(getCheapestButtonPresses(getGames(testInput)[1])).toEqual(undefined)
    expect(getCheapestButtonPresses(getGames(testInput)[2])).toEqual([38, 86])
    expect(getCheapestButtonPresses(getGames(testInput)[3])).toEqual(undefined)
  })

  it('should get the minimum amount of tokens', () => {
    expect(getMinimumAmountOfTokens(testInput)).toEqual(480)
  })
})
