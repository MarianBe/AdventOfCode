import {
  getDistanceBetweenSortedLists,
  parseInputToLists,
  sortLists,
  convertListToCountMap,
  getSimilarityScore,
} from './1'

const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`

describe('day1Part01', () => {
  it('should parse the input into lists', () => {
    expect(parseInputToLists(testInput)).toEqual([
      [3, 4, 2, 1, 3, 3],
      [4, 3, 5, 3, 9, 3],
    ])
  }),
    it('should parse the input into sorted lists', () => {
      expect(sortLists(parseInputToLists(testInput))).toEqual([
        [1, 2, 3, 3, 3, 4],
        [3, 3, 3, 4, 5, 9],
      ])
    }),
    it('should calc the distance between sorted lists', () => {
      expect(
        getDistanceBetweenSortedLists(sortLists(parseInputToLists(testInput))),
      ).toEqual(11)
    })
})

describe('day1Part02', () => {
  it('should convert the list to a map with counts', () => {
    expect(convertListToCountMap(parseInputToLists(testInput)[1])).toEqual(
      new Map([
        [4, 1],
        [3, 3],
        [5, 1],
        [9, 1],
      ]),
    )
  }),
    it('should get the similartyScore for our parsed inputs', () => {
      const [list1, list2] = parseInputToLists(testInput)
      const countMap = convertListToCountMap(list2)
      expect(getSimilarityScore(list1, countMap)).toEqual(31)
    })
})
