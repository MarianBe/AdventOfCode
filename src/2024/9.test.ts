import {
  addToDiskmapAtIndex,
  getChecksumForDiskmap,
  leftShiftDiskMap,
  leftShiftWholeFilesOnDiskmap,
  parseToDiskMap,
  removeFromDiskmapAtIndex,
} from './9'

const testInput = `2333133121414131402`

describe('parseToDiskMap', () => {
  it('should parseToDiskMap correctly', () => {
    expect(parseToDiskMap('12345')).toEqual([
      { type: 'file', length: 1, id: 0 },
      {
        length: 2,
        type: 'free',
      },
      {
        id: 1,
        length: 3,
        type: 'file',
      },
      {
        length: 4,
        type: 'free',
      },
      {
        id: 2,
        length: 5,
        type: 'file',
      },
    ])
  })
})

describe('addToDiskmapAtIndex', () => {
  it('should add element at specified index', () => {
    const diskmap = parseToDiskMap('123')
    const element = { type: 'free', length: 4 } as const
    expect(addToDiskmapAtIndex(diskmap, element, 1)).toEqual([
      { type: 'file', length: 1, id: 0 },
      { type: 'free', length: 4 },
      { type: 'free', length: 2 },
      { type: 'file', length: 3, id: 1 },
    ])
  })
})

describe('removeFromDiskmapAtIndex', () => {
  it('should remove element at specified index', () => {
    const diskmap = parseToDiskMap('123')
    expect(removeFromDiskmapAtIndex(diskmap, 1)).toEqual([
      { type: 'file', length: 1, id: 0 },
      { type: 'file', length: 3, id: 1 },
    ])
  })

  it('should handle removing first element', () => {
    const diskmap = parseToDiskMap('123')
    expect(removeFromDiskmapAtIndex(diskmap, 0)).toEqual([
      { type: 'free', length: 2 },
      { type: 'file', length: 3, id: 1 },
    ])
  })
})
describe('leftShiftDiskMap', () => {
  it('should remove trailing free space', () => {
    const diskmap = parseToDiskMap('123')
    expect(leftShiftDiskMap(diskmap)).toEqual([
      { type: 'file', length: 1, id: 0 },
      { type: 'file', length: 2, id: 1 },
      { type: 'file', length: 1, id: 1 },
    ])
  })

  it('should move file to free space of exact size', () => {
    const diskmap = parseToDiskMap('1442')
    expect(leftShiftDiskMap(diskmap)).toEqual([
      { type: 'file', length: 1, id: 0 },
      { type: 'file', length: 4, id: 1 },
    ])
  })

  it('should split file when free space is smaller', () => {
    const diskmap = parseToDiskMap('12126')
    expect(leftShiftDiskMap(diskmap)).toEqual([
      { type: 'file', length: 1, id: 0 },
      { type: 'file', length: 2, id: 2 },
      { type: 'file', length: 1, id: 1 },
      { type: 'file', length: 2, id: 2 },
      { type: 'file', length: 2, id: 2 },
    ])
  })
})

it('should split file when free space is smaller', () => {
  const diskmap = leftShiftDiskMap(parseToDiskMap(testInput))

  expect(getChecksumForDiskmap(diskmap)).toEqual(1928)
})
it('should not split file when free space is smaller and just use the first free block', () => {
  const diskmap = leftShiftWholeFilesOnDiskmap(parseToDiskMap(testInput))

  expect(getChecksumForDiskmap(diskmap)).toEqual(2858)
})
