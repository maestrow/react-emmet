/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as P from '@lib/parsimmon';

const bol = P.custom(function(success, failure) {
  return function(input, i) {
    if (i === 0 || input.charAt(i-1) === '\n')
      return success(i, undefined);
    return failure(i, 'not BOL');
  };
});


const component = P.any

const route = P.seq(
  bol, 
  P.string("/")
);

const definition = P.alt(route, component)

const root = definition.many()

