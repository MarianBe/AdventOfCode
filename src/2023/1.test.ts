import {
  calibrationValue,
  lineCalibrationValue,
  calibrationValueWithReplacement,
  replaceLineStringNumbers,
} from './1'

const testInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

const lines = testInput.split('\n')

describe('day01Part01', () => {
  it('should return correct calibrationsValues', () => {
    expect(lineCalibrationValue(lines[0])).toEqual(12)
    expect(lineCalibrationValue(lines[1])).toEqual(38)
    expect(lineCalibrationValue(lines[2])).toEqual(15)
    expect(lineCalibrationValue(lines[3])).toEqual(77)
  })
  it('should return correct sum of calibrationsValues', () => {
    expect(calibrationValue(testInput)).toEqual(142)
  })
})

const testInput2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`
const lines2 = testInput2.split('\n')

describe('day01Part02', () => {
  it('should replace first and last numberString with numbers', () => {
    expect(replaceLineStringNumbers('onetwothree')).toEqual('1two3')
    expect(replaceLineStringNumbers('fourfive')).toEqual('45')
    expect(replaceLineStringNumbers('449three45three')).toEqual('4493453')
    expect(replaceLineStringNumbers('six344')).toEqual('6344')
    expect(replaceLineStringNumbers('sjv8')).toEqual('sjv8')
    expect(replaceLineStringNumbers('eightnine2eightnineeight')).toEqual(
      '8nine2eightnine8',
    )
    expect(replaceLineStringNumbers('eighthree')).toEqual('83')
  })
  it('should return correct calibrationsValues', () => {
    expect(lineCalibrationValue(replaceLineStringNumbers(lines2[0]))).toEqual(
      29,
    )
    expect(lineCalibrationValue(replaceLineStringNumbers(lines2[1]))).toEqual(
      83,
    )
    expect(lineCalibrationValue(replaceLineStringNumbers(lines2[2]))).toEqual(
      13,
    )
    expect(lineCalibrationValue(replaceLineStringNumbers(lines2[3]))).toEqual(
      24,
    )
    expect(lineCalibrationValue(replaceLineStringNumbers(lines2[4]))).toEqual(
      42,
    )
    expect(lineCalibrationValue(replaceLineStringNumbers(lines2[5]))).toEqual(
      14,
    )
    expect(lineCalibrationValue(replaceLineStringNumbers(lines2[6]))).toEqual(
      76,
    )
    expect(
      lineCalibrationValue(replaceLineStringNumbers('449three45three')),
    ).toEqual(43)
    expect(lineCalibrationValue(replaceLineStringNumbers('six344'))).toEqual(64)
    expect(lineCalibrationValue(replaceLineStringNumbers('sjv8'))).toEqual(88)
    expect(
      lineCalibrationValue(replaceLineStringNumbers('twothreeonejone8two')),
    ).toEqual(22)
    expect(
      lineCalibrationValue(
        replaceLineStringNumbers('eightnine2eightnineeight'),
      ),
    ).toEqual(88)
  })
  it('should return correct sum of calibrationsValues', () => {
    expect(calibrationValueWithReplacement(testInput2)).toEqual(281)
  })
})
