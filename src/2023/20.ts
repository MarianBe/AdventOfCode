import { input } from '@inquirer/prompts'
import { readFile } from 'fs/promises'
import { PriorityQueue } from '@datastructures-js/priority-queue'

type Output = 'output'

interface ConjunctionModule {
  type: '&'
  name: string
  targets: (string | Output)[]
  inputStates: {
    [key: string]: boolean
  }
}

interface FlipFlopModule {
  type: '%'
  name: string
  targets: (string | Output)[]
  state: boolean
}
interface BroadcastModule {
  type: 'broadcaster'
  name: string
  targets: (string | Output)[]
}

type Module = ConjunctionModule | FlipFlopModule | BroadcastModule

type ModuleMap = Map<string, Module>

export const parseModuleMap = (input: string): ModuleMap => {
  const lines = input.split('\n')
  const moduleMap: ModuleMap = new Map()
  lines.forEach((line) => {
    const [module, _targets] = line.split('->').map((s) => s.trim())
    const targets = _targets?.split(', ').map((s) => s.trim())

    if (module === 'broadcaster') {
      moduleMap.set(module, { type: module, targets, name: module })
    } else {
      const type = module[0] as '&' | '%'
      const name = module.slice(1)
      if (type === '%') {
        moduleMap.set(name, { type, targets, name, state: false })
      } else {
        moduleMap.set(name, { type, targets, name, inputStates: {} })
      }
    }
  })

  // Now we have the moduleMap, lets loop through it again to map the inputStates for all ConjunctionModules

  moduleMap.forEach((module) => {
    if (module.type === '&') {
      const inputs = Array.from(moduleMap.values()).filter((m) =>
        m.targets.includes(module.name),
      )
      inputs.forEach((input) => {
        module.inputStates[input.name] = false
      })
    }
  })

  return moduleMap
}
// https://www.30secondsofcode.org/js/s/lcm/
export const lcm = (...numbers: number[]): number => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y))
  const _lcm = (x, y) => (x * y) / gcd(x, y)
  return [...numbers].reduce((a, b) => _lcm(a, b))
}
export const sendPulses = (
  input: string,
  amount: number,
  checkForRx: boolean = false,
): number => {
  const moduleMap = parseModuleMap(input)
  let lowPulses = 0
  let highPulses = 0

  let currentStep = 1
  const firstOccurencesCallingKz = {}
  for (let i = 0; i < amount; i++) {
    const queue = new PriorityQueue<{
      pulse: boolean
      step: number
      moduleName: string
      origin: string
    }>((a, b) => a.step - b.step)

    queue.enqueue({
      moduleName: 'broadcaster',
      pulse: false,
      step: 0,
      origin: 'button',
    })

    while (!queue.isEmpty()) {
      const { pulse, moduleName, origin } = queue.dequeue()
      if (pulse) {
        highPulses++
      } else {
        lowPulses++
      }

      const currentModule = moduleMap.get(moduleName)
      if (!currentModule) {
        continue
      }
      if (currentModule.type === 'broadcaster') {
        currentModule.targets.forEach((target) => {
          queue.enqueue({
            moduleName: target,
            pulse,
            step: currentStep++,
            origin: currentModule.name,
          })
        })
      }
      if (currentModule.type === '%') {
        // Ignore high pulses
        if (pulse) {
          continue
        }
        currentModule.state = !currentModule.state
        currentModule.targets.forEach((target) => {
          queue.enqueue({
            moduleName: target,
            pulse: currentModule.state,
            step: currentStep++,
            origin: currentModule.name,
          })
        })
      }
      if (currentModule.type === '&') {
        currentModule.inputStates[origin] = pulse
        const allInputsReceived = Object.values(
          currentModule.inputStates,
        ).every((v) => v === true)
        currentModule.targets.forEach((target) => {
          queue.enqueue({
            moduleName: target,
            pulse: !allInputsReceived,
            step: currentStep++,
            origin: currentModule.name,
          })
        })
      }

      /**  For Part 2
       * We need to find the amount of button-presses it takes for rx to receive a LOW for the first time
       * With some input checking we can see rx only receives a LOW when the kz conjuction module has all HIGH's
       * The Inputs for kz are ls, bg, sj, qq
       * We want to find the first time all of them are on at the same time
       * So we can find the LCM which sends a low pulse to rx
       */
      if (checkForRx && moduleName === 'kz' && pulse) {
        if (!firstOccurencesCallingKz[origin]) {
          firstOccurencesCallingKz[origin] = i + 1
        }
        if (Object.keys(firstOccurencesCallingKz).length === 4) {
          return lcm(...(Object.values(firstOccurencesCallingKz) as number[]))
        }
      }
    }
  }
  return lowPulses * highPulses
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/20.txt', 'utf8')
  return sendPulses(input, 1000)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/20.txt', 'utf8')
  return sendPulses(input, Infinity, true)
}
