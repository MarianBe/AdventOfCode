import { getEnergizedTiles, getMostEnergizedTiles } from './16'

const testInput = String.raw`.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....`

describe('day16Part01', () => {
  it('should get the amount of energized tiles from the topleft corner ', () => {
    expect(getEnergizedTiles(testInput)).toEqual(46)
  })
})

describe('day16Part02', () => {
  it('should get the most possible enegized tiles', () => {
    expect(getMostEnergizedTiles(testInput)).toEqual(51)
  })
})
