import { readFile } from 'fs/promises'

export const getSetsFromInput = (input: string): string[] => {
  return input.split('\n\n')
}

export const isMirror = (a: number, b: number): boolean => {
  if (!a || !b) return true
  return a === b
}

export const isMapReflection = (
  binaryMap: number[],
  startIndex: number,
  width: number = 2,
): boolean => {
  const leftIndex = startIndex - 1
  const rightIndex = startIndex + width

  if (leftIndex < 0 || rightIndex > binaryMap.length - 1) return true

  if (binaryMap[leftIndex] !== binaryMap[rightIndex]) return false
  return isMapReflection(binaryMap, startIndex - 1, width + 2)
}

export const getHorizontalReflectionLine = (input: string): number => {
  let reflectionLineSum = 0
  const lines = input.split('\n')
  const binaryMapped = lines.map((line) =>
    line.split('').reduce((acc, char, index) => {
      if (char === '#') {
        return acc + Math.pow(2, index)
      }
      return acc
    }, 0),
  )
  const duplicateNeighbourIndexes = binaryMapped.reduce((acc, v, index) => {
    if (v === binaryMapped[index + 1]) {
      acc.push(index)
    }
    return acc
  }, [] as number[])
  duplicateNeighbourIndexes.forEach((duplicateNeighbourIndex) => {
    if (
      duplicateNeighbourIndex !== -1 &&
      isMapReflection(binaryMapped, duplicateNeighbourIndex)
    ) {
      reflectionLineSum += 100 * (duplicateNeighbourIndex + 1)
    }
  })
  return reflectionLineSum
}

export const getVerticalReflectionLine = (input: string): number => {
  let reflectionLineSum = 0
  const lines = input.split('\n')
  const verticalLines = lines[0]
    .split('')
    .map((_, colIndex) => lines.map((line) => line[colIndex]))
  const binaryMapped = verticalLines.map((line) =>
    line.reduce((acc, char, index) => {
      if (char === '#') {
        return acc + Math.pow(2, index)
      }
      return acc
    }, 0),
  )
  const duplicateNeighbourIndexes = binaryMapped.reduce((acc, v, index) => {
    if (v === binaryMapped[index + 1]) {
      acc.push(index)
    }
    return acc
  }, [] as number[])

  duplicateNeighbourIndexes.forEach((duplicateNeighbourIndex) => {
    if (
      duplicateNeighbourIndex !== -1 &&
      isMapReflection(binaryMapped, duplicateNeighbourIndex)
    ) {
      reflectionLineSum += duplicateNeighbourIndex + 1
    }
  })
  return reflectionLineSum
}
export const getSumOfInputReflections = (input: string): number => {
  const sets = getSetsFromInput(input)
  return sets.reduce((sum, set) => {
    const horizontalReflectionLine = getHorizontalReflectionLine(set)
    const verticalReflectionLine = getVerticalReflectionLine(set)
    return sum + horizontalReflectionLine + verticalReflectionLine
  }, 0)
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/13.txt', 'utf8')
  return getSumOfInputReflections(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/13.txt', 'utf8')
  return 0
}
