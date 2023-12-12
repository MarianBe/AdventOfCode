import { Presets, SingleBar } from 'cli-progress'
import { readFile } from 'fs/promises'
import Piscina from 'piscina'

const piscina = new Piscina({
  filename: new URL('./12.worker.ts', import.meta.url).href,
})

export const getSumOfPossibleInputs = async (
  input: string,
  multiplicator: number = 1,
): Promise<number> => {
  const lines = input.split('\n')

  const progressBar = new SingleBar(
    {
      format:
        'Progress | {bar} | {percentage}% | ~{eta}s left | {value}/{total} Seeds',
      stopOnComplete: true,
      etaBuffer: 1000,
      etaAsynchronousUpdate: true,
    },
    Presets.shades_classic,
  )
  progressBar.start(lines.length, 0)

  const allArrangements = await Promise.all(
    lines.map((line) => {
      return new Promise<number>((resolve) => {
        piscina
          .run({ line, multiplicator })
          .then((result) => {
            progressBar.increment()
            resolve(result)
          })
          .catch((e) => {
            console.log('e', e)
          })
      })
    }),
  )

  progressBar.stop()
  return allArrangements.reduce((sum, arrangements) => {
    return sum + arrangements
  }, 0)
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/12.txt', 'utf8')
  return getSumOfPossibleInputs(input, 1)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/12.txt', 'utf8')

  return getSumOfPossibleInputs(input, 5)
}
