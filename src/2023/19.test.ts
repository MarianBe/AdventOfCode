import { checkPartsList, getAllPossibleCombinations, parseWorkflow } from './19'

const testInput = `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`

describe('day19Part01', () => {
  it('should parse the workflows correctly ', () => {
    expect(parseWorkflow('px{a<2006:qkq,m>2090:A,rfg}')).toEqual({
      name: 'px',
      rules: [
        {
          type: 'conditional-forward',
          category: 'a',
          operator: '<',
          value: 2006,
          target: 'qkq',
        },
        {
          type: 'conditional-accept',
          category: 'm',
          operator: '>',
          value: 2090,
        },
        { type: 'forward', target: 'rfg' },
      ],
    })
    expect(parseWorkflow('pv{a>1716:R,A}')).toEqual({
      name: 'pv',
      rules: [
        {
          type: 'conditional-reject',
          category: 'a',
          operator: '>',
          value: 1716,
        },
        { type: 'accept' },
      ],
    })
    expect(parseWorkflow('qs{s>3448:A,lnx}')).toEqual({
      name: 'qs',
      rules: [
        {
          type: 'conditional-accept',
          category: 's',
          operator: '>',
          value: 3448,
        },
        { type: 'forward', target: 'lnx' },
      ],
    })
  })
  it('should give a list of parts that get accepted', () => {
    expect(checkPartsList(testInput)).toEqual([
      { x: 787, m: 2655, a: 1222, s: 2876 },
      { x: 2036, m: 264, a: 79, s: 2244 },
      { x: 2127, m: 1623, a: 2188, s: 1013 },
    ])
  })
})

describe('day19Part02', () => {
  it('should give the sum of all possible combinations', () => {
    expect(getAllPossibleCombinations(testInput)).toEqual(167409079868000)
  })
})
