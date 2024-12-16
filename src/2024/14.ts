import { readFile } from 'fs/promises'
import { select } from '@inquirer/prompts'

export type Robot = {
  position: {
    x: number
    y: number
  }
  velocity: {
    x: number
    y: number
  }
}
type Grid = {
  height: number
  width: number
}

export const getRobots = (input: string): Robot[] => {
  return input.split('\n').map((line) => {
    const [_pos, _vel] = line.replace('p=', '').split(' v=')
    return {
      position: {
        x: Number(_pos.split(',')[0]),
        y: Number(_pos.split(',')[1]),
      },
      velocity: {
        x: Number(_vel.split(',')[0]),
        y: Number(_vel.split(',')[1]),
      },
    }
  })
}

export const moveRobot = (robot: Robot, time: number, grid: Grid): Robot => {
  const movementX = (robot.velocity.x * time) % grid.width
  const movementY = (robot.velocity.y * time) % grid.height

  const _newPosX = (robot.position.x + movementX) % grid.width
  const _newPosY = (robot.position.y + movementY) % grid.height

  // Make sure negative values wrap around
  const newPosX = _newPosX < 0 ? grid.width + _newPosX : _newPosX
  const newPosY = _newPosY < 0 ? grid.height + _newPosY : _newPosY

  return {
    ...robot,
    position: {
      x: newPosX,
      y: newPosY,
    },
  }
}

export const getQuadrantForRobot = (
  robot: Robot,
  grid: Grid,
): 1 | 2 | 3 | 4 | 0 => {
  const middleX = Math.floor(grid.width / 2)
  const middleY = Math.floor(grid.height / 2)
  const { x, y } = robot.position

  if (x < middleX && y < middleY) return 1
  if (x > middleX && y < middleY) return 2
  if (x < middleX && y > middleY) return 3
  if (x > middleX && y > middleY) return 4
  return 0
}

export const getSafetyScore = (
  input: string,
  seconds: number,
  grid: Grid,
): number => {
  const robots = getRobots(input)
  let quadrant1 = 0,
    quadrant2 = 0,
    quadrant3 = 0,
    quadrant4 = 0

  robots.forEach((robot) => {
    const moved = moveRobot(robot, seconds, grid)
    const quadrant = getQuadrantForRobot(moved, grid)
    if (quadrant === 1) quadrant1++
    if (quadrant === 2) quadrant2++
    if (quadrant === 3) quadrant3++
    if (quadrant === 4) quadrant4++
  })
  return quadrant1 * quadrant2 * quadrant3 * quadrant4
}

export const drawRobotos = (robots: Robot[], grid: Grid) => {
  const output = new Array(grid.height).fill(0).map((line, Y) =>
    new Array(grid.width)
      .fill(0)
      .map((_c, X) => {
        if (robots.some((r) => r.position.x === X && r.position.y === Y))
          return 'X'
        return '.'
      })
      .join(''),
  )
  console.clear()
  console.log('\n\n___________________________________')
  console.log(output.join('\n'))
}
export const partOne = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/14.txt', 'utf8')
  return getSafetyScore(input, 100, {
    width: 101,
    height: 103,
  })
}

export const partTwo = async (): Promise<number> => {
  const input = await readFile('src/2024/inputs/14.txt', 'utf8')
  const grid = {
    width: 101,
    height: 103,
  }
  /* I noticed a pattern repeating every 103 steps (our height, wink wink), 
  starting at 76, 
  so I initialized it to that and keep jumping 103 every time */

  let robots = getRobots(input).map((r) => moveRobot(r, 76, grid))
  let isChristmasTree = false
  let counter = 76
  while (!isChristmasTree) {
    counter = counter + 103
    robots = robots.map((r) => moveRobot(r, 103, grid))
    drawRobotos(robots, grid)
    isChristmasTree = await select({
      message: 'Is this a christmas tree? (run #' + counter + ')',
      choices: [
        {
          name: 'No',
          value: false,
        },
        {
          name: 'Finally, YES!',
          value: true,
        },
      ],
    })
  }

  return counter
}
