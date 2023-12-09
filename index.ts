import { readdir } from 'fs/promises'
import { existsSync } from 'fs'
import { select } from '@inquirer/prompts'
import minimist from 'minimist'

console.clear()
const { y, d, help } = minimist(process.argv.slice(2))

if (help) {
  console.log(`
  This script is used to run a day's solution
  Usage: pnpm start -y 2023 -d 6
  Options:
    -y, --year    Year
    -d, --day     Day
    --help        Show help
  `)
  process.exit(0)
}
const years = await readdir('./src')

const selectedYear =
  y ||
  (await select({
    message: 'Select a year',
    choices: years.map((year) => ({ title: year, value: year })),
  }))

const days = (await readdir(`./src/${selectedYear}`))
  .filter((day) => day.endsWith('.ts') && !day.includes('test'))
  .map((day) => day.replace('.ts', ''))
const selectedDay =
  d ||
  (await select({
    message: 'Select a day',
    choices: days.map((day) => ({ title: day, value: day })),
  }))

const file = `./src/${selectedYear}/${selectedDay}.ts`

if (!existsSync(file)) {
  console.log('File not found:', file)
  process.exit(1)
}

const { partOne, partTwo } = await import(file)
if (partOne) {
  console.log('------🎅------🦌------🎄------')
  console.time('Part one took')
  console.log('Solution for part one:', await partOne())
  console.timeEnd('Part one took')
  console.log('------🎅------🦌------🎄------')
}
if (partTwo) {
  console.time('Part two took')
  console.log('Solution for part two:', await partTwo())
  console.timeEnd('Part two took')
  console.log('------🎅------🦌------🎄------')
}
