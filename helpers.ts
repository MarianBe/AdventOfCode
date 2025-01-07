type Y = number
type X = number
export type Coordinates = [Y, X]

export type DiagonalDirections = (typeof DiagonalDirections)[number]
export const DiagonalDirections = ['tl', 'tr', 'bl', 'br'] as const
export const Directions = ['t', 'r', 'b', 'l'] as const
export type Directions = (typeof Directions)[number]
export const AllDirections = [...Directions, ...DiagonalDirections] as const
export type AllDirections = (typeof AllDirections)[number]

export const to2DimensionalArray = <T extends string[][]>(input: string): T =>
  input.split('\n').map((line) => line.split('')) as T

export const to2DimensionalNumberArray = <T extends number[][]>(
  input: string,
): T => input.split('\n').map((line) => line.split('').map(Number)) as T

export const stringify = (...args: unknown[]): string => args.flat().join('|')

export const getOffsetForDirection = (
  direction: DiagonalDirections | Directions | AllDirections,
  [Y, X]: Coordinates,
): Coordinates => {
  switch (direction) {
    case 'tl':
      return [Y - 1, X - 1]
    case 'tr':
      return [Y - 1, X + 1]
    case 'bl':
      return [Y + 1, X - 1]
    case 'br':
      return [Y + 1, X + 1]
    case 't':
      return [Y - 1, X]
    case 'r':
      return [Y, X + 1]
    case 'b':
      return [Y + 1, X]
    case 'l':
      return [Y, X - 1]
    default:
      return [Y, X]
  }
}

export const findCoordinatesIn2DimensionalArray = <
  T extends (string | number)[][],
>(
  map: T,
  search: string | number,
): Coordinates | undefined => {
  let X
  const Y = map.findIndex((row) => {
    const _r = row.findIndex((item) => item === search)
    if (_r !== -1) {
      X = _r
      return true
    }
    return false
  })
  if (Y === -1 || !X) return undefined
  return [Y, X]
}

export const print2DimensionalArray = (array: (string | number)[][]) =>
  console.log(array.map((l) => l.join('')).join('\n'))

export const updateLog = (log: string) => {
  process.stdout.clearLine(0)
  process.stdout.cursorTo(0)
  process.stdout.write(log)
}
