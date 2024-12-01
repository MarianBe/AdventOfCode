import { readFile } from 'fs/promises'

type List = number[]
type Lists = [List, List]
type CountMap = Map<number, number>
export const parseInputToLists = (input: string): Lists => {
  const lists: [List, List] = [[], []]
  input.split('\n').forEach((line) => {
    line
      .trim()
      .split(' ')
      .filter((num) => num)
      .forEach((num, index) => {
        lists[index].push(Number(num.trim()))
      })
  })
  return lists
}

export const sortLists = (lists): Lists => {
  lists.forEach((list) => list.sort((a, b) => a - b))
  return lists
}
export const getDistanceBetweenSortedLists = (lists: Lists): number =>
  lists[0].reduce((acc, num, index) => {
    return acc + Math.abs(num - lists[1][index])
  }, 0)

export const convertListToCountMap = (list: List): CountMap => {
  const map: CountMap = new Map()
  list.forEach((num) => {
    map.set(num, (map.get(num) || 0) + 1)
  })
  return map
}

export const getSimilarityScore = (list: List, countMap: CountMap): number => {
  return list.reduce(
    (acc, num) => (acc += num * (countMap.has(num) ? countMap.get(num) : 0)),
    0,
  )
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/1.txt', 'utf8')
  return getDistanceBetweenSortedLists(sortLists(parseInputToLists(input)))
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/1.txt', 'utf8')
  const [list1, list2] = parseInputToLists(input)
  const countMap = convertListToCountMap(list2)
  return getSimilarityScore(list1, countMap)
}
