import {
  CubeAmounts,
  getSingleGameCubeAmount,
  getGameIdFromGameSet,
  getMinimumCubesForGameSet,
  isGameSetPossible,
  getSumofPossibleGameIds,
  getPowerOfMinimumCubesForGameSet,
  getInputSumOfMinimumCubesPower,
} from './2'

const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

const gameSets = testInput.split('\n')
const cubeAmounts: CubeAmounts = {
  red: 12,
  green: 13,
  blue: 14,
}

describe('day02Part01', () => {
  it('should extract the gameId from a line', () => {
    expect(getGameIdFromGameSet(gameSets[0])).toEqual(1)
    expect(getGameIdFromGameSet(gameSets[1])).toEqual(2)
  })
  it('should let me know if gamesets are possible', () => {
    expect(isGameSetPossible(gameSets[0], cubeAmounts)).toEqual(true)
    expect(isGameSetPossible(gameSets[1], cubeAmounts)).toEqual(true)
    expect(isGameSetPossible(gameSets[2], cubeAmounts)).toEqual(false)
    expect(isGameSetPossible(gameSets[3], cubeAmounts)).toEqual(false)
    expect(isGameSetPossible(gameSets[4], cubeAmounts)).toEqual(true)
  })
  it('should return correct values for possible gamesets', () => {
    expect(getSumofPossibleGameIds(gameSets[0], cubeAmounts)).toEqual(1)
    expect(getSumofPossibleGameIds(gameSets[1], cubeAmounts)).toEqual(2)
    expect(getSumofPossibleGameIds(gameSets[2], cubeAmounts)).toEqual(0)
    expect(getSumofPossibleGameIds(gameSets[3], cubeAmounts)).toEqual(0)
    expect(getSumofPossibleGameIds(gameSets[4], cubeAmounts)).toEqual(5)
  })
  it('should return correct sum of for a whole game', () => {
    expect(getSumofPossibleGameIds(testInput, cubeAmounts)).toEqual(8)
  })
})

describe('day02Part02', () => {
  it('should return cube amounts for games', () => {
    expect(getSingleGameCubeAmount('3 blue, 4 red')).toEqual({
      red: 4,
      green: 0,
      blue: 3,
    })
  })
  it('should return minimum amounts for gamesets', () => {
    expect(
      getMinimumCubesForGameSet(
        '3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
      ),
    ).toEqual({
      red: 4,
      green: 2,
      blue: 6,
    })
  })
  it('should return correct power of minimum cubes for gamesets', () => {
    expect(getPowerOfMinimumCubesForGameSet(gameSets[0])).toEqual(48)
    expect(getPowerOfMinimumCubesForGameSet(gameSets[1])).toEqual(12)
    expect(getPowerOfMinimumCubesForGameSet(gameSets[2])).toEqual(1560)
    expect(getPowerOfMinimumCubesForGameSet(gameSets[3])).toEqual(630)
    expect(getPowerOfMinimumCubesForGameSet(gameSets[4])).toEqual(36)
  })
  it('should return correct sum of for a whole game input', () => {
    expect(getInputSumOfMinimumCubesPower(testInput)).toEqual(2286)
  })
})
