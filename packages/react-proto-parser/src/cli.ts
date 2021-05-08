/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as P from '@lib/parsimmon/index.js'
import * as u from '@lib/parsimmon/utils'

export type Route = ['route', string, string]

const arrow = P.string('=>')

const _arrow_ = P.seq(
  P.optWhitespace,
  arrow,
  P.optWhitespace
)

const path = P.any.until(P.alt(
  P.regex(/\s+/),
  arrow
)).map(i => i.join(''))

const cmpId = P.regexp(/[A-Z]\S*/)

export const route: P.Parser<Route> = P.seqMap(
  P.bol,
  path,
  _arrow_,
  cmpId,
  P.eol,
  (_1, path, _3, cmpId) => ([ 'route', cmpId, path ])
)

let r : P.Result<any>

r = route.parse("/aaa/bbb => AaaBbb")

console.dir(route.parse("/aaa/bbb => AaaBbb"), {depth: null})
console.dir(route.parse("/aaa/bbb=> AaaBbb"), {depth: null})
console.dir(route.parse("/ =>Aaa_Bbb_12"), {depth: null})
console.dir(route.parse("/aaa/?x={id}/bb=>AaaBbb"), {depth: null})
