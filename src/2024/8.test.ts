import {
  parseGrid,
  collectAntennaPositions,
  findAntinodes,
  positionToString,
  Position,
  calculateAntinodes,
  isValidPosition,
} from './8'

describe('parseGrid', () => {
  it('should parse single line input', () => {
    expect(parseGrid('..A.')).toEqual([['.', '.', 'A', '.']])
  })

  it('should parse multi-line input', () => {
    const input = '...\n.A.\n...'
    expect(parseGrid(input)).toEqual([
      ['.', '.', '.'],
      ['.', 'A', '.'],
      ['.', '.', '.'],
    ])
  })
})

describe('collectAntennaPositions', () => {
  it('should return empty map for empty grid', () => {
    expect(collectAntennaPositions([])).toEqual(new Map())
  })

  it('should return empty map for grid with only dots', () => {
    expect(
      collectAntennaPositions([
        ['.', '.'],
        ['.', '.'],
      ]),
    ).toEqual(new Map())
  })

  it('should collect single antenna position', () => {
    const grid = [
      ['.', '.'],
      ['A', '.'],
    ]
    const expected = new Map([['A', [[1, 0]]]])
    expect(collectAntennaPositions(grid)).toEqual(expected)
  })

  it('should collect multiple antennas of same type', () => {
    const grid = [
      ['A', '.'],
      ['.', '.'],
      ['A', '.'],
    ]
    const expected = new Map([
      [
        'A',
        [
          [0, 0],
          [2, 0],
        ],
      ],
    ])
    expect(collectAntennaPositions(grid)).toEqual(expected)
  })
})

describe('isValidPosition', () => {
  const grid = [
    ['.', '.'],
    ['.', '.'],
  ]

  it('should return true for valid positions', () => {
    expect(isValidPosition([0, 0], grid)).toBe(true)
    expect(isValidPosition([1, 1], grid)).toBe(true)
  })

  it('should return false for out of bounds positions', () => {
    expect(isValidPosition([-1, 0], grid)).toBe(false)
    expect(isValidPosition([0, 2], grid)).toBe(false)
    expect(isValidPosition([2, 0], grid)).toBe(false)
  })
})

describe('positionToString', () => {
  it('should convert position to string format', () => {
    expect(positionToString([1, 2])).toBe('1|2')
    expect(positionToString([0, 0])).toBe('0|0')
  })
})

describe('findAntinodes', () => {
  const grid = [
    ['.', '.', '.', '.'],
    ['.', 'A', 'A', '.'],
    ['.', '.', '.', '.'],
  ]

  it('should return empty array for single position', () => {
    expect(findAntinodes([[1, 1]], grid)).toEqual([])
  })

  it('should find antinodes for two antennas', () => {
    const positions: Position[] = [
      [1, 1],
      [1, 2],
    ]
    const result = findAntinodes(positions, grid)
    expect(result.length).toEqual(2)
    expect(
      result.every((pos) =>
        isValidPosition(pos.split('|') as unknown as Position, grid),
      ),
    ).toBe(true)
  })

  it('should handle allowMultipleSteps flag', () => {
    const positions: Position[] = [
      [1, 1],
      [1, 2],
    ]
    const singleStep = findAntinodes(positions, grid, false)
    const multiStep = findAntinodes(positions, grid, true)
    expect(singleStep.length).toEqual(2)
    expect(new Set(multiStep).size).toEqual(4)
  })
})

describe('calculateAntinodes', () => {
  const input = `....
.AA.
....`

  it('should calculate antinodes for simple input', () => {
    expect(calculateAntinodes(input).size).toBeGreaterThan(0)
  })

  it('should handle multiple steps', () => {
    const singleStep = calculateAntinodes(input, false)
    const multiStep = calculateAntinodes(input, true)
    expect(multiStep.size).toBeGreaterThanOrEqual(singleStep.size)
  })
})
