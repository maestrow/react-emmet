/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as P from '@lib/parsimmon'
import * as u from './utils'
import * as m from './main'

const until = P.string("=>")

const p = P.seq(
  //P.any.until(until),
  P.any.many()
)

const res = p.parse("abcd=>123")

console.dir(res, {depth: null})