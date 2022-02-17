import * as vscode from 'vscode';

// not need anymore
// const defaultSymbol = Symbol.for('defaultWorkspace');

function getCurrentActiveWorkspacePath() {
  return vscode.workspace.workspaceFolders?.[0].uri.path;
}

export default getCurrentActiveWorkspacePath;
