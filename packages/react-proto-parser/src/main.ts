/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as P from '@lib/parsimmon';
import * as u from './utils';

const arrow = P.seq(P.optWhitespace, P.string("=>"), P.optWhitespace)

const cmpIdentifier = P.regexp(/[A-Z]\w*/)

const routePath = P.seqMap(
  P.string("/"),
  P.sepBy(
    P.noneOf(" /\t").notFollowedBy(arrow).many().map(i => i.join("")), 
    P.string("/")),
  (_, path) => path
);

export const route = P.seqMap(
  u.bol,
  routePath,
  arrow,
  cmpIdentifier,
  u.eol,
  (_1, path, _3, cmp) => {
    return [cmp, path]
  }
);