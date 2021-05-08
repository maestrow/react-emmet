/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as P from '@lib/parsimmon'

export const setState = (index: number): P.Parser<null> => P.custom((success, failure) => {
  return (input, i) => {
    return success(index, null)
  }
})

export const bol: P.Parser<null> = P.custom(function(success, failure) {
  return function(input, i) {
    if (i === 0 || input.charAt(i-1) === '\n')
      return success(i, null);
    return failure(i, 'not BOL');
  };
});

export const eol = P.seq(P.optWhitespace, P.end)

P.Parser.prototype.until = function<T>(parser: P.Parser<T>) {
  const self = this;

  return P.Parser(function(input: string, i: number) {
    const accum = [];
    const until = P.notFollowedBy(parser)
    let result = undefined;

    for (;;) {
      result = P.mergeReplies(self._(input, i), result);
     
      if (result.status) {
        if (i === result.index) {
          throw new Error(
            "infinite loop detected in .until() parser --- calling .until() on " +
              "a parser which can accept zero characters is usually the cause"
          );
        }
        i = result.index;
        accum.push(result.value);
        
        let untilRes = until._(input, i)
        if (!untilRes.status) {
          return P.mergeReplies(P.makeSuccess(i, accum), result);
        }
      } else {
        return P.mergeReplies(P.makeSuccess(i, accum), result);
      }
    }
  });
};
