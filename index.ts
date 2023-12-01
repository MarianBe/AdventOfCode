import { readdir } from 'fs/promises'
import { existsSync } from 'fs'
import { select } from '@inquirer/prompts'
import minimist from 'minimist'
const { y, d } = minimist(process.argv.slice(2))

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
  console.log('Part one:', await partOne())
}
if (partTwo) {
  console.log('Part two:', await partTwo())
}
