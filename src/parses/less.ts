import * as less from 'less';
import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';
import * as vscode from 'vscode';

const readFile = util.promisify(fs.readFile);
const exists = util.promisify(fs.exists);

async function lessParse(filePath: string) {
  // todo: 推断出当前是哪个 folder
  const exist = await exists(filePath);
  if (!exist) return;

  const fileContent = await (await readFile(filePath)).toString('utf-8');
  const result = await less.render(fileContent, {
    filename: path.basename(filePath),
    paths: vscode.workspace.workspaceFolders?.[0]?.uri?.path
      ? [vscode.workspace.workspaceFolders?.[0]?.uri?.path]
      : []
  });
  const cssContent = result.css;
  return cssContent;
}

export default lessParse;
