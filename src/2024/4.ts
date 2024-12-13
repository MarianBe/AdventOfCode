import { readFile } from 'fs/promises'
import {
  to2DimensionalArray,
  Coordinates,
  DiagonalDirections,
  AllDirections,
} from '@helpers'

// 2-Dimensional Array of single characters
type WordSearch = string[][]

export const getNextCharacterInDirection = (
  wordSearch: WordSearch,
  currentPosition: Coordinates,
  direction: AllDirections,
  distance: number,
): string | undefined => {
  const [y, x] = currentPosition

  if (direction === 'tl') return wordSearch?.[y - distance]?.[x - distance]
  if (direction === 't') return wordSearch?.[y - distance]?.[x]
  if (direction === 'tr') return wordSearch?.[y - distance]?.[x + distance]
  if (direction === 'r') return wordSearch?.[y]?.[x + distance]
  if (direction === 'br') return wordSearch?.[y + distance]?.[x + distance]
  if (direction === 'b') return wordSearch?.[y + distance]?.[x]
  if (direction === 'bl') return wordSearch?.[y + distance]?.[x - distance]
  if (direction === 'l') return wordSearch?.[y]?.[x - distance]
}

// Find all "XMAS" in the puzzle
export const countXMASOccurrences = (input: string): number => {
  const wordSearch = to2DimensionalArray<WordSearch>(input)

  // These nested reduce statements might be a bit hard to read so I added some comments
  // First we go through each line of the WordSearch / 2-Dimensional Array
  return wordSearch.reduce(
    (acc, line, y) =>
      acc +
      // For each line we reduce through each character once
      line.reduce((lineAcc, char, x) => {
        // If the Character is not X (our starting character) we skip to the next one
        if (char !== 'X') return lineAcc

        return (
          lineAcc +
          // We check each direction if the pattern continues there
          AllDirections.reduce((dirAcc, direction) => {
            if (
              ['M', 'A', 'S'].every(
                (char, index) =>
                  getNextCharacterInDirection(
                    wordSearch,
                    [y, x],
                    direction,
                    index + 1,
                  ) === char,
              )
            ) {
              // Increment counter if the pattern continue succesfully
              return (dirAcc += 1)
            }
            return dirAcc
          }, 0)
        )
      }, 0),
    0,
  )
}

// Find all occurences of "MAS" in an X Shape
export const countX_MASOccurences = (input: string): number => {
  const wordSearch = to2DimensionalArray<WordSearch>(input)

  return wordSearch.reduce(
    (acc, line, y) =>
      acc +
      line.reduce((lineAcc, char, x) => {
        // Starting with the A as it is the center piece, makes the search easier
        if (char !== 'A') return lineAcc

        const diagonals = DiagonalDirections.reduce((dirAcc, direction) => {
          if (
            getNextCharacterInDirection(wordSearch, [y, x], direction, 1) ===
              'M' &&
            // If we have an "M" in one diagonal direction, we check for an "S" in the opposite direction by passing -1 as the increment
            getNextCharacterInDirection(wordSearch, [y, x], direction, -1) ===
              'S'
          ) {
            // Increment counter of "MAS" occurences around an "A"
            return (dirAcc += 1)
          }
          return dirAcc
        }, 0)
        // If we have "MAS" on 2 diagonals its an "X-MAS" -> Increment counter
        if (diagonals === 2) return (lineAcc += 1)
        return lineAcc
      }, 0),
    0,
  )
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/4.txt', 'utf8')
  return countXMASOccurrences(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/4.txt', 'utf8')
  return countX_MASOccurences(input)
}
