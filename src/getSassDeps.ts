import * as babel from '@babel/core'
import * as sucrase from 'sucrase'

import { depFileReg } from './constants'

const { parse, traverse } = babel

function getSassDeps(fileContent: string) {
  const sassDeps = new Set()
  try {
    const compileCode = sucrase.transform(fileContent, {
      transforms: ['typescript', 'imports', 'jsx']
    }).code
    const ast = parse(compileCode, { sourceType: 'module' })

    traverse(ast, {
      // ImportDeclaration: (node: any) => {
      //   if (node && node.node && node.node.source && node.node.source.value) {
      //     if (/\.scss|\.sass/.test(node.node.source.value)) {
      //       console.log(node.node.source.value)
      //       sassDeps.add(node.node.source.value)
      //     }
      //   }
      // }
      CallExpression: (node: any) => {
        if (node?.node?.callee?.name) {
          const args = node?.node?.arguments
          if (args?.length !== 1) {
            return
          }
          const requireDepStyleFileName = args[0]?.value
          if (
            requireDepStyleFileName &&
            node.node.callee.name === 'require' &&
            depFileReg.test(requireDepStyleFileName)
          ) {
            sassDeps.add(requireDepStyleFileName)
          }
        }
      }
    })
  } finally {
    return sassDeps
  }
}

export default getSassDeps
