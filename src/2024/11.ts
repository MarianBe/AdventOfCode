import { readFile } from 'fs/promises'

export const blinkStone = (stone: string): string[] => {
  if (stone === '0') return ['1']
  if (stone.length % 2 === 0) {
    const halfSize = stone.length / 2
    return [
      stone.slice(0, halfSize),
      parseInt(stone.slice(-halfSize), 10).toString(),
    ]
  }
  return [`${parseInt(stone, 10) * 2024}`]
}

export const blinkInputStones = (input: string, times: number) => {
  const stones = input.split(' ')
  const stoneMap = new Map()
  stones.forEach((stone) => stoneMap.set(stone, 1))
  for (let i = 0; i < times; i++) {
    Array.from(stoneMap.entries()).forEach(([stone, size]) => {
      stoneMap.set(stone, stoneMap.get(stone) - size)
      const blinked = blinkStone(stone)
      blinked.forEach((bl) => {
        stoneMap.set(bl, (stoneMap.get(bl) ?? 0) + size)
      })
    })
  }

  return Array.from(stoneMap.values()).reduce((acc, size) => acc + size, 0)
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/11.txt', 'utf8')
  return blinkInputStones(input, 25)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/11.txt', 'utf8')
  return blinkInputStones(input, 75)
}
