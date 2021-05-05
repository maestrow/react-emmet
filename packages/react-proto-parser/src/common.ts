/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as P from 'parsimmon';

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