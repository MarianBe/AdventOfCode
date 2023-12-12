const cache = new Map<string, number>()

export const getCacheKey = (arrangement: string, arrangementMap: string[]) =>
  JSON.stringify([arrangement, arrangementMap])

export const getMultipliedLine = (
  line: string,
  multiplicator: number = 5,
): string => {
  if (multiplicator === 1) return line
  const [conditionString, arrangementMap] = line.split(' ')
  return `${new Array(multiplicator)
    .fill(conditionString)
    .join('?')} ${new Array(multiplicator).fill(arrangementMap).join(',')}`
}

export const isArrangementStillPossible = (
  arrangement: string,
  arrangementMap: string[],
): [false] | [true, string, string[]] => {
  if ((arrangement.match(/#/g)?.length || 0) > arrangementMap.join('').length) {
    return [false]
  }
  if (arrangement.length === 0 && arrangementMap.length === 0) {
    return [true, arrangement, arrangementMap]
  }

  const firstUnknownIndex = arrangement.indexOf('?')
  if (firstUnknownIndex === -1) {
    // Will be checked in final condition
    return [true, arrangement, arrangementMap]
  }

  // When the first group of # is longer than the first group of # in the arrangement map, it's not possible
  if (
    (arrangement.substring(0, firstUnknownIndex).match(/\.*\#+/g)?.[0]?.[0]
      ?.length || 0) > arrangementMap[0]?.length ||
    0
  ) {
    return [false]
  }

  const brokenGroups = Array.from(
    arrangement.substring(0, firstUnknownIndex).matchAll(/\.*\#+\./g),
  )
  if (brokenGroups.length === 0) return [true, arrangement, arrangementMap]
  const firstBrokenGroupMatch =
    brokenGroups[0][0].replace(/\.*/g, '') === arrangementMap[0]

  if (firstBrokenGroupMatch) {
    if (brokenGroups.length === 1) {
      return [
        true,
        arrangement.replace(brokenGroups[0][0], ''),
        arrangementMap.slice(1),
      ]
    }
    return isArrangementStillPossible(
      arrangement.replace(brokenGroups[0][0], ''),
      arrangementMap.slice(1),
    )
  }
  return [false]
}

export const getPossibleArrangements = (
  arrangement: string,
  arrangementMap: string[],
): number => {
  const cacheKey = getCacheKey(arrangement, arrangementMap)
  if (cache.has(cacheKey)) return cache.get(cacheKey)

  const [isStillPossible, newArrangement, newArrangementMap] =
    isArrangementStillPossible(arrangement, arrangementMap)

  if (arrangement.length === 0) {
    return 0
  }

  if (!isStillPossible) {
    return 0
  }
  // Arrangement is still possible
  if (!newArrangement.includes('?')) {
    if (
      newArrangement
        .split('.')
        .filter((a) => a)
        .join(',') === newArrangementMap.join(',')
    ) {
      return 1
    }
    return 0
  } else {
    const arrangementWithHash = newArrangement.replace('?', '#')
    const hashRes = getPossibleArrangements(
      arrangementWithHash,
      newArrangementMap,
    )
    cache.set(getCacheKey(arrangementWithHash, newArrangementMap), hashRes)
    const arrangementWithDot = newArrangement.replace('?', '.')
    const dotRes = getPossibleArrangements(
      arrangementWithDot,
      newArrangementMap,
    )
    cache.set(getCacheKey(arrangementWithDot, newArrangementMap), dotRes)
    return hashRes + dotRes
  }
}

// This is a brute-force solution again
export default ({
  line,
  multiplicator = 1,
}: {
  line: string
  multiplicator?: number
}): number => {
  const [conditionString, _arrangementMap] = getMultipliedLine(
    line,
    multiplicator,
  ).split(' ')
  // Split and filter instead of regex, because regex is the devil
  const arrangementMap = _arrangementMap
    .split(',')
    .map(Number)
    .map((n) => new Array(n).fill('#').join(''))

  return getPossibleArrangements(conditionString, arrangementMap)
}
