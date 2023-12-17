import {
  getNorthWeight,
  parseGrid,
  printDebug,
  runSpinCycle,
  tiltNorth,
} from './14'

const testInput = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`

describe('day14part1', () => {
  it('should tilt the grid north', () => {
    expect(tiltNorth(parseGrid(testInput)).rockMap.sort()).toEqual(
      parseGrid(`OOOO.#.O..
    OO..#....#
    OO..O##..O
    O..#.OO...
    ........#.
    ..#....#.#
    ..O..#.O.O
    ..O.......
    #....###..
    #....#....`).rockMap.sort(),
    )
  })
})

describe('getNorthWeight', () => {
  it('should calculate the north weight', () => {
    expect(getNorthWeight(tiltNorth(parseGrid(testInput)))).toEqual(136)
  })
})

describe('day14part2', () => {
  it('should run the spin cycle', () => {
    expect(runSpinCycle(parseGrid(testInput)).rockMap.sort()).toEqual(
      parseGrid(`.....#....
    ....#...O#
    ...OO##...
    .OO#......
    .....OOO#.
    .O#...O#.#
    ....O#....
    ......OOOO
    #...O###..
    #..OO#....`).rockMap.sort(),
    )
  })

  it('should run the spin cycle with 2 iterations', () => {
    expect(runSpinCycle(parseGrid(testInput), 2).rockMap.sort()).toEqual(
      parseGrid(`.....#....
    ....#...O#
    .....##...
    ..O#......
    .....OOO#.
    .O#...O#.#
    ....O#...O
    .......OOO
    #..OO###..
    #.OOO#...O`).rockMap.sort(),
    )
  })

  it('should run the spin cycle with 3 iterations', () => {
    expect(runSpinCycle(parseGrid(testInput), 3).rockMap.sort()).toEqual(
      parseGrid(`.....#....
    ....#...O#
    .....##...
    ..O#......
    .....OOO#.
    .O#...O#.#
    ....O#...O
    .......OOO
    #...O###.O
    #.OOO#...O`).rockMap.sort(),
    )
  })
})
