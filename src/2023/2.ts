import { readFile } from 'fs/promises'

type CubeColors = 'red' | 'blue' | 'green'
type Game = string
type GameSet = string
type Input = string
export interface CubeAmounts {
  red: number
  blue: number
  green: number
}
/**
 * Terminology:
 * Game =  "3 blue, 4 red"
 * GameSet = line of Input: "Game 4: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"..
 * Input = {@link file://./inputs/2.txt}
 */

const cleanGameSetInput = (gameSet: GameSet): GameSet =>
  gameSet.startsWith('Game ') ? gameSet.split(': ')[1] : gameSet
export const getGameIdFromGameSet = (line: GameSet): number =>
  parseInt(line.split(': ')[0].replace('Game ', ''))

export const getSingleGameCubeAmount = (game: Game): CubeAmounts => {
  const cubes = game.split(', ')
  const cubeAmounts: CubeAmounts = {
    red: 0,
    blue: 0,
    green: 0,
  }
  cubes.forEach((cube) => {
    const [amount, color] = cube.split(' ')
    cubeAmounts[color as CubeColors] = parseInt(amount)
  })
  return cubeAmounts
}

export const getMinimumCubesForGameSet = (gameSet: GameSet): CubeAmounts => {
  const games = gameSet.split('; ')
  const cubeAmounts: CubeAmounts = {
    red: 0,
    blue: 0,
    green: 0,
  }
  games.forEach((game) => {
    const gameCubeAmounts = getSingleGameCubeAmount(game)
    Object.keys(gameCubeAmounts).forEach((color) => {
      cubeAmounts[color as CubeColors] = Math.max(
        cubeAmounts[color as CubeColors],
        gameCubeAmounts[color as CubeColors],
      )
    })
  })
  return cubeAmounts
}

export const isGameSetPossible = (
  gameSet: GameSet,
  maxCubeAmounts: CubeAmounts,
): boolean => {
  const cleanedGameSet = cleanGameSetInput(gameSet)
  const minCubes = getMinimumCubesForGameSet(cleanedGameSet)
  return Object.keys(minCubes).every(
    (color) =>
      minCubes[color as CubeColors] <= maxCubeAmounts[color as CubeColors],
  )
}

export const getSumofPossibleGameIds = (
  input: Input,
  cubeAmounts: CubeAmounts,
): number => {
  const lines = input.split('\n').filter((l) => l.length)
  return lines.reduce((acc, line) => {
    const isPossible = isGameSetPossible(line, cubeAmounts)
    if (!isPossible) return acc
    return acc + getGameIdFromGameSet(line)
  }, 0)
}

export const getPowerOfMinimumCubesForGameSet = (gameSet: GameSet): number => {
  const cleanedGameSet = cleanGameSetInput(gameSet)
  const cubes = getMinimumCubesForGameSet(cleanedGameSet)
  return Object.values(cubes).reduce((acc, cube) => acc * cube, 1)
}

export const getInputSumOfMinimumCubesPower = (input: Input): number => {
  const lines = input.split('\n').filter((l) => l.length)
  return lines.reduce(
    (acc, line) => acc + getPowerOfMinimumCubesForGameSet(line),
    0,
  )
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/2.txt', 'utf8')
  return getSumofPossibleGameIds(input, {
    red: 12,
    green: 13,
    blue: 14,
  })
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/2.txt', 'utf8')
  return getInputSumOfMinimumCubesPower(input)
}
