import * as r from './route'

describe('route', () => {
  
  const tests: Array<[string, string[]]> = [
    ['/aaa/bbb => AaaBbb', ['AaaBbb', '/aaa/bbb'] ],
    ['/aaa/bbb=> AaaBbb', ['AaaBbb', '/aaa/bbb'] ],
    ['/ =>Aaa_Bbb_12', ['Aaa_Bbb_12', '/'] ],
    ['/aaa/?x={id}/bb=>AaaBbb', ['AaaBbb', '/aaa/?x={id}/bb'] ],
  ]
  
  tests.forEach(test => {
    it(`route ${test[0]}`, () => {
      const res = r.route.parse(test[0])
      expect(res.status).toBe(true)
      if (res.status) {
        expect(res.value).toEqual(['route'].concat(test[1]))
      }
    })
  })

})