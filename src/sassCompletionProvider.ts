import * as vscode from 'vscode'
import * as CSC from 'css-selector-classes'
import getFileContentStringSync from './getFileContentStringSync'
import getSassDeps from './getSassDeps'
import * as path from 'path'

import parseSassFileClassName from './parseSassFile'

const reg = /className\s*?=\s*?"$|className\s*?=\s*?"[^"]*?$/

function testIsMatch(lineContent: string) {
  return reg.test(lineContent)
}

function SassProvideCompletionItems(
  document: vscode.TextDocument,
  position: vscode.Position,
  token: vscode.CancellationToken,
  context: vscode.CompletionContext
) {
  const uri = document.uri.fsPath
  const currentFileContent = getFileContentStringSync(uri)
  const sassDepsSet = getSassDeps(currentFileContent)
  const sassDepsList = [...sassDepsSet]
  const sassDepsResolvedPathList = sassDepsList.map((o: any) =>
    path.join(path.dirname(uri), o)
  )
  // console.log(sassDepsResolvedPathList)
  const cssClassList = sassDepsResolvedPathList
    .map(parseSassFileClassName)
    .reduce((prev, next) => {
      return [...prev, ...next]
    }, [])

  console.log(cssClassList)

  const linePrefix = document
    .lineAt(position)
    .text.substr(0, position.character)

  if (!testIsMatch(linePrefix)) {
    return undefined
  }
  console.log(cssClassList.map((c: string) => CSC(c)).flat())
  return cssClassList
    .map((c: string) => CSC(c))
    .flat()
    .map(o => {
      return new vscode.CompletionItem(o, vscode.CompletionItemKind.Class)
    })
}

export default SassProvideCompletionItems
