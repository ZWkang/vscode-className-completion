import * as path from 'path';
import * as vscode from 'vscode';
import * as CSC from 'css-selector-classes';

import getSassDeps from './getSassDeps';
import {
  flat,
  testIsMatch,
  getStyleFileCache,
  setStyleFileCache,
  removeDuplicationList
} from './util';
import parseSassFileClassName from './parseSassFile';
import getFileContentStringSync from './getFileContentStringSync';

async function SassProvideCompletionItems(
  document: vscode.TextDocument,
  position: vscode.Position,
  token: vscode.CancellationToken,
  context: vscode.CompletionContext
) {
  const uri = document.uri.fsPath;
  const currentFileContent = getFileContentStringSync(uri);
  const sassDepsSet = getSassDeps(currentFileContent);
  const sassDepsList = [...sassDepsSet];
  const sassDepsResolvedPathList = sassDepsList.map((o: any) =>
    path.join(path.dirname(uri), o)
  );
  const parseFiles = await Promise.all(
    sassDepsResolvedPathList.map(async o => {
      if (getStyleFileCache(o)) return getStyleFileCache(o);
      const content = await parseSassFileClassName(o);
      setStyleFileCache(o, content);
      return content;
    })
  );
  const cssClassList = parseFiles.reduce(
    (prev, next) => [...prev, ...next],
    []
  );
  const linePrefix = document
    .lineAt(position)
    .text.substr(0, position.character);

  if (!testIsMatch(linePrefix)) {
    return undefined;
  }

  return removeDuplicationList(flat(cssClassList.map(CSC))).map(
    (o: any) => new vscode.CompletionItem(o, vscode.CompletionItemKind.Class)
  );
}

export default SassProvideCompletionItems;
