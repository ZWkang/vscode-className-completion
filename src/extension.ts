/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from 'vscode'

import SassProvideCompletionItems from './sassCompletionProvider'

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
  const provider1 = vscode.languages.registerCompletionItemProvider(
    documentSelector,
    {
      provideCompletionItems: SassProvideCompletionItems
    },
    '"'
  )
  const provider4 = vscode.languages.registerCompletionItemProvider(
    documentSelector,
    {
      provideCompletionItems: SassProvideCompletionItems
    },
    ' '
  )
  context.subscriptions.push(provider1, provider4)
}
