import * as path from 'path'
import * as vscode from 'vscode'
import * as CSC from 'css-selector-classes'

import getSassDeps from './getSassDeps'
import { flat, testIsMatch } from './util'
import parseSassFileClassName from './parseSassFile'
import getFileContentStringSync from './getFileContentStringSync'

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
  const cssClassList = sassDepsResolvedPathList
    .map(parseSassFileClassName)
    .reduce((prev, next) => [...prev, ...next], [])

  console.log(cssClassList)
  const linePrefix = document
    .lineAt(position)
    .text.substr(0, position.character)

  if (!testIsMatch(linePrefix)) {
    return undefined
  }
  return flat(cssClassList.map(CSC)).map(
    (o: any) => new vscode.CompletionItem(o, vscode.CompletionItemKind.Class)
  )
}

export default SassProvideCompletionItems
