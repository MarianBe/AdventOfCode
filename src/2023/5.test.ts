import {
  getRangeMap,
  getSeedRangesFromInput,
  getSeedsFromInput,
  getSmallestLocationForSeed,
  getSmallestLocationForSeedRange,
} from './5'

const testInput = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`

describe('day05Part01', () => {
  it('should get the seeds from the input', () => {
    expect(getSeedsFromInput(testInput)).toEqual([79, 14, 55, 13])
  })
  it('should return a rangemap for seed-to-soil', () => {
    expect(getRangeMap(testInput, 'seed-to-soil map:\n')).toEqual([
      [50, 98, 2],
      [52, 50, 48],
    ])
  })
  it('should give the smallest location for our input', () => {
    expect(getSmallestLocationForSeed(testInput)).toEqual(35)
  })
})
describe('day05Part02', () => {
  it('should get the seed-range from the input', () => {
    expect(getSeedRangesFromInput(testInput)).toEqual([
      [79, 14],
      [55, 13],
    ])
  })
  it('should return a rangemap for seed-to-soil', () => {
    expect(getRangeMap(testInput, 'seed-to-soil map:\n')).toEqual([
      [50, 98, 2],
      [52, 50, 48],
    ])
  })
  it('should map the seeds to their corresponding SeedMaps', async () => {
    expect(await getSmallestLocationForSeedRange(testInput)).toEqual(46)
  })
})
