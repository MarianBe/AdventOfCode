import { mkdir, readdir, readFile, writeFile } from 'fs/promises'
import editor from '@inquirer/editor'
import minimist from 'minimist'

console.clear()
const { y, d, help } = minimist(process.argv.slice(2))

if (help) {
  console.log(`
  This script is used to generate a new day's boilerplate
  Usage: pnpm generate -y 2023 -d 6
  Options:
    -y, --year    Year
    -d, --day     Day
    --help        Show help
  `)
  process.exit(0)
}
if (!y) {
  console.log('Please specify a year with -y')
  process.exit(1)
}
if (!d) {
  console.log('Please specify a day with -d')
  process.exit(1)
}
const existingYears = await readdir('./src')
if (!existingYears.includes(y.toString())) {
  await mkdir(`./src/${y}`)
}
const existingDays = await readdir(`./src/${y}`)
if (existingDays.includes(`${d}.ts`)) {
  console.log('Day already exists')
  process.exit(1)
}

const testInput = (
  await editor({
    message: 'Enter the testInput for part one',
  })
).trim()

const codeTemplate = (await readFile('./templates/[day].ts', 'utf-8'))
  .replaceAll('[day]', d)
  .replaceAll('[year]', y)
const testTemplate = (await readFile('./templates/[day].test.ts', 'utf-8'))
  .replaceAll('[day]', d)
  .replaceAll('[year]', y)
  .replace('[testInput]', testInput)

await writeFile(`./src/${y}/${d}.ts`, codeTemplate)
await writeFile(`./src/${y}/${d}.test.ts`, testTemplate)

// Prompt the input from the user
const input = (
  await editor({
    message: 'Enter the input for the day',
  })
).trim()

await writeFile(`./src/${y}/inputs/${d}.txt`, input)
