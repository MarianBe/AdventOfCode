import {
  getAllGalaxies,
  getAllPairsFromArray,
  getShortestDistanceBetweenGalaxies,
  getSpaceMap,
  getSpaceMapExpansions,
  getSumOfGalaxyDistances,
} from './11'

const testInput = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`

describe('day11Part01', () => {
  it('should expand our spaceMap successfully ', () => {
    expect(getSpaceMapExpansions(getSpaceMap(testInput))).toEqual({
      columns: [2, 5, 8],
      rows: [3, 7],
    })
  })
  it('should find all galaxies in our spacemap', () => {
    expect(getAllGalaxies(getSpaceMap(testInput))).toEqual([
      [0, 3],
      [1, 7],
      [2, 0],
      [4, 6],
      [5, 1],
      [6, 9],
      [8, 7],
      [9, 0],
      [9, 4],
    ])
  })
  it('should find all pairs in an array', () => {
    expect(getAllPairsFromArray([1, 2, 3, 4])).toEqual([
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
      [3, 4],
    ])
  })
  it('should find all pairs in our testInput', () => {
    expect(
      getAllPairsFromArray(getAllGalaxies(getSpaceMap(testInput))).length,
    ).toEqual(36)
  })
  it('should find the shortest path between two galaxies', () => {
    const spaceMap = getSpaceMap(testInput)
    const galaxyPairs = getAllPairsFromArray(getAllGalaxies(spaceMap))
    const spaceMapExpansions = getSpaceMapExpansions(spaceMap)
    expect(
      getShortestDistanceBetweenGalaxies(galaxyPairs[5], spaceMapExpansions),
    ).toEqual(15)
  })
  it('should find the sum of the shortest paths between all galaxies', () => {
    expect(getSumOfGalaxyDistances(testInput)).toEqual(374)
  })
})

describe('day11Part02', () => {
  it('should find the sum of the shortest paths between all galaxies with bigger expansion', () => {
    expect(getSumOfGalaxyDistances(testInput, 9)).toEqual(1030)
    expect(getSumOfGalaxyDistances(testInput, 99)).toEqual(8410)
  })
})
