type Y = number
type X = number
export type Coordinates = [Y, X]

export const to2DimensionalArray = <T extends string[][]>(input: string): T =>
  input.split('\n').map((line) => line.split('')) as T

export const stringify = (...args: unknown[]): string => args.flat().join('|')
