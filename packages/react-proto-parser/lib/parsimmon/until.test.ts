import * as P from '@lib/parsimmon'
import * as u from './utils'


it('until', function() {
  const until = P.any.until(P.string('!')).map(i => i.join(""))

  const p = P.seq(
    until,
    P.any.many()
  )
  const res = p.parse("1234!")

  expect(res).toEqual({ status: true, value: [ '1234', [ '!' ] ] })
});