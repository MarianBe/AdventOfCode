import {
  drawRobotos,
  getQuadrantForRobot,
  getRobots,
  getSafetyScore,
  moveRobot,
} from './14'

const testInput = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`

describe('day14Part01', () => {
  it('should get the robots from the input', () => {
    expect(getRobots(testInput)[0]).toEqual({
      position: {
        x: 0,
        y: 4,
      },
      velocity: {
        x: 3,
        y: -3,
      },
    })
  })
  it('', () => {
    expect(
      moveRobot(getRobots(testInput)[10], 5, {
        height: 7,
        width: 11,
      }),
    ).toEqual({
      position: {
        x: 1,
        y: 3,
      },
      velocity: {
        x: 2,
        y: -3,
      },
    })
  })
  it('', () => {
    const grid = {
      height: 7,
      width: 11,
    }
    expect(
      getQuadrantForRobot(moveRobot(getRobots(testInput)[10], 5, grid), grid),
    ).toEqual(0)
  })
  it('', () => {
    const grid = {
      height: 7,
      width: 11,
    }
    expect(getSafetyScore(testInput, 100, grid)).toEqual(12)
  })
})

describe('day14Part02', () => {
  it('should', () => {
    const grid = {
      height: 7,
      width: 11,
    }
    const robots = getRobots(testInput).map((r) => moveRobot(r, 100, grid))
    expect(drawRobotos(robots, grid)).toEqual(undefined)
  })
})
