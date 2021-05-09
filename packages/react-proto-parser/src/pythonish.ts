/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as P from '@lib/parsimmon/index.js'
import util from 'util'

function PyX(indent: number): P.Language {
  return P.createLanguage({

    Block: r => {
      return P.seqMap(
        P.string("block:"),
        r.NL,
        r.IndentMore,
        r.Statement,
        (_1, _2, n, first) => ({n, first})
      ).chain(args => {
        const { n, first } = args;
        return PyX(n)
          .RestStatement.many()
          .map((rest: any) => ["BLOCK", first, ...rest]);
      })
    },

    Statement: r => P.alt(r.Block, r.Ident),

    RestStatement: r => r.IndentSame.then(r.Statement),

    Ident: r => P.regexp(/[a-z]+/i).skip(r.End),

    CountSpaces: () => P.regexp(/[ ]*/).map(s => s.length),

    IndentSame: r =>
      r.CountSpaces.chain(n => {
        if (n === indent) {
          return P.of(n);
        }
        return P.fail(`${n} spaces`);
      }),

    IndentMore: r =>
      r.CountSpaces.chain(n => {
        if (n > indent) {
          return P.of(n);
        }
        return P.fail(`more than ${n} spaces`);
      }),

    // Support all three standard text file line endings
    NL: () => P.alt(P.string("\r\n"), P.oneOf("\r\n")),

    // Lines should always end in a newline sequence, but many files are missing
    // the final newline
    End: r => P.alt(r.NL, P.eof)
  });
}

// Start parsing at zero indentation
let Pythonish = PyX(0);

///////////////////////////////////////////////////////////////////////

let text = `\
block:
  alpha
  bravo
  block:
         charlie
         delta
         echo
         block:
          foxtrot
  golf
`;

function prettyPrint(x: any) {
  let opts = { depth: null, color: "auto" };
  let s = util.inspect(x, opts);
  console.log(s);
}

let ast = Pythonish.Statement.tryParse(text);
prettyPrint(ast);