import * as babel from '@babel/core';
import * as sucrase from 'sucrase';

import { needToBeParseDepends } from './constants';

const { parse, traverse } = babel;

function getDepends(fileContent: string) {
  const fileDeps = new Set();
  try {
    const compileCode = sucrase.transform(fileContent, {
      transforms: ['typescript', 'imports', 'jsx']
    }).code;
    const ast = parse(compileCode, { sourceType: 'module' });

    traverse(ast, {
      CallExpression: (node: any) => {
        if (node?.node?.callee?.name) {
          const args = node?.node?.arguments;
          if (args?.length !== 1) {
            return;
          }
          const requireDepStyleFileName = args[0]?.value;
          if (
            requireDepStyleFileName &&
            node.node.callee.name === 'require' &&
            needToBeParseDepends.test(requireDepStyleFileName)
          ) {
            fileDeps.add(requireDepStyleFileName);
          }
        }
      }
    });
  } catch (e) {
    // empty
  }

  return fileDeps;
}

export default getDepends;
