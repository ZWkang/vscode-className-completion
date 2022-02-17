/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from 'vscode';

import SassProvideCompletionItems from './sassCompletionProvider';

import singletonCache from './cache';
import { needToBeParseDepends } from './constants';
import parseSassFileClassName from './parseSassFile';

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
];

export async function activate(context: vscode.ExtensionContext) {
  const classNotification = vscode.commands.registerCommand(
    'extension.className-completion',
    () => {
      vscode.window.showInformationMessage('样式自动补全已准备就绪!');
    }
  );

  vscode.workspace.onDidSaveTextDocument(
    async (document: vscode.TextDocument) => {
      const cacheInstance = singletonCache.getInstance({ max: 200 });
      const nowSavingFilePath = document.uri.path;
      if (needToBeParseDepends.test(nowSavingFilePath)) {
        const parseResult = await parseSassFileClassName(nowSavingFilePath);
        if (!parseResult) return;
        cacheInstance.set(nowSavingFilePath, parseResult);
      }
      return;
    }
  );

  context.subscriptions.push(classNotification);

  const quotesProvider = vscode.languages.registerCompletionItemProvider(
    documentSelector,
    {
      provideCompletionItems: SassProvideCompletionItems
    },
    '"'
  );
  const singleQuoteProvider = vscode.languages.registerCompletionItemProvider(
    documentSelector,
    {
      provideCompletionItems: SassProvideCompletionItems
    },
    "'"
  );
  const spaceTriggerProvider = vscode.languages.registerCompletionItemProvider(
    documentSelector,
    {
      provideCompletionItems: SassProvideCompletionItems
    },
    ' '
  );
  context.subscriptions.push(
    quotesProvider,
    singleQuoteProvider,
    spaceTriggerProvider
  );
}
