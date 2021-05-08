import * as P from '@lib/parsimmon/index.js'

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