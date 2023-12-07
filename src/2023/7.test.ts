import {
  getHandStrength,
  getHandStrengthComparison,
  groupHand,
  splitHandString,
  sumInputWinnings,
} from './7'

const testInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

describe('day07Part01', () => {
  it('should get the correct handStrength', () => {
    expect(getHandStrength(groupHand(splitHandString('77777')))).toEqual(7)
    expect(getHandStrength(groupHand(splitHandString('7777K')))).toEqual(6)
    expect(getHandStrength(groupHand(splitHandString('77373')))).toEqual(5)
    expect(getHandStrength(groupHand(splitHandString('77372')))).toEqual(4)
    expect(getHandStrength(groupHand(splitHandString('73731')))).toEqual(3)
    expect(getHandStrength(groupHand(splitHandString('37392')))).toEqual(2)
  })
  it('should compare the hands correctly for sorting', () => {
    expect(
      getHandStrengthComparison(
        splitHandString('77777'),
        splitHandString('7777K'),
      ),
    ).toEqual(1)
    expect(
      getHandStrengthComparison(
        splitHandString('7777K'),
        splitHandString('77777'),
      ),
    ).toEqual(-1)
    expect(
      getHandStrengthComparison(
        splitHandString('7777K'),
        splitHandString('7777K'),
      ),
    ).toEqual(0)
    expect(
      getHandStrengthComparison(
        splitHandString('7777K'),
        splitHandString('77373'),
      ),
    ).toEqual(1)
    expect(
      getHandStrengthComparison(
        splitHandString('77373'),
        splitHandString('7777K'),
      ),
    ).toEqual(-1)
    expect(
      getHandStrengthComparison(
        splitHandString('77373'),
        splitHandString('77373'),
      ),
    ).toEqual(0)
    expect(
      getHandStrengthComparison(
        splitHandString('77373'),
        splitHandString('37392'),
      ),
    ).toEqual(3)
    expect(
      getHandStrengthComparison(
        splitHandString('37392'),
        splitHandString('77373'),
      ),
    ).toEqual(-3)
    expect(
      getHandStrengthComparison(
        splitHandString('37392'),
        splitHandString('37392'),
      ),
    ).toEqual(0)
    expect(
      getHandStrengthComparison(
        splitHandString('QQQJA'),
        splitHandString('T55J5'),
      ),
    ).toEqual(2)
    expect(
      getHandStrengthComparison(
        splitHandString('7374J'),
        splitHandString('53Q44'),
      ),
    ).toEqual(2)
  })
  it('should sort the hands correctly', () => {
    expect(
      ['77373', '7777K', '37392', '77777']
        .map(splitHandString)
        .sort(getHandStrengthComparison),
    ).toEqual(['37392', '77373', '7777K', '77777'].map(splitHandString))
  })
  it('should sum up the winnings of the input', () => {
    expect(sumInputWinnings(testInput)).toEqual(6440)
  })
})
describe('day06Part02', () => {
  expect(sumInputWinnings(testInput, true)).toEqual(5905)
})
