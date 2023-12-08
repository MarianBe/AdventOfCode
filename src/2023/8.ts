import { readFile } from 'fs/promises'

type NodeKey = string
type Instruction = 'L' | 'R'
export const mapNodes = (input: string): Map<NodeKey, [NodeKey, NodeKey]> => {
  const lines = input
    .split('\n')
    .map((line) => line.trim())
    .slice(2)
  const nodes = new Map<NodeKey, [NodeKey, NodeKey]>()
  lines.forEach((line) => {
    const [node] = line.split(' ')
    const [, left, right] = line.match(/\(([^,]+),\s([^)]+)\)/)
    nodes.set(node, [left, right])
  })
  return nodes
}
export const getInstructionsFromInput = (input: string): Instruction[] => {
  const instructionLine = input.split('\n')[0].trim()
  return instructionLine.split('') as Instruction[]
}

export const countStepsForNode = (
  input: string,
  startNode: string = 'AAA',
): number => {
  const instructions = getInstructionsFromInput(input)
  const nodes = mapNodes(input)

  let currentNode = startNode
  let currentStep = 0
  while (currentNode[2] !== 'Z') {
    // To start instructions from the beginning if we reach the end
    const instructionStep = currentStep % instructions.length
    const instruction = instructions[instructionStep]
    const [left, right] = nodes.get(currentNode) as [NodeKey, NodeKey]
    currentNode = instruction === 'L' ? left : right
    currentStep++
  }
  return currentStep
}

/*************
PART 2:

TIL about least common multiples, i should've paid more attention in maths class..
Resources: https://www.reddit.com/r/adventofcode/comments/18dhoxl/2023_day_8_part_2_why_simple_solution_works_is/
Basically, this works because the nodes are in a cycle, so the time to reach Z is the LCM of the times to reach each node in the cycle
For example:
AAA -> ZZZ takes 19631 steps, and ZZZ -> ZZZ takes 19631 -> it loops every 19631 steps
RGA -> HPZ tales 17837 steps, and HPZ -> HPZ takes 17837 -> it loops every 17837 steps
So the LCM of 19631 and 17837 is 350158147, after which both of them are on their end node simultaneously
*************/

// https://www.30secondsofcode.org/js/s/lcm/
export const lcm = (...numbers: number[]): number => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y))
  const _lcm = (x, y) => (x * y) / gcd(x, y)
  return [...numbers].reduce((a, b) => _lcm(a, b))
}

export const countStepsSimultaneously = (input: string): number => {
  const nodes = mapNodes(input)
  const nodesWithA = Array.from(nodes.keys()).filter((node) => node[2] == 'A')

  const timesToReachZ = nodesWithA.map((node) => countStepsForNode(input, node))
  return lcm(...timesToReachZ)
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/8.txt', 'utf8')
  return countStepsForNode(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/8.txt', 'utf8')
  return countStepsSimultaneously(input)
}
