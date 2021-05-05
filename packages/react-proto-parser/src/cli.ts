import * as P from 'parsimmon'
import * as cmn from './common'

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

const p = getParser(3)
const res = p.parse("12345")

console.log(res)