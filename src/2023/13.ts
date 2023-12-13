import { readFile } from 'fs/promises'

export const getSetsFromInput = (input: string): string[] => {
  return input.split('\n\n')
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

export const getVerticalLineBinaryMap = (input: string): number[] => {
  const lines = input.split('\n')
  const verticalLines = lines[0]
    .split('')
    .map((_, colIndex) => lines.map((line) => line[colIndex]))
  return verticalLines.map((line) =>
    line.reduce((acc, char, index) => {
      if (char === '#') {
        return acc + Math.pow(2, index)
      }
      return acc
    }, 0),
  )
}

export const getHorizontalLineBinaryMap = (input: string): number[] => {
  const lines = input.split('\n')
  return lines.map((line) =>
    line.split('').reduce((acc, char, index) => {
      if (char === '#') {
        return acc + Math.pow(2, index)
      }
      return acc
    }, 0),
  )
}

export const getMirrorIndexes = (binaryMap: number[]): number[] => {
  return binaryMap
    .reduce((acc, currentValue, index) => {
      if (currentValue === binaryMap[index + 1]) {
        acc.push(index)
      }
      return acc
    }, [] as number[])
    .filter((index) => {
      if (index !== -1 && isMapReflection(binaryMap, index)) {
        return true
      }
      return false
    })
}

export const getSmudgeFixedBinaryMaps = (binaryMap: number[]): number[][] => {
  return binaryMap.reduce((acc, currentValue, currentIndex) => {
    const potentialMirrorIndexes = binaryMap
      .map((_, i) => i)
      .filter((mirrorIndex) => {
        if (binaryMap[mirrorIndex] === currentValue) return false
        // check if its off by 1 bit
        return (
          (binaryMap[mirrorIndex] ^ currentValue)
            .toString(2)
            .split('')
            .filter((v) => v === '1')?.length === 1
        )
      })
    potentialMirrorIndexes.forEach((potentialMirrorIndex) => {
      if (potentialMirrorIndex !== -1) {
        const binaryMapWithSmudgeFix = [...binaryMap]
        binaryMapWithSmudgeFix[currentIndex] = binaryMap[potentialMirrorIndex]
        acc.push(binaryMapWithSmudgeFix)
      }
    })
    return acc
  }, [])
}

export const getReflectionLineSum = (
  binaryMap: number[],
  exclude: number[] = [],
): number => {
  const duplicateNeighbourIndexes = getMirrorIndexes(binaryMap).filter(
    (d) => !exclude.includes(d),
  )
  return duplicateNeighbourIndexes.reduce((sum, index) => (sum += index + 1), 0)
}

export const getHorizontalReflectionLine = (input: string): number => {
  return getReflectionLineSum(getHorizontalLineBinaryMap(input)) * 100
}

export const getVerticalReflectionLine = (input: string): number => {
  return getReflectionLineSum(getVerticalLineBinaryMap(input))
}

export const getHorizontalReflectionLineWithSmudge = (
  input: string,
): number => {
  const binaryMap = getHorizontalLineBinaryMap(input)
  const binaryMapsWithSmudgeFixes = getSmudgeFixedBinaryMaps(binaryMap)
  const baseNeighbourIndexes = getMirrorIndexes(binaryMap)

  return (
    Math.max(
      ...binaryMapsWithSmudgeFixes.map((m) =>
        getReflectionLineSum(m, baseNeighbourIndexes),
      ),
      0,
    ) * 100
  )
}

export const getVerticalReflectionLineWithSmudge = (input: string): number => {
  const binaryMap = getVerticalLineBinaryMap(input)
  const binaryMapsWithSmudgeFixes = getSmudgeFixedBinaryMaps(binaryMap)
  const baseNeighbourIndexes = getMirrorIndexes(binaryMap)

  return Math.max(
    ...binaryMapsWithSmudgeFixes.map((m) =>
      getReflectionLineSum(m, baseNeighbourIndexes),
    ),
    0,
  )
}

export const getSumOfInputReflections = (input: string): number => {
  const sets = getSetsFromInput(input)
  return sets.reduce((sum, set) => {
    const horizontalReflectionLine = getHorizontalReflectionLine(set)
    const verticalReflectionLine = getVerticalReflectionLine(set)
    return sum + horizontalReflectionLine + verticalReflectionLine
  }, 0)
}

export const getSumOfInputReflectionsWithSmudges = (input: string): number => {
  const sets = getSetsFromInput(input)
  const res = sets.reduce((sum, set) => {
    const horizontalReflectionLine = getHorizontalReflectionLineWithSmudge(set)
    const verticalReflectionLine = getVerticalReflectionLineWithSmudge(set)
    return sum + horizontalReflectionLine + verticalReflectionLine
  }, 0)
  return res
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/13.txt', 'utf8')
  return getSumOfInputReflections(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/13.txt', 'utf8')
  return getSumOfInputReflectionsWithSmudges(input)
}
