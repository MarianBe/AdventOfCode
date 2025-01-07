import { updateLog } from '@helpers'
import { readFile } from 'fs/promises'
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2))
export const parseInput = (input: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_a, _b, _c, _, _program] = input.split('\n')
  const A = Number(_a.replace('Register A: ', ''))
  const B = Number(_b.replace('Register B: ', ''))
  const C = Number(_c.replace('Register C: ', ''))
  const program = _program.replace('Program: ', '').split(',').map(Number)

  return {
    A,
    B,
    C,
    program,
  }
}

export const runProgram = (input: string, earlyExit?: boolean): string => {
  const output = []
  let pointer = 0
  let { A, B, C, program } = parseInput(input)

  const getComboOperand = (operand: number) => {
    switch (operand) {
      case 0:
      case 1:
      case 2:
      case 3:
        return operand
      case 4:
        return A
      case 5:
        return B
      case 6:
        return C
      default:
        throw new Error('operand not found')
    }
  }
  while (program.length > pointer + 1) {
    if (earlyExit && output.some((o, i) => program[i] !== o)) {
      return ''
    }
    const opcode = program[pointer]
    const operand = program[pointer + 1]
    const comboOperand = getComboOperand(operand)
    switch (opcode) {
      case 0:
        A = Math.floor(A / Math.pow(2, comboOperand))
        break
      case 1:
        B = Number(BigInt(B) ^ BigInt(operand))
        break
      case 2:
        B = comboOperand % 8
        break
      case 3:
        if (A !== 0) {
          pointer = operand
          continue
        }
        break
      case 4:
        B = Number(BigInt(B) ^ BigInt(C))
        break
      case 5:
        output.push(comboOperand % 8)
        break
      case 6:
        B = Math.floor(A / Math.pow(2, comboOperand))
        break
      case 7:
        C = Math.floor(A / Math.pow(2, comboOperand))
        break
    }
    pointer += 2
  }

  return output.join(',')
}

export const findSelfProducingProgram = (input: string): number => {
  console.log('🕒 Welcome to another round of brute-force.. 🕒')
  console.log(
    'There might be a way to reverse this to solve it but... I dont want to :)',
  )
  console.log(
    'Instead, you can call this with the --offset flag to have it run in mutilple threads :))',
  )
  const program = parseInput(input).program.join(',')

  const defaultA = parseInput(input).A
  let found = false

  let A = argv.offset ?? 0

  while (!found) {
    if (argv?.['stop-after'] && A > argv['stop-after'] + (argv.offset ?? 0)) {
      break
    }
    const result = runProgram(
      input.replace(defaultA.toString(), A.toString()),
      true,
    )
    found = result === program
    if (A % 100000 === 0) updateLog(`Checked ${A} `)
    if (!found) {
      A++
    }
  }
  if (!found) {
    console.log('Aborted')
    return undefined
  }
  return A
}

export const partOne = async (): Promise<string> => {
  const input = await readFile('src/2024/inputs/17.txt', 'utf8')
  return runProgram(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/17.txt', 'utf8')
  return findSelfProducingProgram(input)
}

// 109020013201563
