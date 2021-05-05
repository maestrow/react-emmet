/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as P from 'parsimmon';
import * as common from './common';

const path = P.seq(
  P.string('/'),
  P.no
);

export const route = P.seq(
  common.bol,
  P.string("/"),
  P.
);
