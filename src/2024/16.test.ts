import { findCheapestRoute } from './16'

const testInput = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`

describe('day16Part01', () => {
  it('should find the cheapest route', () => {
    expect(findCheapestRoute(testInput)[0]).toEqual(7036)
  })
})

describe('day16Part02', () => {
  it('should find the number of spots that are part of any of the cheapest routes', () => {
    expect(findCheapestRoute(testInput)[1]).toEqual(45)
  })
})
