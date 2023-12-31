import { findPathWithLeastHeatloss } from './17'

const testInput = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`

describe('day17Part01', () => {
  it('should find the path with the least heatloss with max 3 steps straight', () => {
    expect(findPathWithLeastHeatloss(testInput)).toEqual(102)
  })
})

describe('day17Part02', () => {
  it('should find the path with least heatloss with min 4 straight and max 10 straight steps', () => {
    expect(findPathWithLeastHeatloss(testInput, 4, 10)).toEqual(94)
  })
})
