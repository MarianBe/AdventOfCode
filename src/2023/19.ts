import { readFile } from 'fs/promises'
import { PriorityQueue } from '@datastructures-js/priority-queue'

type PartCategories = 'x' | 'm' | 'a' | 's'
type Operator = '<' | '>'

interface BaseRule {
  type: string
  target?: string
  category?: PartCategories
  operator?: Operator
  value?: number
}

type Rules = BaseRule &
  (
    | { type: 'accept' | 'reject' | 'forward' }
    | {
        type: 'conditional-reject' | 'conditional-accept'
        category: PartCategories
        operator: Operator
        value: number
      }
    | {
        type: 'conditional-forward'
        category: PartCategories
        operator: Operator
        value: number
        target: string
      }
  )

interface Part {
  x: number
  a: number
  m: number
  s: number
}

type QueueItem = {
  workflow: string
  x: { min: number; max: number }
  m: { min: number; max: number }
  a: { min: number; max: number }
  s: { min: number; max: number }
  step: number
}

export const parseWorkflow = (input: string) => {
  const [name, _conditions] = input.split('{')
  const conditions = _conditions.slice(0, -1).split(',')

  const rules: Rules[] = conditions.map((condition) => {
    if (condition.includes(':')) {
      // We are in a conditional rule
      const type =
        condition.at(-1) === 'R' ? 'conditional-reject'
        : condition.at(-1) === 'A' ? 'conditional-accept'
        : 'conditional-forward'
      const indexOfColon = condition.indexOf(':')
      return {
        type,
        category: condition[0] as PartCategories,
        operator: condition[1] as '<' | '>',
        value: Number(condition.slice(2, indexOfColon)),
        target:
          type === 'conditional-forward' ?
            condition.slice(indexOfColon + 1)
          : undefined,
      }
    }
    if (condition === 'R') {
      return { type: 'reject' }
    }
    if (condition === 'A') {
      return { type: 'accept' }
    }
    return { type: 'forward', target: condition }
  })
  return {
    name,
    rules,
  }
}

export const parsePart = (input: string): Part => {
  const properties = input.trim().slice(1, -1).split(',')
  const part = properties.reduce((acc, property) => {
    const [key, value] = property.split('=')
    acc[key] = Number(value)
    return acc
  }, {})
  return part as Part
}

export const checkConditional = (a: number, b: number, operator: '<' | '>') => {
  if (operator === '<') {
    return a < b
  }
  return a > b
}

export const checkIfPartIsAccepted = (
  part: Part,
  workflowMap: Map<string, Rules[]>,
) => {
  let done = false
  let accepted = false
  let workflow = 'in'
  while (!done) {
    const currentWorkflowRules = workflowMap.get(workflow)
    for (const rule of currentWorkflowRules) {
      if (rule.type === 'accept') {
        done = true
        accepted = true
        break
      }
      if (rule.type === 'reject') {
        done = true
        break
      }
      if (rule.type === 'forward') {
        workflow = rule.target
        break
      }
      if (
        rule.type === 'conditional-forward' &&
        checkConditional(part[rule.category], rule.value, rule.operator)
      ) {
        workflow = rule.target
        break
      }
      if (
        rule.type === 'conditional-reject' &&
        checkConditional(part[rule.category], rule.value, rule.operator)
      ) {
        done = true
        break
      }
      if (
        rule.type === 'conditional-accept' &&
        checkConditional(part[rule.category], rule.value, rule.operator)
      ) {
        done = true
        accepted = true
        break
      }
    }
  }
  return accepted
}

export const checkPartsList = (input: string) => {
  const [workflow, _parts] = input.split('\n\n')
  const workflowMap = workflow.split('\n').reduce((acc, line) => {
    const { name, rules } = parseWorkflow(line.trim())
    acc.set(name, rules)
    return acc
  }, new Map<string, Rules[]>())

  const parts: Part[] = _parts.split('\n').map(parsePart)
  const acceptedParts = parts.filter((part) => {
    return checkIfPartIsAccepted(part, workflowMap)
  })
  return acceptedParts
}

