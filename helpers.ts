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
