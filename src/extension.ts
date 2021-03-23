/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from 'vscode'

import SassProvideCompletionItems from './sassCompletionProvider'

import singletonCache from './cache'
import { depFileReg } from './constants'
import parseSassFileClassName from './parseSassFile'

const documentSelector: vscode.DocumentSelector = [
  {
    scheme: 'file',
    language: 'typescriptreact'
  },
  {
    scheme: 'file',
    language: 'javascriptreact'
  },
  {
    scheme: 'file',
    language: 'javascript'
  }
]

export function activate(context: vscode.ExtensionContext) {
  // console.log(cacheInstance)
  // const workSpaceFolderName = vscode.workspace.workspaceFolders

  vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
    const cacheInstance = singletonCache.getInstance({ max: 200 })
    // const firstWorkspaceFolderName =
    //   vscode.workspace.workspaceFolders?.[0].uri.path
    // console.log(singletonCache.getInstance({}).get(firstWorkspaceFolderName))
    // cacheInstance.initWorkSpace(firstWorkspaceFolderName)

    console.log(
      cacheInstance.get('/Users/zhouwenkang/oss/doing/sass-analysis/css.css')
    )
    const nowSavingFilePath = document.uri.path
    if (depFileReg.test(nowSavingFilePath)) {
      cacheInstance.set(
        nowSavingFilePath,
        parseSassFileClassName(nowSavingFilePath)
      )
    }
    return
  })

  const quotesProvider = vscode.languages.registerCompletionItemProvider(
    documentSelector,
    {
      provideCompletionItems: SassProvideCompletionItems
    },
    '"'
  )
  const spaceTriggerProvider = vscode.languages.registerCompletionItemProvider(
    documentSelector,
    {
      provideCompletionItems: SassProvideCompletionItems
    },
    ' '
  )
  context.subscriptions.push(quotesProvider, spaceTriggerProvider)
}