const getQueueItemProduct = (queueItem: QueueItem) => {
  return (
    (queueItem.x.max - queueItem.x.min + 1) *
    (queueItem.m.max - queueItem.m.min + 1) *
    (queueItem.a.max - queueItem.a.min + 1) *
    (queueItem.s.max - queueItem.s.min + 1)
  )
}

export const getAllPossibleCombinations = (input: string): number => {
  const [workflow] = input.split('\n\n')
  const workflowMap = workflow.split('\n').reduce((acc, line) => {
    const { name, rules } = parseWorkflow(line.trim())
    acc.set(name, rules)
    return acc
  }, new Map<string, Rules[]>())

  const queue = new PriorityQueue<QueueItem>((a, b) => a.step - b.step)

  const addToQueue = (queueItem: QueueItem, partial?: Partial<QueueItem>) => {
    const newQueueItem = {
      ...queueItem,
      ...partial,
      step: queueItem.step + 1,
    }
    if (
      newQueueItem.x.min > newQueueItem.x.max ||
      newQueueItem.m.min > newQueueItem.m.max ||
      newQueueItem.a.min > newQueueItem.a.max ||
      newQueueItem.s.min > newQueueItem.s.max
    ) {
      return
    }
    queue.enqueue(newQueueItem)
  }

  const getUpdatedQueueItem = (
    queueItem: QueueItem,
    category: PartCategories,
    partialCategory: Partial<QueueItem[PartCategories]>,
    workflow: string = queueItem.workflow,
  ) => ({
    ...queueItem,
    [category]: {
      ...queueItem[category],
      ...partialCategory,
    },
    workflow,
  })

  queue.enqueue({
    workflow: 'in',
    x: { min: 1, max: 4000 },
    m: { min: 1, max: 4000 },
    a: { min: 1, max: 4000 },
    s: { min: 1, max: 4000 },
    step: 0,
  })
  let sum = 0
  while (!queue.isEmpty()) {
    let currentQueueItem = queue.dequeue()
    // console.log(currentQueueItem)
    const currentWorkflowRules = workflowMap.get(currentQueueItem.workflow)
    for (const rule of currentWorkflowRules) {
      const { type, operator, target, category, value } = rule
      if (type === 'accept') {
        sum += getQueueItemProduct(currentQueueItem)
        break
      }

      if (type === 'reject') {
        break
      }

      if (type === 'forward') {
        addToQueue(currentQueueItem, { workflow: target })
        break
      }

      if (type === 'conditional-forward') {
        addToQueue(
          getUpdatedQueueItem(
            currentQueueItem,
            category,
            operator === '<' ?
              {
                max: value - 1,
              }
            : {
                min: value + 1,
              },
            target,
          ),
        )
        currentQueueItem = getUpdatedQueueItem(currentQueueItem, category, {
          [operator === '<' ? 'min' : 'max']: value,
        })
      }

      if (type === 'conditional-reject') {
        currentQueueItem = getUpdatedQueueItem(currentQueueItem, category, {
          [operator === '<' ? 'min' : 'max']: value,
        })
      }

      if (type === 'conditional-accept') {
        sum += getQueueItemProduct(
          getUpdatedQueueItem(
            currentQueueItem,
            category,
            operator === '<' ?
              {
                max: value - 1,
              }
            : {
                min: value + 1,
              },
          ),
        )
        currentQueueItem = getUpdatedQueueItem(currentQueueItem, category, {
          [operator === '<' ? 'min' : 'max']: value,
        })
      }
    }
  }

  return sum
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/19.txt', 'utf8')
  const acceptedParts = checkPartsList(input)
  const sum = acceptedParts.reduce((acc: number, part: Part) => {
    const partSum = Object.values(part).reduce(
      (partAcc: number, value: number) => {
        return partAcc + value
      },
      0,
    )
    return acc + partSum
  }, 0)
  return sum
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/19.txt', 'utf8')
  return getAllPossibleCombinations(input)
}
