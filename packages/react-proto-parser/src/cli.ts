/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as P from '@lib/parsimmon/index.js'
import * as u from '@lib/parsimmon/utils'

const exclamation = P.any.until(P.string('!')).map(i => i.join(""))

const p = P.seq(
  exclamation,
  P.any.many()
)
const res = p.parse("1234!")

console.dir(res, {depth: null})