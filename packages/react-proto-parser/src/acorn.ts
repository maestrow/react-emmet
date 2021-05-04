import * as acorn from 'acorn';

const opts: acorn.Options = {
  ecmaVersion: 2020
}

const result = acorn.parse("1 + 1", opts);

console.log(result);