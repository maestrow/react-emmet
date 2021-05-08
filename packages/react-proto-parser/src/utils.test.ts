import * as P from '@lib/parsimmon'
import * as cmn from './utils'

const getParser = (index: number) => {
  return P.seqMap(
    cmn.setState(index), 
    cmn.bol, 
    P.index, 
    P.all,
    (_1, _2, index, res) => {
      return [index.offset, res]
    }
  )
} 

const checkFailOffset = (res: P.Result<unknown>, offset: number) => {
  expect(res.status).toBe(false)
  if (res.status === false) {
    expect(res.index.offset).toBe(offset)  
  }
}

const failTest = (index: number, input: string) => {
  const p = getParser(index)
  const res = p.parse(input)
  checkFailOffset(res, index)
}

describe('bol', () => {
  describe('must succeed', () => {

    test('1', () => {
      const p = getParser(0)
      const res = p.parse("1")
      expect(res).toEqual({ status: true, value: [ 0, '1' ] })
    });
  
    test('2', () => {
      const p = getParser(2)
      const res = p.parse("1\n2")
      expect(res).toEqual({ status: true, value: [ 2, '2' ] })
    });
  
    test('3', () => {
      const p = getParser(3)
      const res = p.parse("1\r\n2")
      expect(res).toEqual({ status: true, value: [ 3, '2' ] })
    });
  
  });

  describe('must fail', () => {
    test('1', () => {
      failTest(3, "12345")
    });
  
    test('2', () => {
      failTest(6, "123\r\n456")
    });

  });
})




