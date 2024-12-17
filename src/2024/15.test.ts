import { findCoordinatesIn2DimensionalArray } from '@helpers'
import { getGPSCoordinates, moveThroughWarehouse, parseInput } from './15'

const testInput = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`

const shortInput = `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`

describe('day15Part01', () => {
  const [map, instructions] = parseInput(testInput)
  const startPosition = findCoordinatesIn2DimensionalArray(map, '@')
  it('should parse the input correctly', () => {
    expect(instructions[0]).toEqual('l')
  })
  it('should move object correctly', () => {
    expect(map[4][2]).toEqual('.')
    expect(map[4][3]).toEqual('O')
    expect(map[4][4]).toEqual('@')
    moveThroughWarehouse(map, startPosition, instructions[0])
    expect(map[4][2]).toEqual('O')
    expect(map[4][3]).toEqual('@')
    expect(map[4][4]).toEqual('.')
  })
  it('should get the correct gps-coordinates for part1', () => {
    expect(getGPSCoordinates(testInput)).toEqual(10092)
  })
})
describe('day15Part02', () => {
  it('should get the correct gps-coordinates for the doubled map', () => {
    expect(getGPSCoordinates(testInput, true)).toEqual(9021)
  })
})
