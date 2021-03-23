import * as vscode from 'vscode';

const defaultSymbol = Symbol.for('defaultWorkspace');

function getCurrentActiveWorkspacePath() {
  return vscode.workspace.workspaceFolders?.[0].uri.path || defaultSymbol;
}

export default getCurrentActiveWorkspacePath;
