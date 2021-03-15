import * as babel from '@babel/core'
import * as sucrase from 'sucrase'

const { parse, traverse } = babel

function getSassDeps(fileContent: string) {
  try {
    const sassDeps = new Set()

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
        if (node && node.node && node.node.callee && node.node.callee.name) {
          const args = node?.node?.arguments
          if (args?.length !== 1) {
            return
          }
          const requirePageName = args[0]?.value
          if (
            requirePageName &&
            node.node.callee.name === 'require' &&
            /\.scss|\.sass/.test(requirePageName)
          ) {
            sassDeps.add(requirePageName)
          }
        }
      }
    })

    return sassDeps
  } catch (e) {
    return new Set()
  }
}

export default getSassDeps
