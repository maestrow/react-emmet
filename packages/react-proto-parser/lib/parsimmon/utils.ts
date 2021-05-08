/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as P from './index'

export const setState = (index: number): P.Parser<null> => P.custom((success, failure) => {
  return (input, i) => {
    return success(index, null)
  }
})

