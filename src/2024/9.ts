import { readFile } from 'fs/promises'

export type DiskMap = (
  | {
      type: 'file'
      length: number
      id: number
    }
  | {
      type: 'free'
      length: number
    }
)[]
export const parseToDiskMap = (input: string): DiskMap => {
  return input.split('').map((number, index) => {
    if (index % 2 === 0) {
      return {
        type: 'file',
        length: Number(number),
        id: index / 2,
      }
    }
    return {
      type: 'free',
      length: Number(number),
    }
  })
}

export const addToDiskmapAtIndex = (
  _diskmap: DiskMap,
  element: DiskMap[number],
  index: number,
) => {
  const diskmap = [..._diskmap]
  diskmap.splice(index, 0, element)
  return diskmap
}

export const removeFromDiskmapAtIndex = (_diskmap: DiskMap, index: number) => {
  const diskmap = [..._diskmap]
  diskmap.splice(index, 1)
  return diskmap
}

export const leftShiftDiskMap = (_diskmap: DiskMap): DiskMap => {
  let diskmap = [..._diskmap]

  while (diskmap.some((e) => e.type === 'free')) {
    const lastElement = diskmap.at(-1)
    if (lastElement.type === 'free' || lastElement.length === 0) {
      diskmap = removeFromDiskmapAtIndex(diskmap, diskmap.length - 1)
      continue
    }

    const firstFreeIndex = diskmap.findIndex((e) => e.type === 'free')
    // If we don't have any more free space, shift-left is done
    if (firstFreeIndex === -1) break

    if (diskmap[firstFreeIndex].length > lastElement.length) {
      // Make the free-size smaller
      diskmap[firstFreeIndex].length =
        diskmap[firstFreeIndex].length - lastElement.length
      // Move the element to the front
      diskmap = addToDiskmapAtIndex(diskmap, lastElement, firstFreeIndex)
      // Remove the last element because we just moved it up front
      diskmap = removeFromDiskmapAtIndex(diskmap, diskmap.length - 1)
    } else if (diskmap[firstFreeIndex].length === lastElement.length) {
      diskmap[firstFreeIndex] = { ...lastElement }
      diskmap = removeFromDiskmapAtIndex(diskmap, diskmap.length - 1)
    } else {
      const remainingSize = lastElement.length - diskmap[firstFreeIndex].length
      diskmap[firstFreeIndex] = {
        ...lastElement,
        length: lastElement.length - remainingSize,
      }
      lastElement.length = remainingSize
    }
  }

  return diskmap
}

export const leftShiftWholeFilesOnDiskmap = (_diskmap: DiskMap): DiskMap => {
  let currentIndex = _diskmap.length - 1
  let diskmap = [..._diskmap]

  while (currentIndex >= 0) {
    const currentFile = { ...diskmap.at(currentIndex) }
    if (currentFile.type === 'free') {
      currentIndex--
      continue
    }
    const firstFreeIndex = diskmap.findIndex(
      (e) => e.type === 'free' && e.length >= currentFile.length,
    )

    if (firstFreeIndex !== -1 && firstFreeIndex < currentIndex) {
      // Make the free-size smaller
      const newFreeSize = diskmap[firstFreeIndex].length - currentFile.length

      if (newFreeSize === 0) {
        diskmap[firstFreeIndex] = { ...currentFile }
        diskmap[currentIndex] = { type: 'free', length: currentFile.length }
      } else {
        diskmap[firstFreeIndex].length = newFreeSize
        diskmap[currentIndex] = { type: 'free', length: currentFile.length }

        diskmap = addToDiskmapAtIndex(diskmap, currentFile, firstFreeIndex)
      }
    }
    currentIndex--
  }

  return diskmap
}

export const getChecksumForDiskmap = (diskmap: DiskMap): number => {
  let checksum = 0
  let index = 0
  diskmap.forEach((elem) => {
    let length = elem.length
    while (length > 0) {
      checksum = checksum + (elem.type === 'file' ? elem.id : 0) * index
      index++
      length--
    }
  })

  return checksum
}

export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/9.txt', 'utf8')
  return getChecksumForDiskmap(leftShiftDiskMap(parseToDiskMap(input)))
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/9.txt', 'utf8')
  return getChecksumForDiskmap(
    leftShiftWholeFilesOnDiskmap(parseToDiskMap(input)),
  )
}
