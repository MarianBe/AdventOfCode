import { readFile } from 'fs/promises'

export const hashString = (input: string): number => {
  let hashValue = 0
  for (let i = 0; i < input.length; i++) {
    hashValue = ((hashValue + input.charCodeAt(i)) * 17) % 256
  }
  return hashValue
}

export const getSequenceHash = (input: string): number => {
  return input.split(',').reduce((acc, curr) => hashString(curr) + acc, 0)
}

export const getFocusingPower = (input: string): number => {
  const steps = input.split(',')
  const boxes = new Array(256).fill(0).map((_, i) => [])

  steps.forEach((step) => {
    const operation = step.indexOf('-') > -1 ? 'remove' : 'add'
    const [label, focalLength] = step.split(operation === 'remove' ? '-' : '=')
    const boxNumber = hashString(label)
    const existingIndex = boxes[boxNumber].findIndex(
      (item) => item.label === label,
    )
    if (operation === 'add') {
      if (existingIndex > -1) {
        boxes[boxNumber][existingIndex].focalLength = focalLength
      } else boxes[boxNumber].push({ label, focalLength })
    }
    if (operation === 'remove') {
      if (existingIndex > -1) {
        boxes[boxNumber].splice(existingIndex, 1)
      }
    }
  })
  return boxes.reduce((acc, curr, boxIndex) => {
    let boxSum = 0
    curr.forEach(({ focalLength }, lensIndex) => {
      boxSum += (boxIndex + 1) * (lensIndex + 1) * focalLength
    })
    return boxSum + acc
  }, 0)
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/15.txt', 'utf8')
  return getSequenceHash(input)
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2023/inputs/15.txt', 'utf8')
  return getFocusingPower(input)
}
